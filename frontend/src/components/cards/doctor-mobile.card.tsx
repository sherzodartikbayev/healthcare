import type {DoctorType} from "../../types/doctor.type.ts";
import Button from "../ui/button.tsx";
import {useDepartment} from "../../hooks/useDepartment.ts";

const DoctorMobileCard = ({ doctor }: { doctor: DoctorType }) => {
  const {data} = useDepartment(doctor.departmentId);
  const department = data?.department?.name

  return (
    <div className="border-gray rounded-xl border p-4">
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <img
            src={doctor.avatarUrl || "/images/user.png"}
            alt={`${doctor.firstName} ${doctor.lastName}`}
            className="size-11 shrink-0 rounded-full object-cover"
          />

          <div className="min-w-0">
            <p className="text-gray-dark truncate font-semibold">{doctor.firstName} {doctor.lastName}</p>
            <p className="text-gray truncate text-xs">{doctor.phone || "Telefon mavjud emas"}</p>
          </div>
        </div>

        <div className="flex shrink-0 gap-2">
          <Button type="button">
            <img src="/icons/edit.svg" alt="Edit" className="size-4" />
          </Button>
          <Button type="button">
            <img src="/icons/delete.svg" alt="Delete" className="size-4" />
          </Button>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-x-4 gap-y-4">
        <div>
          <p className="text-gray text-xs">Mutaxassisligi</p>
          <p className="mt-1 text-sm font-medium">{doctor.specialization || "—"}</p>
        </div>
        <div>
          <p className="text-gray text-xs">{department || "—"}</p>
          <p className="mt-1 text-sm font-medium">
            {doctor.workSchedule || "—"}
          </p>
        </div>
      </div>
    </div>
  )
};

export default DoctorMobileCard;
