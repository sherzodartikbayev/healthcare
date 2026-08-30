export interface DepartmentType {
  id: string
  name: string
  description: string
  createdAt: string
  updatedAt: string
}

export type UpdateDepartmentType = Partial<DepartmentType>
