import {useRooms} from "../../hooks/useRoom.ts";
import type {RoomType} from "../../types/room.type.ts";
import RoomCard from "../cards/room.card.tsx";
import RoomMobileCard from "../cards/room-mobile.card.tsx";

const RoomList = () => {
  const {isLoading, data, error} = useRooms()
  const rooms: RoomType[] = data?.rooms || []

  if (isLoading) {
    return (
      <div className="w-full rounded-lg bg-white p-6 shadow-md">
        <div className="space-y-3">
          {Array.from({length: 5}).map((_, index) => (
            <div
              key={index}
              className="h-14 w-full animate-pulse rounded-lg bg-gray-100"
            />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full rounded-lg bg-white p-6 shadow-md">
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">
          Palatalarni yuklashda xatolik yuz berdi: {error.message}
        </div>
      </div>
    );
  }

  if (rooms.length === 0) {
    return (
      <div className="w-full rounded-lg bg-white p-6 shadow-md">
        <div className="py-10 text-center text-sm text-gray">
          Palatalar topilmadi
        </div>
      </div>
    );
  }

  return (
    <div className="w-full overflow-hidden rounded-lg bg-white shadow-md">
      {/* Desktop */}
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full min-w-225 text-left">
          <thead className="bg-[#E8E8E8] text-sm font-bold">
          <tr>
            <th className="whitespace-nowrap px-6 py-4">Raqami</th>
            <th className="whitespace-nowrap py-4">Qavat</th>
            <th className="whitespace-nowrap py-4">Bo'lim</th>
            <th className="whitespace-nowrap py-4">Hajmi</th>
            <th className="whitespace-nowrap py-4">Bemorlar soni</th>
            <th className="whitespace-nowrap py-4">Bo'sh joylar</th>
            <th className="whitespace-nowrap py-4">Holati</th>
            <th className="px-6 py-4">Amallar</th>
          </tr>
          </thead>

          <tbody>
          {rooms && rooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
          </tbody>z`
        </table>
      </div>

      {/* Mobile */}
      <div className="space-y-3 p-4 md:hidden">
        {rooms.map((room) => (
          <RoomMobileCard key={room.id} room={room}  />
        ))}
      </div>
    </div>
  )
}

export default RoomList;
