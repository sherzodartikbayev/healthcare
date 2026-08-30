import Button from "../ui/button.tsx";
import type { PatientType } from "../../types/patient.type.ts";

interface Props {
  patient: PatientType;
}

const PatientMobileCard = ({ patient }: Props) => {
  return (
    <div className="border-gray rounded-xl border p-4">
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <img
            src={patient.avatarUrl || "/images/user.png"}
            alt={`${patient.firstName} ${patient.lastName}`}
            className="size-11 shrink-0 rounded-full object-cover"
          />

          <div className="min-w-0">
            <p className="text-gray-dark truncate font-semibold">{patient.firstName} {patient.lastName}</p>
            <p className="text-gray truncate text-xs">{patient.phone || "Telefon mavjud emas"}</p>
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
          <p className="text-gray text-xs">Tug'ilgan sana</p>
          <p className="mt-1 text-sm font-medium">{patient.birthDate || "—"}</p>
        </div>
        <div>
          <p className="text-gray text-xs">Oxirgi tashrif</p>
          <p className="mt-1 text-sm font-medium">
            {patient.updatedAt ? new Date(patient.updatedAt).toLocaleDateString("uz-UZ") : "—"}
          </p>
        </div>
        <div>
          <p className="text-gray text-xs">Manzil</p>
          <p className="mt-1 truncate text-sm font-medium">{patient.address || "—"}</p>
        </div>
        <div>
          <p className="text-gray text-xs">Qon guruhi</p>
          <p className="mt-1 text-sm font-medium">
            {patient.bloodGroup ? `${patient.bloodGroup}${patient.rhFactor || ""}` : "—"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PatientMobileCard;
