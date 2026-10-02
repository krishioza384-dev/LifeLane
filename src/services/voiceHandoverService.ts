import type { VoiceHandoverRequest, VoiceHandoverResponse } from '../types/voiceHandover';

export function isAudioRecordingSupported(): boolean {
  return (
    typeof window !== 'undefined' &&
    typeof navigator !== 'undefined' &&
    !!navigator.mediaDevices &&
    !!navigator.mediaDevices.getUserMedia &&
    typeof MediaRecorder !== 'undefined'
  );
}

export function getSupportedAudioMimeType(): string {
  if (typeof MediaRecorder === 'undefined') {
    return 'audio/webm';
  }

  const candidateTypes = [
    'audio/webm;codecs=opus',
    'audio/webm',
    'audio/mp4',
    'audio/ogg',
    'audio/wav',
  ];

  for (const mime of candidateTypes) {
    if (MediaRecorder.isTypeSupported(mime)) {
      return mime;
    }
  }

  return 'audio/webm';
}

export function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      if (!result) {
        reject(new Error('Failed to convert audio blob to Base64.'));
        return;
      }
      // Strip data URL prefix e.g. "data:audio/webm;base64,"
      const base64Data = result.includes(',') ? result.split(',')[1] : result;
      resolve(base64Data);
    };
    reader.onerror = () => reject(reader.error || new Error('FileReader error.'));
    reader.readAsDataURL(blob);
  });
}

export async function processVoiceHandover(
  audioBlob: Blob,
  mimeType: string,
  timeoutMs = 65000
): Promise<VoiceHandoverResponse> {
  const base64Data = await blobToBase64(audioBlob);

  const requestBody: VoiceHandoverRequest = {
    audioBase64: base64Data,
    mimeType: mimeType || 'audio/webm',
  };

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch('/api/voice-handover', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
      signal: controller.signal,
    });

    const data: VoiceHandoverResponse = await response.json();
    return data;
  } catch (err: any) {
    if (err?.name === 'AbortError') {
      return {
        success: false,
        error: 'Voice analysis request timed out. Please try recording again.',
      };
    }
    return {
      success: false,
      error: err?.message || 'Network error connecting to Voice Handover service.',
    };
  } finally {
    clearTimeout(timeoutId);
  }
}
