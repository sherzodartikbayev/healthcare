export interface MedicalRecordType {
  id: string;
  patientId: string;
  doctorId: string;
  treatmentDate: string;
  diseaseType: string;
  diagnosis: string;
  createdAt: string;
  updatedAt: string;
  doctor: MedicalRecordDoctor
}

export interface MedicalRecordDoctor {
  id: string;
  firstName: string;
  lastName: string;
  specialization: string;
}

export type MedicalRecordInput = {
  patientId: string;
  doctorId: string;
  treatmentDate: string;
  diseaseType: string;
  diagnosis: string;
};

export type UpdateMedicalRecordInput = Partial<MedicalRecordInput>;
