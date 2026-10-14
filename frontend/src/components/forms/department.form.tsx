import { type ChangeEvent, type FormEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { CreateDepartmentInput } from "../../types/department.type.ts";
import Input from "../ui/input.tsx";
import Button from "../ui/button.tsx";

type DepartmentFormProps = {
  initialValues?: CreateDepartmentInput;
  onSubmit: (department: CreateDepartmentInput) => void;
  isPending?: boolean;
  submitText?: string;
};

const defaultDepartmentValues: CreateDepartmentInput = { name: "", description: "" };

const DepartmentForm = ({ initialValues, onSubmit, isPending = false, submitText = "Saqlash" }: DepartmentFormProps) => {
  const [department, setDepartment] = useState<CreateDepartmentInput>({ ...defaultDepartmentValues, ...initialValues });

  useEffect(() => {
      // eslint-disable-next-line react-hooks/set-state-in-effect
    if (initialValues) setDepartment({ ...defaultDepartmentValues, ...initialValues });
  }, [initialValues]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setDepartment((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(department);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl w-full mx-auto">
      <div className="flex flex-col gap-4">
        <Input name="name" label="Bo'lim nomi:" placeholder="Leg section" value={department.name} onChange={handleChange} disabled={isPending} required />

        <div>
          <label htmlFor="description" className="font-semibold text-sm">Tavsif:</label>
          <textarea id="description" name="description" value={department.description ?? ""} onChange={handleChange} disabled={isPending} rows={4} className="w-full p-2 border-2 border-gray rounded-md" placeholder="Bo'lim haqida ma'lumot..." />
        </div>
      </div>

      <div className="flex justify-end mt-5 gap-2">
        <Link to="/departments">
          <Button type="button" variant="outline" disabled={isPending}>Bekor qilish</Button>
        </Link>
        <Button type="submit" variant="primary" disabled={isPending}>
          {isPending ? "Saqlanmoqda..." : submitText}
        </Button>
      </div>
    </form>
  );
};

export default DepartmentForm;