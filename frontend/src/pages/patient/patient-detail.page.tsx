import {Link, useNavigate, useParams} from "react-router-dom";
import {useDeletePatient, usePatient} from "../../hooks/usePatient.ts";
import Loading from "../../components/shared/loading.tsx";
import ErrorCard from "../../components/cards/error.card.tsx";
import type {PatientType} from "../../types/patient.type.ts";
import {format} from "date-fns";
import MedicalHistoryList from "../../components/lists/medical-history.list.tsx";
import Button from "../../components/ui/button.tsx";
import Modal from "../../components/shared/modal.tsx";
import {toast} from "react-toastify";
import {useModalStore} from "../../stores/modal.store.ts";

const PatientDetailPage = () => {
  const {id} = useParams();
  const navigate = useNavigate();

  const {open, close} = useModalStore();

  const {isLoading, data, isError} = usePatient(id!);
  const patient: PatientType = data?.patient;

  const {mutate: deletePatientMutation} = useDeletePatient();

  const handleDelete = () => {
    deletePatientMutation(patient.id, {
      onSuccess: () => {
        toast.success("Bemor dasturdan o'chirib tashlandi");
        close();
        navigate('/patients')
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };


  if (isLoading) {
    return <Loading/>
  }

  if (isError) {
    return (
      <div className='p-10'>
        <ErrorCard/>
      </div>
    )
  }

  return (
    <>
      <div className='container mx-9 gap-5  mb-20'>
        <div className='bg-white rounded-2xl shadow-md mb-10'>
          <div className='flex mb-5'>
            <figure className='w-50 h-54'>
              <img src={patient.avatarUrl || '/images/user.png'} className='size-full object-contain'/>
            </figure>

            <div className='p-5'>
              <h2 className='font-bold text-2xl mb-5'>{patient.firstName} {patient.lastName}</h2>

              <div className='d-flex gap-20'>
                <p className='detail-text flex items-center gap-5'>
                  Tashrif sanasi: <span
                  className='detail-text-bold'>{format(patient.createdAt, 'dd/MM/yyyy') || "—"}</span>
                </p>

                <p className='detail-text flex items-center gap-5'>
                  Chiqish sanasi: <span
                  className='detail-text-bold'>{format(patient.createdAt, 'dd/MM/yyyy') || "—"}</span>
                </p>
              </div>
            </div>

            <div className='flex pt-6.5 pr-6 ml-auto'>
              <Link to={`/patients/update/${patient.id}`}>
                <Button title="Bemor ma'lumotlarini yangilash">
                  <img src='/icons/edit.svg' alt='Update patient icon' className='size-4' />
                </Button>
              </Link>
              <Button title="Bemorni dasturdan o'chirib tashlash" onClick={open}>
                <img src='/icons/delete.svg' alt='Delete patient icon' className='size-4'/>
              </Button>
            </div>
          </div>

          {/* Personal Information */}
          <div className='pl-5 mb-7.5'>
            <h3 className='detail-text-bold mb-5'>Shaxsiy ma’lumotlar</h3>

            <div className='flex w-full'>
              <div className='flex flex-col gap-4.5 w-1/3'>
                <p className='detail-text flex items-center gap-11'>
                  Tug’ilgan sanasi <span
                  className='detail-text-bold'>{format(patient.birthDate, 'dd/MM/yyyy') || "—"}</span>
                </p>

                <p className='detail-text flex items-center gap-11'>
                  Tug’ilgan hudud <span
                  className='detail-text-bold'>{patient.birthPlace || "—"}</span>
                </p>

                <p className='detail-text flex items-center gap-25'>
                  Manzil <span
                  className='detail-text-bold max-w-50'>{patient.address || "—"}</span>
                </p>
              </div>

              <div className='flex flex-col gap-4.5 w-1/3'>
                <p className='detail-text flex items-center gap-11'>
                  Oilaviy holat <span
                  className='detail-text-bold'>{patient.maritalStatus || "—"}</span>
                </p>

                <p className='detail-text flex items-center gap-15'>
                  Ma’lumoti <span
                  className='detail-text-bold'>{patient.education || "—"}</span>
                </p>

                <p className='detail-text flex items-center gap-20'>
                  Ish joyi <span
                  className='detail-text-bold'>{patient.workplace || "—"}</span>
                </p>
              </div>

              <div className='flex flex-col gap-4.5 w-1/3'>
                <p className='detail-text flex items-center gap-11'>
                  Telefon raqam <span
                  className='detail-text-bold'>{patient.phone || "—"}</span>
                </p>

                <p className='detail-text flex items-center gap-11'>
                  Oila a’zolaridan <br/>
                  telefon raqam <span
                  className='detail-text-bold'>{patient.emergencyPhone || "—"}</span>
                </p>
              </div>
            </div>
          </div>

          <hr/>

          {/* Medical Information */}
          <div className='p-5'>
            <h3 className='detail-text-bold mb-5'>Tibbiy ma’lumotlar</h3>

            <div className='flex w-full'>
              <div className='flex flex-col gap-4.5 w-1/3'>
                <p className='detail-text flex items-center gap-16'>
                  Qon guruhi <span
                  className='detail-text-bold'>{patient.bloodGroup || "—"}</span>
                </p>

                <p className='detail-text flex items-center gap-19'>
                  RH faktor <span
                  className='detail-text-bold'>{patient.rhFactor || "—"}</span>
                </p>

                <p className='detail-text flex items-center gap-12.5'>
                  Sug’urta polisi <span
                  className='detail-text-bold max-w-50'>{patient.insurancePolicy || "—"}</span>
                </p>

                <p className='detail-text flex items-center gap-10'>
                  Sug’urta firmasi <span
                  className='detail-text-bold max-w-50'>{patient.insuranceProvider || "—"}</span>
                </p>
              </div>

              <div className='flex flex-col gap-4.5 w-1/3'>
                <p className='detail-text flex items-center gap-11'>
                  Vazni <span
                  className='detail-text-bold'>{patient.weight || "—"} kg</span>
                </p>

                <p className='detail-text flex items-center gap-11'>
                  Bo’yi <span
                  className='detail-text-bold'>{patient.height || "—"} sm</span>
                </p>

                <p className='detail-text flex items-center gap-8'>
                  Allergik reaksiyalar <span
                  className='detail-text-bold'>{patient.allergies || "—"}</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/*  Medical History */}
        <MedicalHistoryList/>
      </div>

      <Modal
        title="Bemorni rostan ham dasturdan o'chirmoqchimisiz?"
        description="Bemorni o'chirgandan so'ng ma'lumotlarni qayta tiklash imkoni mavjud emas."
        action={handleDelete}
      />
    </>
  )
};

export default PatientDetailPage;
