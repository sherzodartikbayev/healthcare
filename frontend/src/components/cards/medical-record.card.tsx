import Button from "../ui/button.tsx";
import type {MedicalRecordType} from "../../types/medical-record.type.ts";
import {useModalStore} from "../../stores/modal.store.ts";
import {toast} from "react-toastify";
import Modal from "../shared/modal.tsx";
import {Link} from "react-router-dom";
import {useDeleteMedicalRecord} from "../../hooks/useMedicalRecords.ts";

interface Props {
  record: MedicalRecordType
}

const MedicalRecordCard = ({record}: Props) => {
  const DoctorOfFullName = `${record.doctor.firstName} ${record.doctor.lastName}`;

  const {open, close} = useModalStore();
  const {mutate: deleteRecordMutation} = useDeleteMedicalRecord();

  const handleDelete = () => {
    deleteRecordMutation(record.id, {
      onSuccess: () => {
        toast.success("Kasallik tarixi dasturdan o'chirib tashlandi");
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
        <td className="whitespace-nowrap pl-6 py-3">{record.treatmentDate || "—"}</td>
        <td className="max-w-55 truncate py-3">{record.diseaseType || "—"}</td>
        <td className="max-w-55 truncate px-2 py-3">{record.diagnosis || "—"}</td>
        <td className="whitespace-nowrap py-3">{DoctorOfFullName || "—"}</td>
        <td className="px-3 py-3">
          <div className="flex items-center gap-5">
            <Link to={`/patients/${record.patientId}/medical-record/update/${record.id}`}>
              <Button type="button">
                <img src="/icons/edit.svg" alt="Edit" className="size-4"/>
              </Button>
            </Link>
            <Button type="button">
              <img src="/icons/delete.svg" alt="Delete" className="size-4" onClick={open} />
            </Button>
          </div>
        </td>
      </tr>

      <Modal
        title={"Ushbu kasallik tarixini rostan ham o'chirib tashlamoqchimisiz?"}
        description={"Kasallik tarixini o'chirgandan so'ng ma'lumotlarni qayta tiklash imkoni mavjud emas."}
        action={handleDelete}
      />
    </>
  )
};

export default MedicalRecordCard;
