import type {CreateRoomInput, UpdateRoomInput} from "../types/room.type.ts";

const BASE_URL = 'http://localhost:8080'

export async function getRooms() {
    const response = await fetch(`${BASE_URL}/api/room`, {credentials: 'include'})
    if (!response.ok) throw new Error(`${response.status} ${response.statusText}`)
    return await response.json()
}

export async function createRoom(room: CreateRoomInput) {
    const response = await fetch(`${BASE_URL}/api/room`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(room),
    })
    if (!response.ok) throw new Error(`${response.status} ${response.statusText}`)
    return await response.json()
}

export async function updateRoom(id: string, room: UpdateRoomInput) {
    const response = await fetch(`${BASE_URL}/api/room/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(room),
    })
    if (!response.ok) throw new Error(`${response.status} ${response.statusText}`)
    return await response.json()
}

export async function deleteRoom(roomId: string) {
    const response = await fetch(`${BASE_URL}/api/room/${roomId}`, {
        method: 'DELETE',
        credentials: 'include',
    })
    if (!response.ok) throw new Error(`${response.status} ${response.statusText}`)
    return await response.json()
}