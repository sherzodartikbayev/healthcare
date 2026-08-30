import {useDoctors} from "../../hooks/useDoctor.ts";
import type {DoctorType} from "../../types/doctor.type.ts";
import DoctorCard from "../cards/doctor.card.tsx";
import DoctorMobileCard from "../cards/doctor-mobile.card.tsx";

interface Props{
  header?: boolean
}

export const DoctorList = ({ header }:  Props) => {
  const {isLoading, data, error} = useDoctors();
  const doctors: DoctorType[] = data?.result?.doctors || [];

  if (isLoading) {
    return (
      <div className="w-full rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-5 font-bold text-lg md:text-xl">
          Shifokorlar
        </h2>

        <div className="space-y-3">
          {Array.from({length: 5}).map((_, index) => (
            <div
              key={index}
              className="h-14 w-full animate-pulse rounded-lg bg-gray-100"
            />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full rounded-lg bg-white p-6 shadow-md">
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">
          Shifokorlarni yuklashda xatolik yuz berdi: {error.message}
        </div>
      </div>
    );
  }

  if (doctors.length === 0) {
    return (
      <div className="w-full rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-5 font-bold text-lg md:text-xl">
          Shifokorlar
        </h2>

        <div className="py-10 text-center text-sm text-gray">
          Bemorlar topilmadi
        </div>
      </div>
    );
  }

  return (
    <div className="w-full overflow-hidden rounded-lg bg-white shadow-md">
      {header && <h2 className="px-4 pt-5 pb-4 font-bold text-lg md:px-6 md:text-xl">Shifokorlar</h2>}

      {/* Desktop */}
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full min-w-225 text-left">
          <thead className="bg-[#E8E8E8] text-sm font-bold">
          <tr>
            <th className="whitespace-nowrap px-6 py-4">Ism-sharifi</th>
            <th className="whitespace-nowrap py-4">Telefon raqam</th>
            <th className="whitespace-nowrap py-4">Manzil</th>
            <th className="whitespace-nowrap py-4">Mutaxassisligi</th>
            <th className="whitespace-nowrap py-4">Bo’lim</th>
            <th className="whitespace-nowrap py-4">Ish turi</th>
            <th className="px-6 py-4">Amallar</th>
          </tr>
          </thead>

          <tbody>
          {doctors && doctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
          </tbody>
        </table>
      </div>

      {/* Mobile */}
      <div className="space-y-3 p-4 md:hidden">
        {doctors.map((doctor) => (
          <DoctorMobileCard key={doctor.id} doctor={doctor} />
        ))}
      </div>
    </div>
  )
};
