import type {RoomType} from "../../types/room.type.ts";
import Button from "../ui/button.tsx";

const RoomMobileCard = ({room}: {room: RoomType}) => {
  return (
    <div className="border-gray rounded-xl border p-4">
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <div className="min-w-0">
            <p className="text-gray text-xs">Raqami</p>
            <p className="mt-1 text-sm font-medium">{room.roomNumber || "—"}</p>
          </div>
          <div>
            <p className="text-gray text-xs">Qavati</p>
            <p className="mt-1 text-sm font-medium">{room.floor || "—"}</p>
          </div>
        </div>

        <div className="flex shrink-0 gap-2">
          <Button type="button">
            <img src="/icons/edit.svg" alt="Edit" className="size-4" />
          </Button>
          <Button type="button">
            <img src="/icons/delete.svg" alt="Delete" className="size-4" />
          </Button>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-x-4 gap-y-4">
        <div>
          <p className="text-gray text-xs">Hajmi</p>
          <p className="mt-1 text-sm font-medium">{room.capacity || "—"}</p>
        </div>
        <div>
          <p className="text-gray text-xs">Bemorlar soni</p>
          <p className="mt-1 text-sm font-medium">{room.patients.length || "—"}</p>
        </div>
      </div>
    </div>
  )
};

export default RoomMobileCard;
