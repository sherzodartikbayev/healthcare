import DashboardCard from "../components/cards/dashboard.card.tsx";
import {useDashboardData} from "../hooks/useAdminDashboard.ts";
import type {AdminDashboardType} from "../types/admin.type.ts";
import PatientList from "../components/lists/patient.list.tsx";
import {DoctorList} from "../components/lists/doctor.list.tsx";

const DashboardPage = () => {
  const {isLoading, data, error} = useDashboardData();
  const cards = data?.data ?? [];

  return (
    <section className="my-2">
      <div className="container md:px-9 px-2">
        {isLoading && (
          <div className="container grid md:grid-cols-4 grid-cols-2 md:gap-7.5 gap-3 md:px-9 px-2">
            {Array.from({length: 4}).map((_, index) => (
              <div key={index} className="h-24 bg-gray-100 animate-pulse rounded-xl"/>
            ))}
          </div>
        )}

        <div className='grid md:grid-cols-4 grid-cols-2 md:gap-7.5 gap-3 mb-9.5'>
          {cards.map((card: AdminDashboardType) => (
            <DashboardCard
              key={card.id}
              label={card.label}
              icon={card.icon}
              count={card.count}
            />
          ))}
        </div>

        {error && (
          <div className="md:p-4 p-2 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm font-medium">
            Ma'lumotlarni yuklashda xatolik yuz berdi: {error?.message}
          </div>
        )}

        <PatientList header />

        <div className='my-17.5'/>

        <DoctorList header />
      </div>
    </section>
  );
};

export default DashboardPage;
