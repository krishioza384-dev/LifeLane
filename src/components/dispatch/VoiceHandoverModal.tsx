import React, { useState, useRef, useEffect } from 'react';
import {
  Mic,
  Square,
  Sparkles,
  Check,
  AlertTriangle,
  X,
  RotateCcw,
  Send,
  Loader2,
  Heart,
  Activity,
  Gauge,
  ShieldAlert,
  Clock,
  User,
  Pill,
} from 'lucide-react';
import type {
  StructuredHandover,
  VerifiedEmergencyHandover,
  SystemHandoverMetadata,
} from '../../types/voiceHandover';
import {
  isAudioRecordingSupported,
  getSupportedAudioMimeType,
  processVoiceHandover,
} from '../../services/voiceHandoverService';

interface VoiceHandoverModalProps {
  isOpen: boolean;
  onClose: () => void;
  destinationHospital: string;
  onSendHandover: (handover: VerifiedEmergencyHandover) => void;
}

type ModalState = 'idle' | 'recording' | 'processing' | 'review' | 'sending' | 'error';

export function VoiceHandoverModal({
  isOpen,
  onClose,
  destinationHospital,
  onSendHandover,
}: VoiceHandoverModalProps) {
  const [modalState, setModalState] = useState<ModalState>('idle');
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Preliminary Handover (local state only before SEND)
  const [preliminaryHandover, setPreliminaryHandover] = useState<StructuredHandover | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);
  const timerIntervalRef = useRef<number | null>(null);
  const currentMimeTypeRef = useRef<string>('audio/webm');

  // Reset state when opened or closed
  useEffect(() => {
    if (!isOpen) {
      cleanupRecording();
      setModalState('idle');
      setRecordingSeconds(0);
      setErrorMessage(null);
      setPreliminaryHandover(null);
    }
  }, [isOpen]);

  const cleanupRecording = () => {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      try {
        mediaRecorderRef.current.stop();
      } catch {
        // ignore
      }
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    audioChunksRef.current = [];
  };

  const startRecording = async () => {
    setErrorMessage(null);
    if (!isAudioRecordingSupported()) {
      setErrorMessage('Audio recording is not supported in this browser environment.');
      setModalState('error');
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      audioChunksRef.current = [];

      const mimeType = getSupportedAudioMimeType();
      currentMimeTypeRef.current = mimeType;

      const mediaRecorder = new MediaRecorder(stream, { mimeType });
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.start(250); // Slice every 250ms
      setModalState('recording');
      setRecordingSeconds(0);

      // Start 120-second max recording counter
      timerIntervalRef.current = window.setInterval(() => {
        setRecordingSeconds((prev) => {
          if (prev >= 119) {
            stopRecordingAndAnalyze();
            return 120;
          }
          return prev + 1;
        });
      }, 1000);
    } catch (err: any) {
      cleanupRecording();
      if (err?.name === 'NotAllowedError' || err?.name === 'PermissionDeniedError') {
        setErrorMessage('Microphone access was denied. Please allow microphone permissions in your browser.');
      } else if (err?.name === 'NotFoundError') {
        setErrorMessage('No microphone device found on this system.');
      } else {
        setErrorMessage(err?.message || 'Failed to initialize audio recording.');
      }
      setModalState('error');
    }
  };

  const stopRecordingAndAnalyze = () => {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }

    const mediaRecorder = mediaRecorderRef.current;
    if (!mediaRecorder || mediaRecorder.state === 'inactive') {
      return;
    }

    setModalState('processing');

    mediaRecorder.onstop = async () => {
      try {
        const audioBlob = new Blob(audioChunksRef.current, { type: currentMimeTypeRef.current });
        // Clean up hardware audio track immediately
        if (streamRef.current) {
          streamRef.current.getTracks().forEach((track) => track.stop());
          streamRef.current = null;
        }

        const response = await processVoiceHandover(audioBlob, currentMimeTypeRef.current);

        if (!response.success || !response.handover) {
          setErrorMessage(response.error || 'Failed to process voice handover with Gemini AI.');
          setModalState('error');
          return;
        }

        setPreliminaryHandover(response.handover);
        setModalState('review');
      } catch (err: any) {
        setErrorMessage(err?.message || 'An error occurred during audio processing.');
        setModalState('error');
      }
    };

    mediaRecorder.stop();
  };

  const handleSendToHospital = () => {
    if (!preliminaryHandover) return;
    setModalState('sending');

    const systemMeta: SystemHandoverMetadata = {
      ambulanceId: 'A-402',
      emergencyType: 'Cardiac',
      destinationHospital,
      etaMinutes: 8,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const verifiedPayload: VerifiedEmergencyHandover = {
      systemMeta,
      clinicalHandover: preliminaryHandover,
      verifiedAt: new Date().toISOString(),
    };

    // Update LifeLaneContext only upon explicit Send click
    onSendHandover(verifiedPayload);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-md animate-in fade-in duration-200 select-none">
      <div className="relative w-full max-w-[760px] max-h-[90vh] flex flex-col rounded-[26px] bg-[#070D16] border border-white/[0.12] shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_30px_rgba(34,224,107,0.1)] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.08] bg-[#09111D]/80">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#0E271B] border border-[#22E06B]/40 flex items-center justify-center text-[#22E06B] shadow-[0_0_12px_rgba(34,224,107,0.2)]">
              <Mic className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-semibold text-white font-sans tracking-tight">
                  Voice Handover
                </h3>
                <span className="px-2 py-0.5 rounded-full border border-indigo-400/30 bg-indigo-950/40 text-indigo-300 text-[10px] font-mono">
                  UNIT A-402
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono mt-0.5">
                Target: <span className="text-white font-semibold">{destinationHospital}</span>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            type="button"
            aria-label="Close modal"
            className="w-8 h-8 rounded-xl border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.08] text-slate-400 hover:text-white flex items-center justify-center transition-all cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* STATE: IDLE */}
          {modalState === 'idle' && (
            <div className="flex flex-col items-center justify-center py-10 space-y-6 text-center">
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-[#0E271B] border border-[#22E06B]/40 flex items-center justify-center text-[#22E06B] shadow-[0_0_30px_rgba(34,224,107,0.25)]">
                  <Mic className="w-10 h-10" />
                </div>
              </div>

              <div className="max-w-md space-y-2">
                <h4 className="text-lg font-medium text-white font-sans">
                  Ready to Dictate Patient Handover
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed font-sans">
                  Speak naturally about the patient condition, vitals, pre-hospital treatments, and allergies. Gemini AI will structure your verbal report for review.
                </p>
              </div>

              <button
                onClick={startRecording}
                type="button"
                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-[#17CB5C] to-[#22E06B] hover:brightness-105 active:scale-95 text-[#051A0E] text-sm font-mono font-bold flex items-center gap-2.5 shadow-[0_0_25px_rgba(34,224,107,0.35)] transition-all cursor-pointer"
              >
                <Mic className="w-4 h-4" />
                <span>Start Recording</span>
              </button>
            </div>
          )}

          {/* STATE: RECORDING */}
          {modalState === 'recording' && (
            <div className="flex flex-col items-center justify-center py-10 space-y-6 text-center">
              {/* Pulsing Audio Visualizer */}
              <div className="relative flex items-center justify-center">
                <div className="absolute w-32 h-32 rounded-full bg-[#FF4D4D]/20 animate-ping pointer-events-none" />
                <div className="w-24 h-24 rounded-full bg-[#281116] border border-[#FF4D4D]/50 flex items-center justify-center text-[#FF4D4D] shadow-[0_0_30px_rgba(255,77,77,0.3)]">
                  <Mic className="w-10 h-10 animate-pulse" />
                </div>
              </div>

              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#FF4D4D]/40 bg-[#281116] text-[#FF4D4D] text-xs font-mono font-semibold">
                  <span className="w-2 h-2 rounded-full bg-[#FF4D4D] animate-ping" />
                  <span>RECORDING · {Math.floor(recordingSeconds / 60)}:{(recordingSeconds % 60).toString().padStart(2, '0')}</span>
                </div>
                <p className="text-xs text-slate-300 font-sans max-w-sm">
                  Describe the patient, symptoms, vitals, treatments given, and allergies.
                </p>
              </div>

              <button
                onClick={stopRecordingAndAnalyze}
                type="button"
                className="px-6 py-3 rounded-2xl bg-[#FF4D4D] hover:bg-[#FF3333] active:scale-95 text-white text-sm font-mono font-bold flex items-center gap-2 shadow-[0_0_25px_rgba(255,77,77,0.35)] transition-all cursor-pointer"
              >
                <Square className="w-4 h-4 fill-white" />
                <span>Stop & Analyze</span>
              </button>
            </div>
          )}

          {/* STATE: PROCESSING */}
          {modalState === 'processing' && (
            <div className="flex flex-col items-center justify-center py-12 space-y-5 text-center">
              <div className="w-16 h-16 rounded-full bg-[#0E271B] border border-[#22E06B]/40 flex items-center justify-center text-[#22E06B] shadow-[0_0_25px_rgba(34,224,107,0.2)]">
                <Loader2 className="w-8 h-8 animate-spin" />
              </div>
              <div className="space-y-1.5">
                <h4 className="text-base font-semibold text-white font-sans">
                  Parsing Handover with Gemini AI
                </h4>
                <p className="text-xs text-slate-400 font-mono">
                  Extracting clinical fields, vital parameters, and detecting missing data...
                </p>
              </div>
            </div>
          )}

          {/* STATE: ERROR */}
          {modalState === 'error' && (
            <div className="flex flex-col items-center justify-center py-8 space-y-5 text-center">
              <div className="w-16 h-16 rounded-full bg-[#250F14] border border-[#FF4D4D]/40 flex items-center justify-center text-[#FF4D4D]">
                <AlertTriangle className="w-8 h-8" />
              </div>

              <div className="max-w-md space-y-2">
                <h4 className="text-base font-semibold text-white font-sans">
                  Unable to Process Voice Handover
                </h4>
                <p className="text-xs text-[#FF4D4D] font-mono leading-relaxed bg-[#250F14]/70 p-3 rounded-xl border border-[#FF4D4D]/30">
                  {errorMessage || 'Voice processing failed. Please try again.'}
                </p>
              </div>

              <button
                onClick={startRecording}
                type="button"
                className="px-5 py-2.5 rounded-xl border border-white/[0.1] bg-white/[0.04] hover:bg-white/[0.08] text-white text-xs font-mono flex items-center gap-2 transition-all cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retry Recording</span>
              </button>
            </div>
          )}

          {/* STATE: REVIEW (Preliminary State) */}
          {(modalState === 'review' || modalState === 'sending') && preliminaryHandover && (
            <div className="space-y-5">
              {/* Review Guidance Header */}
              <div className="flex items-center justify-between p-3 rounded-xl border border-amber-400/30 bg-amber-950/30 text-xs font-mono text-amber-300">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>PRELIMINARY AI EXTRACTION · MANDATORY HUMAN VERIFICATION</span>
                </div>
                <span className="text-[10px] text-amber-400/80">Review & Edit below</span>
              </div>

              {/* 1. Patient & Situation Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Patient Identifier */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400 flex items-center justify-between">
                    <span>Patient Identifier</span>
                    {preliminaryHandover.patient === null && (
                      <span className="text-amber-400 text-[9px]">⚠️ Not Reported</span>
                    )}
                  </label>
                  <input
                    type="text"
                    value={preliminaryHandover.patient || ''}
                    placeholder="e.g. Male, approx 58yo (click to add)"
                    onChange={(e) =>
                      setPreliminaryHandover({
                        ...preliminaryHandover,
                        patient: e.target.value.trim() || null,
                      })
                    }
                    className="w-full px-3.5 py-2 rounded-xl bg-[#09111D] border border-white/[0.1] text-xs font-sans text-white focus:outline-none focus:border-[#22E06B]/50 transition-colors"
                  />
                </div>

                {/* Onset */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400 flex items-center justify-between">
                    <span>Onset Time / Duration</span>
                    {preliminaryHandover.onset === null && (
                      <span className="text-amber-400 text-[9px]">⚠️ Not Reported</span>
                    )}
                  </label>
                  <input
                    type="text"
                    value={preliminaryHandover.onset || ''}
                    placeholder="e.g. 45 min prior to arrival (click to add)"
                    onChange={(e) =>
                      setPreliminaryHandover({
                        ...preliminaryHandover,
                        onset: e.target.value.trim() || null,
                      })
                    }
                    className="w-full px-3.5 py-2 rounded-xl bg-[#09111D] border border-white/[0.1] text-xs font-sans text-white focus:outline-none focus:border-[#22E06B]/50 transition-colors"
                  />
                </div>
              </div>

              {/* Situation & Chief Complaint */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400 flex items-center justify-between">
                  <span>Situation / Chief Complaint</span>
                  {preliminaryHandover.situation === null && (
                    <span className="text-amber-400 text-[9px]">⚠️ Not Reported</span>
                  )}
                </label>
                <textarea
                  rows={2}
                  value={preliminaryHandover.situation || ''}
                  placeholder="Describe situation (click to add)"
                  onChange={(e) =>
                    setPreliminaryHandover({
                      ...preliminaryHandover,
                      situation: e.target.value.trim() || null,
                    })
                  }
                  className="w-full px-3.5 py-2 rounded-xl bg-[#09111D] border border-white/[0.1] text-xs font-sans text-white focus:outline-none focus:border-[#22E06B]/50 transition-colors resize-none"
                />
              </div>

              {/* 2. Vitals Section (Heart Rate, SpO2, Blood Pressure) */}
              <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                  Extracted Vitals
                </span>
                <div className="grid grid-cols-3 gap-3">
                  {/* Heart Rate */}
                  <div className="p-3 rounded-xl bg-[#09111D] border border-white/[0.08] space-y-1">
                    <span className="text-[9px] font-mono text-slate-400 uppercase flex items-center justify-between">
                      <span>Heart Rate</span>
                      <Heart className="w-3 h-3 text-[#FF4D4D]" />
                    </span>
                    <input
                      type="number"
                      value={preliminaryHandover.vitals.heartRate ?? ''}
                      placeholder="Not reported"
                      onChange={(e) => {
                        const val = e.target.value ? parseInt(e.target.value, 10) : null;
                        setPreliminaryHandover({
                          ...preliminaryHandover,
                          vitals: { ...preliminaryHandover.vitals, heartRate: val },
                        });
                      }}
                      className="w-full bg-transparent text-lg font-mono font-bold text-white focus:outline-none"
                    />
                    <span className="text-[9px] font-mono text-[#64748B]">BPM</span>
                  </div>

                  {/* SpO2 */}
                  <div className="p-3 rounded-xl bg-[#09111D] border border-white/[0.08] space-y-1">
                    <span className="text-[9px] font-mono text-slate-400 uppercase flex items-center justify-between">
                      <span>SpO2</span>
                      <Activity className="w-3 h-3 text-[#F5A524]" />
                    </span>
                    <input
                      type="number"
                      value={preliminaryHandover.vitals.spo2 ?? ''}
                      placeholder="Not reported"
                      onChange={(e) => {
                        const val = e.target.value ? parseInt(e.target.value, 10) : null;
                        setPreliminaryHandover({
                          ...preliminaryHandover,
                          vitals: { ...preliminaryHandover.vitals, spo2: val },
                        });
                      }}
                      className="w-full bg-transparent text-lg font-mono font-bold text-[#F5A524] focus:outline-none"
                    />
                    <span className="text-[9px] font-mono text-[#64748B]">%</span>
                  </div>

                  {/* Blood Pressure */}
                  <div className="p-3 rounded-xl bg-[#09111D] border border-white/[0.08] space-y-1">
                    <span className="text-[9px] font-mono text-slate-400 uppercase flex items-center justify-between">
                      <span>Blood Pressure</span>
                      <Gauge className="w-3 h-3 text-[#38BDF8]" />
                    </span>
                    <input
                      type="text"
                      value={preliminaryHandover.vitals.bloodPressure || ''}
                      placeholder="Not reported"
                      onChange={(e) => {
                        setPreliminaryHandover({
                          ...preliminaryHandover,
                          vitals: {
                            ...preliminaryHandover.vitals,
                            bloodPressure: e.target.value.trim() || null,
                          },
                        });
                      }}
                      className="w-full bg-transparent text-lg font-mono font-bold text-[#38BDF8] focus:outline-none"
                    />
                    <span className="text-[9px] font-mono text-[#64748B]">mmHg</span>
                  </div>
                </div>
              </div>

              {/* 3. Paramedic Stated Assessment */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400 flex items-center justify-between">
                  <span>Paramedic Stated Assessment (Not AI Diagnosis)</span>
                  {preliminaryHandover.assessment === null && (
                    <span className="text-amber-400 text-[9px]">⚠️ Not Reported</span>
                  )}
                </label>
                <input
                  type="text"
                  value={preliminaryHandover.assessment || ''}
                  placeholder="e.g. Suspected cardiac event (click to add)"
                  onChange={(e) =>
                    setPreliminaryHandover({
                      ...preliminaryHandover,
                      assessment: e.target.value.trim() || null,
                    })
                  }
                  className="w-full px-3.5 py-2 rounded-xl bg-[#09111D] border border-white/[0.1] text-xs font-sans text-white focus:outline-none focus:border-[#22E06B]/50 transition-colors"
                />
              </div>

              {/* 4. Treatments Administered */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400 flex items-center justify-between">
                  <span>Pre-Hospital Interventions Given</span>
                  {preliminaryHandover.treatment === null && (
                    <span className="text-amber-400 text-[9px]">⚠️ Not Reported</span>
                  )}
                </label>
                <input
                  type="text"
                  value={preliminaryHandover.treatment || ''}
                  placeholder="e.g. Aspirin 325mg PO, O2 4L via cannula (click to add)"
                  onChange={(e) =>
                    setPreliminaryHandover({
                      ...preliminaryHandover,
                      treatment: e.target.value.trim() || null,
                    })
                  }
                  className="w-full px-3.5 py-2 rounded-xl bg-[#09111D] border border-white/[0.1] text-xs font-sans text-white focus:outline-none focus:border-[#22E06B]/50 transition-colors"
                />
              </div>

              {/* 5. Allergies, History & Consciousness */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Allergies */}
                <div className="space-y-1">
                  <label className="text-[9px] font-mono uppercase text-slate-400 flex items-center justify-between">
                    <span>Allergies</span>
                    {preliminaryHandover.allergies === null && (
                      <span className="text-amber-400 text-[8px]">Unreported</span>
                    )}
                  </label>
                  <input
                    type="text"
                    value={preliminaryHandover.allergies || ''}
                    placeholder="e.g. Penicillin"
                    onChange={(e) =>
                      setPreliminaryHandover({
                        ...preliminaryHandover,
                        allergies: e.target.value.trim() || null,
                      })
                    }
                    className="w-full px-3 py-1.5 rounded-lg bg-[#09111D] border border-white/[0.08] text-xs font-sans text-white focus:outline-none"
                  />
                </div>

                {/* History */}
                <div className="space-y-1">
                  <label className="text-[9px] font-mono uppercase text-slate-400 flex items-center justify-between">
                    <span>History</span>
                    {preliminaryHandover.history === null && (
                      <span className="text-amber-400 text-[8px]">Unreported</span>
                    )}
                  </label>
                  <input
                    type="text"
                    value={preliminaryHandover.history || ''}
                    placeholder="e.g. Hypertension"
                    onChange={(e) =>
                      setPreliminaryHandover({
                        ...preliminaryHandover,
                        history: e.target.value.trim() || null,
                      })
                    }
                    className="w-full px-3 py-1.5 rounded-lg bg-[#09111D] border border-white/[0.08] text-xs font-sans text-white focus:outline-none"
                  />
                </div>

                {/* Consciousness */}
                <div className="space-y-1">
                  <label className="text-[9px] font-mono uppercase text-slate-400 flex items-center justify-between">
                    <span>Consciousness</span>
                    {preliminaryHandover.consciousness === null && (
                      <span className="text-amber-400 text-[8px]">Unreported</span>
                    )}
                  </label>
                  <input
                    type="text"
                    value={preliminaryHandover.consciousness || ''}
                    placeholder="e.g. Alert x3"
                    onChange={(e) =>
                      setPreliminaryHandover({
                        ...preliminaryHandover,
                        consciousness: e.target.value.trim() || null,
                      })
                    }
                    className="w-full px-3 py-1.5 rounded-lg bg-[#09111D] border border-white/[0.08] text-xs font-sans text-white focus:outline-none"
                  />
                </div>
              </div>

              {/* Missing Fields Strip */}
              {preliminaryHandover.missingFields.length > 0 && (
                <div className="p-3 rounded-xl bg-[#201609] border border-amber-400/30 space-y-1.5">
                  <span className="text-[10px] font-mono text-amber-400 font-semibold uppercase flex items-center gap-1.5">
                    <AlertTriangle className="w-3 h-3" />
                    <span>Unmentioned Clinical Fields ({preliminaryHandover.missingFields.length})</span>
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {preliminaryHandover.missingFields.map((f) => (
                      <span
                        key={f}
                        className="px-2 py-0.5 rounded-md border border-amber-400/30 bg-amber-950/40 text-amber-300 text-[9px] font-mono"
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer / Actions */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-white/[0.08] bg-[#09111D]/90">
          <button
            onClick={onClose}
            type="button"
            className="px-4 py-2 rounded-xl border border-white/[0.1] bg-white/[0.03] hover:bg-white/[0.07] text-slate-300 text-xs font-mono transition-all cursor-pointer"
          >
            Cancel
          </button>

          {(modalState === 'review' || modalState === 'sending') && (
            <div className="flex items-center gap-3">
              <button
                onClick={startRecording}
                type="button"
                className="px-3.5 py-2 rounded-xl border border-white/[0.1] bg-white/[0.03] hover:bg-white/[0.07] text-slate-300 text-xs font-mono flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Re-Record</span>
              </button>

              <button
                onClick={handleSendToHospital}
                disabled={modalState === 'sending'}
                type="button"
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#17CB5C] to-[#22E06B] hover:brightness-105 active:scale-95 text-[#051A0E] text-xs font-mono font-bold flex items-center gap-2 shadow-[0_0_20px_rgba(34,224,107,0.3)] transition-all cursor-pointer"
              >
                {modalState === 'sending' ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-[#051A0E]" />
                    <span>Transmitting...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>SEND TO HOSPITAL</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
