import Button from "../ui/button.tsx";
import type {PatientType} from "../../types/patient.type.ts";
import Modal from "../shared/modal.tsx";
import {useModalStore} from "../../stores/modal.store.ts";
import {useDeletePatient} from "../../hooks/usePatient.ts";
import {toast} from "react-toastify";
import {Link} from "react-router-dom";

interface Props {
  patient: PatientType
}

const PatientCard = ({patient}: Props) => {
  const {open, close} = useModalStore();
  const {mutate: deletePatientMutation} = useDeletePatient();

  const handleDelete = () => {
    deletePatientMutation(patient.id, {
      onSuccess: () => {
        toast.success("Bemor dasturdan o'chirib tashlandi");
        close();
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };

  return (
    <>
      <tr className="border-b border-t border-gray text-sm text-gray-dark">
        <td className="px-6 py-3">
          <div className="flex items-center gap-3">
            <img
              src={patient.avatarUrl || "/images/user.png"}
              alt={`${patient.firstName} ${patient.lastName}`}
              className="size-9 rounded-full object-cover"
            />
            <p className="whitespace-nowrap font-medium">{patient.firstName} {patient.lastName}</p>
          </div>
        </td>
        <td className="whitespace-nowrap py-3">{patient.phone || "—"}</td>
        <td className="max-w-55 truncate py-3">{patient.address || "—"}</td>
        <td className="whitespace-nowrap py-3">{patient.birthDate || "—"}</td>
        <td
          className="whitespace-nowrap py-3">{patient.updatedAt ? new Date(patient.updatedAt).toLocaleDateString("uz-UZ") : "—"}</td>
        <td
          className="whitespace-nowrap py-3">{patient.bloodGroup ? `${patient.bloodGroup}${patient.rhFactor || ""}` : "—"}</td>
        <td className="px-6 py-3">
          <div className="flex items-center gap-2">
            <Link to={`/patients/${patient.id}`}>
              <Button>
                <img src='/icons/eye.svg' alt='eye icon' className='size-5.5' />
              </Button>
            </Link>
            <Link to={`/patients/update/${patient.id}`}>
              <Button type="button">
                <img src="/icons/edit.svg" alt="Edit" className="size-4"/>
              </Button>
            </Link>
            <Button type="button" title="Bemorni dasturdan o'chirish" onClick={open}>
              <img src="/icons/delete.svg" alt="Delete" className="size-4"/>
            </Button>
          </div>
        </td>
      </tr>

      <Modal
        title="Bemorni rostan ham dasturdan o'chirmoqchimisiz?"
        description="Bemorni o'chirgandan so'ng ma'lumotlarni qayta tiklash imkoni mavjud emas."
        action={handleDelete}
      />
    </>
  );
};

export default PatientCard;
