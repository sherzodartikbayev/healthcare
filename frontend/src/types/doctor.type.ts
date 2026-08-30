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

export type UpdateDoctorInput = Partial<DoctorType>
