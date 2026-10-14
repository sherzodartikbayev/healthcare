export interface RoomType {
  id: string
  departmentId: string
  roomNumber: number
  floor: number
  capacity: number
  patients: string[]
  description?: string | null
  status: string
  createdAt: string
  updatedAt: string
}

export interface CreateRoomInput {
  departmentId: string
  roomNumber: number
  floor: number
  capacity: number
  patients: string[]
  description?: string | null
  status: string
}

export type UpdateRoomInput = Partial<CreateRoomInput>
