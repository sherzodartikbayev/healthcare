import Button from "../ui/button.tsx";
import type {PatientType} from "../../types/patient.type.ts";

interface Props {
  patient: PatientType
}

const PatientCard = ({patient}: Props) => {
  return (
    <tr className="border-b border-t border-gray text-sm text-gray-dark">
      <td className="px-6 py-3">
        <div className="flex items-center gap-3">
          <img
            src={patient.avatarUrl || "/images/user.png"}
            alt={`${patient.firstName} ${patient.lastName}`}
            className="size-9 rounded-full object-cover"
          />
          <p className="whitespace-nowrap font-medium">{patient.firstName} {patient.lastName}</p>
        </div>
      </td>
      <td className="whitespace-nowrap py-3">{patient.phone || "—"}</td>
      <td className="max-w-55 truncate py-3">{patient.address || "—"}</td>
      <td className="whitespace-nowrap py-3">{patient.birthDate || "—"}</td>
      <td
        className="whitespace-nowrap py-3">{patient.updatedAt ? new Date(patient.updatedAt).toLocaleDateString("uz-UZ") : "—"}</td>
      <td
        className="whitespace-nowrap py-3">{patient.bloodGroup ? `${patient.bloodGroup}${patient.rhFactor || ""}` : "—"}</td>
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
  );
};

export default PatientCard;
