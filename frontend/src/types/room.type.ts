export interface RoomType {
  id: string
  departmentId: string
  roomNumber: string
  floor: number
  capacity: number
  patients: string[]
  description?: string | null
  status: string
  createdAt: string
  updatedAt: string
}

export type UpdateRoomType = Partial<RoomType>
