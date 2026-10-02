import {useParams} from "react-router-dom";
import {usePatient} from "../../hooks/usePatient.ts";
import Loading from "../../components/shared/loading.tsx";
import ErrorCard from "../../components/cards/error.card.tsx";
import type {PatientType} from "../../types/patient.type.ts";
import {format} from "date-fns";

const PatientDetailPage = () => {
  const {id} = useParams();
  const {isLoading, data, isError} = usePatient(id!);

  const patient: PatientType = data?.patient;

  if (isLoading) {
    return <Loading/>
  }

  if (isError) {
    return <ErrorCard/>
  }

  return (
    <div className='mx-9 gap-5 bg-white rounded-2xl shadow-md mb-20'>
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

      <hr />

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
  )
};

export default PatientDetailPage;
