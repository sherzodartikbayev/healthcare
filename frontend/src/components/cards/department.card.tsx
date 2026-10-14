import Button from "../ui/button.tsx";
import type {DepartmentType} from "../../types/department.type.ts";
import {format} from "date-fns";
import {Link} from "react-router-dom";
import Modal from "../shared/modal.tsx";
import {useDeleteDepartment} from "../../hooks/useDepartment.ts";
import {toast} from "react-toastify";
import {useModalStore} from "../../stores/modal.store.ts";

const DepartmentCard = ({department}: { department: DepartmentType }) => {
    const {open, close} = useModalStore()

    const {mutate: deleteDepartmentMutation} = useDeleteDepartment()

    function handleDelete() {
        deleteDepartmentMutation(department.id, {
            onSuccess: () => {
                toast.success("Bo'lim dasturdan o'chirib tashlandi")
                close()
            },
            onError: (error) => {
                toast.error(error.message)
            }
        })
    }

    return (
        <>
            <tr className="border-b border-t border-gray text-sm text-gray-dark">
                <td className="whitespace-nowrap px-6 py-3">{department.name || "—"}</td>
                <td className="max-w-55 truncate py-3">{department.description || "—"}</td>
                <td className="max-w-55 truncate py-3">{format(department.createdAt, 'dd/MM/yyyy') || "—"}</td>
                <td className="whitespace-nowrap py-3">{format(department.updatedAt, 'dd/MM/yyyy') || "—"}</td>
                <td className="px-6 py-3">
                    <div className="flex items-center gap-5">
                        <Link to={`/update/departments/${department.id}`}>
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
                title={"Ushbu bo'limni rostan ham o'chirib tashlamoqchimisiz?"}
                description={"Agar bo'limni o'chirib tashlasangiz bo'lim ma'lumotlarini tiklash imkoni mavjud emas."}
                action={handleDelete}
            />
        </>
    )
}

export default DepartmentCard;
