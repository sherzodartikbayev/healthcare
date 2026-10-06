import {type ChangeEvent, type FormEvent, useEffect, useState} from "react";
import { Link, useParams } from "react-router-dom";
import type { MedicalRecordInput } from "../../types/medical-record.type.ts";
import type { DoctorType } from "../../types/doctor.type.ts";
import { defaultMedicalRecordValues } from "../../constants";
import { useDoctors } from "../../hooks/useDoctor.ts";
import Input from "../ui/input.tsx";
import Button from "../ui/button.tsx";

interface MedicalRecordFormProps {
  initialValues?: MedicalRecordInput;
  onSubmit: (record: MedicalRecordInput) => void;
  isPending?: boolean;
  submitText?: string;
}

const MedicalRecordForm = ({initialValues, onSubmit, isPending = false, submitText = "Saqlash"}: MedicalRecordFormProps) => {
  const { patientId } = useParams<{ patientId: string }>();

  const [record, setRecord] = useState<MedicalRecordInput>({
    ...defaultMedicalRecordValues,
    ...initialValues,
  });

  const {
    data,
    isLoading: isDoctorsLoading,
    isError: isDoctorsError,
  } = useDoctors();

  const doctors: DoctorType[] = data?.result?.doctors ?? [];

  useEffect(() => {
    if (!initialValues) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setRecord({...defaultMedicalRecordValues, ...initialValues});
  }, [initialValues]);

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setRecord((prev) => ({...prev, [name]: value}));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!patientId) return;
    onSubmit({...record, patientId});
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl d-flex w-full mx-auto">
      <div className="w-full md:w-1/2 d-flex flex-col gap-3.5">
        {/* Doctor */}
        <div className="w-full">
          <label htmlFor="doctorId" className="font-semibold md:text-sm text-xs text-black">Shifokor:</label>
          <select
            id="doctorId"
            name="doctorId"
            value={record.doctorId}
            onChange={handleChange}
            disabled={isPending || isDoctorsLoading}
            required
            className="w-full p-2 border-gray border-2 outline-none rounded-md"
          >
            <option value="" disabled>{isDoctorsLoading ? "Shifokorlar yuklanmoqda..." : "Shifokorni tanlang"}</option>

            {doctors.map((doctor) => (
              <option key={doctor.id} value={doctor.id}>
                {doctor.firstName} {doctor.lastName} (
                {doctor.specialization})
              </option>
            ))}
          </select>

          {!isDoctorsLoading && !isDoctorsError && doctors.length === 0 && <p className="text-gray text-xs mt-1">Shifokorlar mavjud emas.</p>}
        </div>

        {/* Treatment date */}
        <Input
          name="treatmentDate"
          type="date"
          label="Davolanish sanasi"
          value={record.treatmentDate}
          onChange={handleChange}
          disabled={isPending}
          required
        />

        {/* Disease type */}
        <Input
          name="diseaseType"
          label="Kasallik turi"
          placeholder="Masalan: Urology"
          value={record.diseaseType}
          onChange={handleChange}
          disabled={isPending}
          required
        />

        {/* Diagnosis */}
        <Input
          name="diagnosis"
          type="text"
          label="Diagnoz"
          placeholder="Tashxisni kiriting"
          value={record.diagnosis}
          onChange={handleChange}
          disabled={isPending}
          required
        />

        {/* Actions */}
        <div className="flex ml-auto gap-2">
          <Link to={`/patients/${patientId}`}>
            <Button type="button" variant="outline" disabled={isPending}>Bekor qilish</Button>
          </Link>

          <Button
            type="submit"
            variant="primary"
            disabled={
              isPending ||
              isDoctorsLoading ||
              isDoctorsError ||
              doctors.length === 0
            }
          >
            {isPending ? "Saqlanmoqda..." : submitText}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default MedicalRecordForm;
