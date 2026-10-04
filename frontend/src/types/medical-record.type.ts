export interface MedicalRecordType {
  id: string
  patientId: string
  doctorId: string
  treatmentDate: string
  diseaseType: string
  diagnosis: string
  createdAt: string
  updatedAt: string
  doctor: MedicalRecordDoctorType
}

export interface MedicalRecordDoctorType {
  id: string
  firstName: string
  lastName: string
  specialization: string
}
