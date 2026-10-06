import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {toast} from "react-toastify";
import type {MedicalRecordInput} from "../../types/medical-record.type.ts";
import Loading from "../../components/shared/loading.tsx";
import ErrorCard from "../../components/cards/error.card.tsx";
import {useMedicalRecord, useUpdateMedicalRecord} from "../../hooks/useMedicalRecords.ts";
import MedicalRecordForm from "../../components/forms/medical-record.form.tsx";

const UpdateMedicalRecordPage = () => {
  const navigate = useNavigate();

  const {patientId, id} = useParams<{ patientId: string; id: string; }>();
  const [initialValues, setInitialValues] = useState<MedicalRecordInput | undefined>();
  const {data, isLoading, isError,} = useMedicalRecord(id);
  const {mutate: updateMedicalRecord, isPending,} = useUpdateMedicalRecord();

  useEffect(() => {
    if (!data?.record) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setInitialValues({
      patientId: data.record.patientId,
      doctorId: data.record.doctorId,
      treatmentDate: data.record.treatmentDate,
      diseaseType: data.record.diseaseType,
      diagnosis: data.record.diagnosis,
    });
  }, [data]);

  const handleSubmit = (record: MedicalRecordInput) => {
    if (!id) return;
    updateMedicalRecord(
      {id, record},
      {
        onSuccess: () => {
          toast.success("Tibbiy yozuv muvaffaqiyatli yangilandi.");
          navigate(`/patients/${patientId}`);
        },
        onError: (error) => {
          toast.error(error.message);
        },
      }
    );
  };

  if (isLoading) return <Loading/>;

  if (isError || !initialValues) {
    return (
      <div>
        <ErrorCard/>
      </div>
    );
  }

  return (
    <section className='mt-10'>
      <h1 className="text-2xl font-bold text-center mb-2">Tibbiy yozuvni tahrirlash</h1>
      <p className='text-center mb-5'>Bemorning tibbiy yozuv ma'lumotlari</p>

      <MedicalRecordForm
        initialValues={initialValues}
        onSubmit={handleSubmit}
        isPending={isPending}
        submitText="Saqlash"
      />
    </section>
  );
};

export default UpdateMedicalRecordPage;
