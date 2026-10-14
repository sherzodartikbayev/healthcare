import Button from "../ui/button.tsx";
import type {RoomType} from "../../types/room.type.ts";
import {useDepartment} from "../../hooks/useDepartment.ts";
import {useDeleteRoom} from "../../hooks/useRoom.ts";
import {useModalStore} from "../../stores/modal.store.ts";
import {Link} from "react-router-dom";
import {toast} from "react-toastify";
import Modal from "../shared/modal.tsx";

const RoomCard = ({room}: { room: RoomType }) => {
    const {open, close} = useModalStore();

    const {data} = useDepartment(room.departmentId);
    const department = data?.department.name || []
    const freeSpace = room.capacity - room.patients.length

    const {mutate: deleteRoomMutation} = useDeleteRoom()

    function handleDelete() {
        deleteRoomMutation(room.id, {
            onSuccess: () => {
                toast.success("Palata dasturdan o'chirib tashlandi")
                close()
            },
            onError: (error) => {
                toast.error(error.message);
            }
        })
    }

    return (
        <>
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
                        <Link to={`/update/rooms/${room.id}`}>
                            <Button type="button">
                                <img src="/icons/edit.svg" alt="Edit" className="size-4"/>
                            </Button>
                        </Link>
                        <Button type="button" onClick={open}>
                            <img src="/icons/delete.svg" alt="Delete" className="size-4"/>
                        </Button>
                    </div>
                </td>
            </tr>

            <Modal
                title={"Ushbu palatani rostan ham o'chirib tashlamoqchimisiz ?"}
                description={"Agar palatani o'chirib tashlasangiz keyin palata ma'lumotlarni qayta tiklash imkon mavjud emas"}
                action={handleDelete}
            />
        </>
    )
};

export default RoomCard;
