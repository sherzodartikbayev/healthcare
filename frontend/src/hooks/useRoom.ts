import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {createRoom, deleteRoom, getRooms, updateRoom} from "../api/room.api.ts";
import type {CreateRoomInput, UpdateRoomInput} from "../types/room.type.ts";

export function useRooms() {
    return useQuery({
        queryKey: ['rooms'],
        queryFn: getRooms,
    })
}

export function useCreateRoom() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (room: CreateRoomInput) => createRoom(room),
        onSuccess: () => queryClient.invalidateQueries({queryKey: ['rooms']})
    })
}

export function useUpdateRooms() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({id, room}: { id: string, room: UpdateRoomInput }) => updateRoom(id, room),
        onSuccess: () => queryClient.invalidateQueries({queryKey: ['rooms']})
    })
}

export function useDeleteRoom() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: deleteRoom,
        onSuccess: () => queryClient.invalidateQueries({queryKey: ['rooms']})
    })
}

