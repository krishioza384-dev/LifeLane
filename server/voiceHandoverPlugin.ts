import { loadEnv, type Plugin, type ViteDevServer, type PreviewServer } from 'vite';
import type { IncomingMessage, ServerResponse } from 'http';
import type { StructuredHandover, VoiceHandoverRequest, VoiceHandoverResponse } from '../src/types/voiceHandover';

const MAX_PAYLOAD_BYTES = 10 * 1024 * 1024; // 10 MB

const EXPECTED_FIELDS = [
  'patient',
  'situation',
  'onset',
  'vitals',
  'assessment',
  'treatment',
  'allergies',
  'history',
  'consciousness',
  'missingFields',
] as const;

function validateAndSanitizeHandover(raw: any): StructuredHandover | null {
  if (!raw || typeof raw !== 'object') {
    return null;
  }

  const missingFields: string[] = Array.isArray(raw.missingFields)
    ? raw.missingFields.filter((f: any) => typeof f === 'string')
    : [];

  // Vitals Layer
  const rawVitals = raw.vitals && typeof raw.vitals === 'object' ? raw.vitals : {};
  let heartRate: number | null = null;
  if (typeof rawVitals.heartRate === 'number' && rawVitals.heartRate >= 20 && rawVitals.heartRate <= 300) {
    heartRate = Math.round(rawVitals.heartRate);
  } else if (rawVitals.heartRate !== null && rawVitals.heartRate !== undefined) {
    if (!missingFields.includes('heartRate')) missingFields.push('heartRate');
  }

  let spo2: number | null = null;
  if (typeof rawVitals.spo2 === 'number' && rawVitals.spo2 >= 40 && rawVitals.spo2 <= 100) {
    spo2 = Math.round(rawVitals.spo2);
  } else if (rawVitals.spo2 !== null && rawVitals.spo2 !== undefined) {
    if (!missingFields.includes('spo2')) missingFields.push('spo2');
  }

  let bloodPressure: string | null = null;
  if (typeof rawVitals.bloodPressure === 'string' && /^\d{2,3}\/\d{2,3}$/.test(rawVitals.bloodPressure.trim())) {
    bloodPressure = rawVitals.bloodPressure.trim();
  } else if (rawVitals.bloodPressure !== null && rawVitals.bloodPressure !== undefined) {
    if (!missingFields.includes('bloodPressure')) missingFields.push('bloodPressure');
  }

  // Ensure unmentioned vitals are in missingFields
  if (heartRate === null && !missingFields.includes('heartRate')) missingFields.push('heartRate');
  if (spo2 === null && !missingFields.includes('spo2')) missingFields.push('spo2');
  if (bloodPressure === null && !missingFields.includes('bloodPressure')) missingFields.push('bloodPressure');

  const cleanStringOrNull = (val: any, fieldName: string): string | null => {
    if (typeof val === 'string' && val.trim().length > 0 && val.toLowerCase() !== 'null' && val.toLowerCase() !== 'not reported') {
      return val.trim();
    }
    if (!missingFields.includes(fieldName)) {
      missingFields.push(fieldName);
    }
    return null;
  };

  const patient = cleanStringOrNull(raw.patient, 'patient');
  const situation = cleanStringOrNull(raw.situation, 'situation');
  const onset = cleanStringOrNull(raw.onset, 'onset');
  const assessment = cleanStringOrNull(raw.assessment, 'assessment');
  const treatment = cleanStringOrNull(raw.treatment, 'treatment');
  const allergies = cleanStringOrNull(raw.allergies, 'allergies');
  const history = cleanStringOrNull(raw.history, 'history');
  const consciousness = cleanStringOrNull(raw.consciousness, 'consciousness');

  return {
    patient,
    situation,
    onset,
    vitals: {
      heartRate,
      spo2,
      bloodPressure,
    },
    assessment,
    treatment,
    allergies,
    history,
    consciousness,
    missingFields,
  };
}

async function handleVoiceHandover(req: IncomingMessage, res: ServerResponse) {
  res.setHeader('Content-Type', 'application/json');

  if (req.method !== 'POST') {
    res.statusCode = 405;
    res.end(JSON.stringify({ success: false, error: 'Method Not Allowed. Use POST.' }));
    return;
  }

  // Server-only environment variables
  const apiKey = process.env.GEMINI_API_KEY;
  const model = process.env.GEMINI_MODEL;

  if (!apiKey) {
    res.statusCode = 503;
    res.end(JSON.stringify({ success: false, error: 'GEMINI_API_KEY is not configured on the server.' }));
    return;
  }

  if (!model) {
    res.statusCode = 503;
    res.end(JSON.stringify({ success: false, error: 'GEMINI_MODEL is not configured on the server.' }));
    return;
  }

  // Read request body with payload size guard
  let bodyBuffer = Buffer.alloc(0);
  let totalBytes = 0;

  try {
    for await (const chunk of req) {
      totalBytes += chunk.length;
      if (totalBytes > MAX_PAYLOAD_BYTES) {
        res.statusCode = 413;
        res.end(JSON.stringify({ success: false, error: 'Audio payload exceeds maximum 10MB limit.' }));
        return;
      }
      bodyBuffer = Buffer.concat([bodyBuffer, chunk]);
    }

    const jsonStr = bodyBuffer.toString('utf-8');
    if (!jsonStr) {
      res.statusCode = 400;
      res.end(JSON.stringify({ success: false, error: 'Empty request body.' }));
      return;
    }

    const payload: VoiceHandoverRequest = JSON.parse(jsonStr);
    if (!payload.audioBase64 || typeof payload.audioBase64 !== 'string') {
      res.statusCode = 400;
      res.end(JSON.stringify({ success: false, error: 'Missing or invalid audioBase64 string.' }));
      return;
    }

    if (!payload.mimeType || typeof payload.mimeType !== 'string' || !payload.mimeType.startsWith('audio/')) {
      res.statusCode = 400;
      res.end(JSON.stringify({ success: false, error: 'Invalid audio MIME type.' }));
      return;
    }

    // Call Google Gemini REST API using server-side x-goog-api-key header (NEVER IN URL)
    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;

    const promptText = `Extract a clinical emergency medical handover from this paramedic voice audio. Return ONLY strict JSON with the following exact 10 top-level keys:
- patient: string or null
- situation: string or null
- onset: string or null
- vitals: object with keys: heartRate (integer 20-300 or null), spo2 (integer 40-100 or null), bloodPressure (string formatted as systolic/diastolic e.g. 120/80 or null)
- assessment: string or null
- treatment: string or null
- allergies: string or null
- history: string or null
- consciousness: string or null
- missingFields: array of strings listing every field that was not explicitly mentioned in the audio.

MANDATORY MEDICAL SAFETY RULES:
1. ZERO FABRICATION: Never invent or assume clinical facts, vitals, allergies, or treatments.
2. If any field or vital was NOT explicitly spoken in the audio, set its value to null and add the field name to missingFields.
3. 'assessment' MUST ONLY be what the paramedic explicitly stated (e.g. "Suspected cardiac event"), NOT an autonomous AI diagnosis.
4. If audio is unintelligible or silent, return null for all fields and list them in missingFields.
5. Return ONLY a valid JSON object matching this schema.`;

    const geminiPayload = {
      contents: [
        {
          role: 'user',
          parts: [
            {
              inlineData: {
                mimeType: payload.mimeType,
                data: payload.audioBase64,
              },
            },
            {
              text: promptText,
            },
          ],
        },
      ],
      generationConfig: {
        responseMimeType: 'application/json',
        temperature: 0.1,
      },
    };

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 60000); // 60s overall timeout

    const MAX_ATTEMPTS = 3;
    const RETRY_DELAYS = [2000, 4000]; // Delays before attempt 2 and attempt 3

    let geminiResponse: Response | null = null;
    let lastStatus = 0;

    try {
      for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
        geminiResponse = await fetch(geminiUrl, {
          method: 'POST',
          headers: {
            'x-goog-api-key': apiKey,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(geminiPayload),
          signal: controller.signal,
        });

        if (geminiResponse.ok) {
          break;
        }

        lastStatus = geminiResponse.status;

        // Only retry on 503 (temporary high demand / service unavailable)
        if (geminiResponse.status === 503 && attempt < MAX_ATTEMPTS) {
          const delayMs = RETRY_DELAYS[attempt - 1] || 4000;
          await new Promise((resolve, reject) => {
            const timer = setTimeout(resolve, delayMs);
            if (controller.signal.aborted) {
              clearTimeout(timer);
              reject(new DOMException('Aborted', 'AbortError'));
            } else {
              controller.signal.addEventListener(
                'abort',
                () => {
                  clearTimeout(timer);
                  reject(new DOMException('Aborted', 'AbortError'));
                },
                { once: true }
              );
            }
          });
          continue;
        }

        // For non-503 errors (e.g. 400, 401, 403, 404) or final attempt, stop retrying
        break;
      }
    } finally {
      clearTimeout(timeoutId);
    }

    if (!geminiResponse || !geminiResponse.ok) {
      const status = geminiResponse ? geminiResponse.status : lastStatus;
      res.statusCode = 502;
      const errorMsg =
        status === 503
          ? 'Gemini API service is temporarily unavailable due to high demand (503) after 3 attempts. Please retry recording.'
          : `Gemini API service returned status ${status}. Unable to process voice handover.`;
      res.end(
        JSON.stringify({
          success: false,
          error: errorMsg,
        })
      );
      return;
    }

    const geminiJson = await geminiResponse.json();
    const candidateText =
      geminiJson?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!candidateText || typeof candidateText !== 'string') {
      res.statusCode = 502;
      res.end(JSON.stringify({ success: false, error: 'Gemini returned an empty or invalid response.' }));
      return;
    }

    // Layer 1 Validation: JSON structure
    let parsedData: any;
    try {
      parsedData = JSON.parse(candidateText.trim());
    } catch {
      res.statusCode = 502;
      res.end(JSON.stringify({ success: false, error: 'AI output could not be parsed as valid JSON.' }));
      return;
    }

    // Layer 2 Validation: Semantic & Medical Range Validation
    const sanitizedHandover = validateAndSanitizeHandover(parsedData);
    if (!sanitizedHandover) {
      res.statusCode = 502;
      res.end(JSON.stringify({ success: false, error: 'Clinical schema validation failed for AI output.' }));
      return;
    }

    // Check if audio was completely unintelligible (all fields null)
    const isCompletelyEmpty =
      sanitizedHandover.patient === null &&
      sanitizedHandover.situation === null &&
      sanitizedHandover.vitals.heartRate === null &&
      sanitizedHandover.vitals.spo2 === null &&
      sanitizedHandover.vitals.bloodPressure === null &&
      sanitizedHandover.assessment === null &&
      sanitizedHandover.treatment === null;

    if (isCompletelyEmpty) {
      res.statusCode = 200;
      res.end(
        JSON.stringify({
          success: false,
          error: 'Unable to understand recording. Audio was unclear or silent.',
          handover: sanitizedHandover,
        })
      );
      return;
    }

    res.statusCode = 200;
    const responsePayload: VoiceHandoverResponse = {
      success: true,
      handover: sanitizedHandover,
    };
    res.end(JSON.stringify(responsePayload));
  } catch (err: any) {
    if (err?.name === 'AbortError') {
      res.statusCode = 504;
      res.end(JSON.stringify({ success: false, error: 'Gemini API request timed out after 60 seconds.' }));
      return;
    }

    res.statusCode = 500;
    res.end(JSON.stringify({ success: false, error: 'Internal server error processing voice handover.' }));
  }
}

export function voiceHandoverPlugin(): Plugin {
  return {
    name: 'voice-handover-plugin',
    configResolved(config) {
      const env = loadEnv(config.mode, process.cwd(), '');
      if (env.GEMINI_API_KEY && !process.env.GEMINI_API_KEY) {
        process.env.GEMINI_API_KEY = env.GEMINI_API_KEY;
      }
      if (env.GEMINI_MODEL && !process.env.GEMINI_MODEL) {
        process.env.GEMINI_MODEL = env.GEMINI_MODEL;
      }
    },
    configureServer(server: ViteDevServer) {
      server.middlewares.use((req, res, next) => {
        if (req.url === '/api/voice-handover') {
          handleVoiceHandover(req, res);
        } else {
          next();
        }
      });
    },
    configurePreviewServer(server: PreviewServer) {
      server.middlewares.use((req, res, next) => {
        if (req.url === '/api/voice-handover') {
          handleVoiceHandover(req, res);
        } else {
          next();
        }
      });
    },
  };
}
