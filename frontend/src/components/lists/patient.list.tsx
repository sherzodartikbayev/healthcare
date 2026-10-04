import PatientCard from "../cards/patient.card.tsx";
import type {PatientType} from "../../types/patient.type.ts";
import {usePatients} from "../../hooks/usePatient.ts";
import PatientMobileCard from "../cards/patient-mobile.card.tsx";
import Button from "../ui/button.tsx";
import {Link} from "react-router-dom";

interface Props {
  header?: boolean
}

const PatientList = ({header}: Props) => {
  const {isLoading, data, error} = usePatients();
  const patients: PatientType[] = data?.result?.patients ?? [];
  if (isLoading) {
    return (<div className="w-full rounded-lg bg-white p-6 shadow-md">
        <div className="d-between mb-5">
          <h2 className="font-bold text-lg md:text-xl">Bemorlar</h2>
          <Link to='/patients/create'>
            <Button variant="primary" icon="/icons/plus.svg">Yangi bemor qo'shish</Button>
          </Link>
        </div>

        <div className="space-y-3">
          {Array.from({length: 5}).map((_, index) => (
            <div key={index} className="h-14 w-full animate-pulse rounded-lg bg-gray-100"/>
          ))}
        </div>
      </div>
    );
  }

  if (patients.length === 0) {
    return (
      <div className="w-full rounded-lg bg-white p-6 shadow-md">
        <div className="d-between mb-5">
          <h2 className="font-bold text-lg md:text-xl">Bemorlar</h2>
          <Link to='/patients/create'>
            <Button variant="primary" icon="/icons/plus.svg">Yangi bemor qo'shish</Button>
          </Link>
        </div>
        <div className="py-10 text-center text-sm text-gray">Bemorlar topilmadi</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full rounded-lg bg-white p-6 shadow-md">
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">
          Bemorlarni yuklashda xatolik yuz berdi: {error.message}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full overflow-hidden rounded-lg bg-white shadow-md">
      <div className="d-between py-4 px-6">
        {header && <h2 className="font-bold text-lg md:text-xl">Bemorlar</h2>}
        <Link to='/patients/create' className='ml-auto'>
          <Button variant="primary" icon="/icons/plus.svg">Yangi bemor qo'shish</Button>
        </Link>
      </div>

      {/* Desktop */}
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full min-w-225 text-left">
          <thead className="bg-[#E8E8E8] text-sm font-bold">
          <tr>
            <th className="whitespace-nowrap px-6 py-4">Ism-sharifi</th>
            <th className="whitespace-nowrap py-4">Telefon raqam</th>
            <th className="whitespace-nowrap py-4">Manzil</th>
            <th className="whitespace-nowrap py-4">Tug'ilgan sana</th>
            <th className="whitespace-nowrap py-4">Oxirgi tashrif</th>
            <th className="whitespace-nowrap py-4">Qon guruh</th>
            <th className="px-6 py-4">Amallar</th>
          </tr>
          </thead>

          <tbody>
          {patients && patients.map((patient) => (
            <PatientCard key={patient.id} patient={patient}/>
          ))}
          </tbody>
        </table>
      </div>

      {/* Mobile */}
      <div className="space-y-3 p-4 md:hidden">
        {patients.map((patient) => (
          <PatientMobileCard key={patient.id} patient={patient}/>
        ))}
      </div>
    </div>
  );
};

export default PatientList;
