import { useDepartments} from "../../hooks/useDepartment.ts";
import type {DepartmentType} from "../../types/department.type.ts";
import DepartmentCard from "../cards/department.card.tsx";
import DepartmentMobileCard from "../cards/department-mobile.card.tsx";

export const DepartmentList =  () => {
  const {isLoading, data, error} = useDepartments()
  const departments: DepartmentType[] = data?.departments || []

  if (isLoading) {
    return (
      <div className="w-full rounded-lg bg-white p-6 shadow-md">
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
          Bo'limlarni yuklashda xatolik yuz berdi: {error.message}
        </div>
      </div>
    );
  }

  if (departments.length === 0) {
    return (
      <div className="w-full rounded-lg bg-white p-6 shadow-md">
        <div className="py-10 text-center text-sm text-gray">
          Bo'limlar topilmadi
        </div>
      </div>
    );
  }

  return (
    <div className="w-full overflow-hidden rounded-lg bg-white shadow-md">
      {/* Desktop */}
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full min-w-225 text-left">
          <thead className="bg-[#E8E8E8] text-sm font-bold">
          <tr>
            <th className="whitespace-nowrap px-6 py-4">Nomi</th>
            <th className="whitespace-nowrap py-4">Izoh</th>
            <th className="whitespace-nowrap py-4">Oxirgi yangilangan vaqti</th>
            <th className="whitespace-nowrap py-4">Yaratilgan vaqti</th>
            <th className="px-6 py-4">Amallar</th>
          </tr>
          </thead>

          <tbody>
          {departments && departments.map((department) => (
            <DepartmentCard key={department.id} department={department} />
          ))}
          </tbody>
        </table>
      </div>

      {/* Mobile */}
      <div className="space-y-3 p-4 md:hidden">
        {departments.map((department) => (
          <DepartmentMobileCard  key={department.id} department={department}  />
        ))}
      </div>
    </div>
  )
}

export default DepartmentList
