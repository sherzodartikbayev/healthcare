import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {toast} from "react-toastify";
import {usePatient, useUpdatePatient} from "../../hooks/usePatient";
import type {CreatePatientType} from "../../types/patient.type.ts";
import PatientForm from "../../components/forms/patient.form.tsx";

const UpdatePatientPage = () => {
  const {id} = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [initialValues, setInitialValues] = useState<CreatePatientType | null>(null);
  const {data, isLoading, isError} = usePatient(id!);

  const {mutate: updatePatient, isPending} = useUpdatePatient();

  useEffect(() => {
    if (!data?.patient) return;
    const patient = data.patient;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setInitialValues({
      firstName: patient.firstName,
      lastName: patient.lastName,
      middleName: patient.middleName ?? "",
      birthDate: patient.birthDate ?? "",
      birthPlace: patient.birthPlace ?? "",
      address: patient.address ?? "",
      maritalStatus: patient.maritalStatus ?? "",
      avatarUrl: patient.avatarUrl ?? "",
      education: patient.education ?? "",
      workplace: patient.workplace ?? "",
      phone: patient.phone ?? "",
      emergencyPhone: patient.emergencyPhone ?? "",
      bloodGroup: patient.bloodGroup ?? "",
      rhFactor: patient.rhFactor ?? "",
      insurancePolicy: patient.insurancePolicy ?? "",
      insuranceProvider: patient.insuranceProvider ?? "",
      weight: patient.weight ?? "",
      height: patient.height ?? "",
      allergies: patient.allergies ?? "",
    });
  }, [data]);

  const handleSubmit = (patient: CreatePatientType) => {
    if (!id) return;

    updatePatient(
      {id, patient},
      {
        onSuccess: () => {
          toast.success("Bemor muvaffaqiyatli yangilandi.");
          navigate("/patients");
        },
        onError: (error) => {
          toast.error(error.message);
        },
      }
    );
  };

  if (isLoading) {
    return <div className="flex justify-center p-10">Ma'lumotlar yuklanmoqda...</div>
  }

  if (isError || !initialValues) {
    return <div className="flex justify-center p-10">Bemor ma'lumotlarini yuklab bo'lmadi.</div>
  }

  return (
    <div className="my-7.5">
      <h1 className='section-title text-center'>Bemor ma'lumotlarini yangilash</h1>
      <p className='font-roboto text-base font-bold text-center mb-5'>Shaxsiy ma'lumotlar</p>

      <PatientForm
        initialValues={initialValues}
        onSubmit={handleSubmit}
        isPending={isPending}
        submitText="O'zgarishlarni saqlash"
      />
    </div>
  );
};

export default UpdatePatientPage;
