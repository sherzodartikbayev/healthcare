import Button from "../ui/button.tsx";
import type {DepartmentType} from "../../types/department.type.ts";
import {format} from "date-fns";

const DepartmentMobileCard = ({ department }: { department: DepartmentType }) => {
  return (
    <div className="border-gray rounded-xl border p-4">
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <div className="min-w-0">
            <p className="text-gray-dark truncate font-semibold">{department.name}</p>
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
          <p className="mt-1 text-sm font-medium">{department.description || "—"}</p>
        </div>
        <div>
          <p className="text-gray text-xs">{format(department.createdAt, 'dd/MM/yyyy') || "—"}</p>
          <p className="mt-1 text-sm font-medium">{format(department.updatedAt, 'dd/MM/yyyy') || "—"}</p>
        </div>
      </div>
    </div>
  )
};

export default DepartmentMobileCard;
