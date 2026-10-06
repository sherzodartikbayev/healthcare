import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import type { MedicalRecordInput } from "../../types/medical-record.type.ts";
import MedicalRecordForm from "../../components/forms/medical-record.form.tsx";
import {useCreateMedicalRecord} from "../../hooks/useMedicalRecords.ts";

const CreateMedicalRecordPage = () => {
  const navigate = useNavigate();
  const { patientId } = useParams<{ patientId: string; }>();

  const {mutate: createMedicalRecord, isPending,} = useCreateMedicalRecord();

  const handleSubmit = (record: MedicalRecordInput) => {
    createMedicalRecord(record, {
      onSuccess: () => {
        toast.success("Tibbiy yozuv muvaffaqiyatli yaratildi.");
        navigate(`/patients/${patientId}`);
      },
      onError: () => {
        toast.error("Tibbiy yozuv yaratishda xatolik yuz berdi.");
      },
    });
  };

  return (
    <section className='mt-10'>
      <h1 className="text-2xl font-bold mb-2 text-center">Tibbiy yozuv qo'shish</h1>
      <p className='text-center mb-5'>Bemorning tibbiy yozuv ma'lumotlari</p>

      <MedicalRecordForm
        onSubmit={handleSubmit}
        isPending={isPending}
        submitText="Tibbiy yozuvni yaratish"
      />
    </section>
  );
};

export default CreateMedicalRecordPage;
