import Button from "../ui/button.tsx";
import type {RoomType} from "../../types/room.type.ts";
import {useDepartment} from "../../hooks/useDepartment.ts";

const RoomCard = ({ room }: { room: RoomType}) => {
  const {data} = useDepartment(room.departmentId);
  const department = data?.department.name || []

  const freeSpace = room.capacity - room.patients.length

  return (
    <tr className="border-b border-t border-gray text-sm text-gray-dark">
      <td className="whitespace-nowrap px-6 py-3">{room.roomNumber || "—"}</td>
      <td className="max-w-55 truncate py-3">{room.floor || "—"}</td>
      <td className="whitespace-nowrap py-3">{department || "—"}</td>
      <td className="max-w-55 truncate py-3">{room.capacity || "—"}</td>
      <td className="max-w-55 truncate py-3">{room.patients.length || "—"}</td>
      <td className="max-w-55 truncate py-3">{freeSpace || "Mavjud emas"}</td>
      <td className="max-w-55 truncate py-3">{room.status || "—"}</td>
      <td className="px-6 py-3">
        <div className="flex items-center gap-5">
          <Button type="button">
            <img src="/icons/edit.svg" alt="Edit" className="size-4"/>
          </Button>
          <Button type="button">
            <img src="/icons/delete.svg" alt="Delete" className="size-4"/>
          </Button>
        </div>
      </td>
    </tr>
  )
};

export default RoomCard;
