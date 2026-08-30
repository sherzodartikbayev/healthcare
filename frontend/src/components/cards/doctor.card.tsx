import type {DoctorType} from "../../types/doctor.type.ts";
import Button from "../ui/button.tsx";
import {useDepartment} from "../../hooks/useDepartment.ts";

const DoctorCard = ({ doctor }: { doctor: DoctorType }) => {
  const {data} = useDepartment(doctor.departmentId);
  const department = data?.department?.name

  return (
    <tr className="border-b border-t border-gray text-sm text-gray-dark">
      <td className="px-6 py-3">
        <div className="flex items-center gap-3">
          <img
            src={doctor.avatarUrl || "/images/user.png"}
            alt={`${doctor.firstName} ${doctor.lastName}`}
            className="size-9 rounded-full object-cover"
          />
          <p className="whitespace-nowrap font-medium">{doctor.firstName} {doctor.lastName}</p>
        </div>
      </td>
      <td className="whitespace-nowrap py-3">{doctor.phone || "—"}</td>
      <td className="max-w-55 truncate py-3">{doctor.address || "—"}</td>
      <td className="max-w-55 truncate py-3">{doctor.specialization || "—"}</td>
      <td className="whitespace-nowrap py-3">{department || "—"}</td>
      <td className="whitespace-nowrap py-3">{doctor.workSchedule || "—"}</td>
      <td className="px-6 py-3">
        <div className="flex items-center gap-5">
          <Button type="button">
            <img src="/icons/edit.svg" alt="Edit" className="size-4"/>
          </Button>
          <Button type="button">
            <img src="/icons/delete.svg" alt="Delete" className="size-4"/>
          </Button>
        </div>
      </td>
    </tr>
  )
}

export default DoctorCard;
