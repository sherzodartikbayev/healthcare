import Button from "../ui/button.tsx";
import type {DepartmentType} from "../../types/department.type.ts";
import {format} from "date-fns";

const DepartmentCard = ({ department }: { department: DepartmentType }) => {
  return (
    <tr className="border-b border-t border-gray text-sm text-gray-dark">
      <td className="whitespace-nowrap px-6 py-3">{department.name || "—"}</td>
      <td className="max-w-55 truncate py-3">{department.description || "—"}</td>
      <td className="max-w-55 truncate py-3">{format(department.createdAt, 'dd/MM/yyyy') || "—"}</td>
      <td className="whitespace-nowrap py-3">{format(department.updatedAt, 'dd/MM/yyyy') || "—"}</td>
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

export default DepartmentCard;
