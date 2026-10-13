import type {DoctorType} from "../../types/doctor.type.ts";
import Button from "../ui/button.tsx";
import {useDepartment} from "../../hooks/useDepartment.ts";
import {Link} from "react-router-dom";
import Modal from "../shared/modal.tsx";
import {useModalStore} from "../../stores/modal.store.ts";
import {toast} from "react-toastify";
import {useDeleteDoctor} from "../../hooks/useDoctor.ts";

const DoctorCard = ({doctor}: { doctor: DoctorType }) => {
    const {open, close} = useModalStore();
    const {mutate: deleteDoctorMutation} = useDeleteDoctor();

    const handleDelete = () => {
        deleteDoctorMutation(doctor.id, {
            onSuccess: () => {
                toast.success("Bemor dasturdan o'chirib tashlandi");
                close();
            },
            onError: (error) => {
                toast.error(error.message);
            },
        });
    };

    const {data} = useDepartment(doctor.departmentId);
    const department = data?.department?.name

    return (
        <>
            <tr className="border-b border-t border-gray text-sm text-gray-dark">
                <td className="px-6 py-3">
                    <div className="flex items-center gap-3">
                        <img
                            src={doctor.avatarUrl || "/images/user.png"}
                            alt={`${doctor.firstName} ${doctor.lastName}`}
                            className="size-9 rounded-full object-cover"
                        />
                        <p className="whitespace-nowrap font-medium">{doctor.firstName} {doctor.lastName}</p>
                    </div>
                </td>
                <td className="whitespace-nowrap py-3">{doctor.phone || "—"}</td>
                <td className="max-w-55 truncate py-3">{doctor.address || "—"}</td>
                <td className="max-w-55 truncate py-3">{doctor.specialization || "—"}</td>
                <td className="whitespace-nowrap py-3">{department || "—"}</td>
                <td className="whitespace-nowrap py-3">{doctor.workSchedule || "—"}</td>
                <td className="px-6 py-3">
                    <div className="flex items-center gap-5">
                        <Link to={`/doctors/${doctor.id}`}>
                            <img src='/icons/eye.svg' alt='See doctor detail page' className='size-4'/>
                        </Link>
                        <Link to={`/update/doctors/${doctor.id}`}>
                            <Button type="button">
                                <img src="/icons/edit.svg" alt="Edit doctor" className="size-4"/>
                            </Button>
                        </Link>
                        <Button type="button" onClick={open}>
                            <img src="/icons/delete.svg" alt="Delete doctor" className="size-4"/>
                        </Button>
                    </div>
                </td>
            </tr>

            <Modal
                title="Shifokorni rostan ham dasturdan o'chirmoqchimisiz?"
                description="Shifokorni o'chirgandan so'ng ma'lumotlarni qayta tiklash imkoni mavjud emas."
                action={handleDelete}
            />
        </>
    )
}

export default DoctorCard;
