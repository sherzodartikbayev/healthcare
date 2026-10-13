export interface DoctorType {
  id: string
  departmentId: string
  firstName: string
  lastName: string
  middleName: string
  avatarUrl: string
  specialization: string
  birthDate: string
  birthPlace: string
  address: string
  maritalStatus: boolean
  education: string
  phone: string
  emergency: string
  hireDate: string
  employmentType: string
  workSchedule: string
  createdAt: string
  updatedAt: string
}

export interface CreateDoctorInput {
  departmentId: string
  firstName: string
  lastName: string
  middleName: string
  avatarUrl: string
  specialization: string
  birthDate: string
  birthPlace: string
  address: string
  maritalStatus: boolean
  education: string
  phone: string
  emergencyPhone: string
  hireDate: string
  employmentType: string
  workSchedule: string
}

export type UpdateDoctorInput = Partial<CreateDoctorInput>
