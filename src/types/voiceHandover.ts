export interface ClinicalVitals {
  heartRate: number | null;
  spo2: number | null;
  bloodPressure: string | null;
}

export interface StructuredHandover {
  patient: string | null;
  situation: string | null;
  onset: string | null;
  vitals: ClinicalVitals;
  assessment: string | null;
  treatment: string | null;
  allergies: string | null;
  history: string | null;
  consciousness: string | null;
  missingFields: string[];
}

export interface SystemHandoverMetadata {
  ambulanceId: string;
  emergencyType: string;
  destinationHospital: string;
  etaMinutes: number;
  timestamp: string;
}

export interface VerifiedEmergencyHandover {
  systemMeta: SystemHandoverMetadata;
  clinicalHandover: StructuredHandover;
  verifiedAt: string;
}

export interface VoiceHandoverRequest {
  audioBase64: string;
  mimeType: string;
}

export interface VoiceHandoverResponse {
  success: boolean;
  handover?: StructuredHandover;
  error?: string;
}
