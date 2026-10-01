import PatientForm from "../../components/forms/patient.form.tsx";
import {useNavigate} from "react-router-dom";
import {useCreatePatient} from "../../hooks/usePatient.ts";
import type {CreatePatientType} from "../../types/patient.type.ts";
import {toast} from "react-toastify";

const CreatePatient = () => {
  const navigate = useNavigate();
  const { mutate: createPatient, isPending } = useCreatePatient();

  const handleSubmit = (patient: CreatePatientType) => {
    createPatient(patient, {
      onSuccess: () => {
        toast.success("Bemor muvaffaqiyatli yaratildi.");
        navigate("/patients");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };

  return (
    <div className='my-7.5'>
      <h1 className='section-title text-center'>Yangi bemor ro’yhatdan o’tkazish</h1>
      <p className='font-roboto text-base font-bold my-5 text-center'>Shaxsiy ma'lumotlari</p>

      <PatientForm
        onSubmit={handleSubmit}
        isPending={isPending}
        submitText="Bemor yaratish"
      />
    </div>
  )
}

export default CreatePatient
