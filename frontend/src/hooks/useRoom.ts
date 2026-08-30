import {useQuery} from "@tanstack/react-query";
import {getRooms} from "../api/room.api.ts";

export function useRooms () {
  return useQuery({
    queryKey: ['rooms'],
    queryFn: getRooms,
  })
}
