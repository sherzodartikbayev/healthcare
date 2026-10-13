import {type ChangeEvent, type FormEvent, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {defaultDoctorValues} from "../../constants";
import type {CreateDoctorInput} from "../../types/doctor.type.ts";
import Input from "../ui/input.tsx";
import Button from "../ui/button.tsx";
import {useDepartments} from "../../hooks/useDepartment.ts";
import type {DepartmentType} from "../../types/department.type.ts";

type DoctorFormProps = {
    initialValues?: CreateDoctorInput;
    onSubmit: (doctor: CreateDoctorInput) => void;
    isPending?: boolean;
    submitText?: string;
};

const DoctorForm = ({initialValues, onSubmit, isPending = false, submitText = "Saqlash"}: DoctorFormProps) => {
    const [doctor, setDoctor] = useState<CreateDoctorInput>({...defaultDoctorValues, ...initialValues});

    const {data} = useDepartments();
    const departments: DepartmentType[] = data?.departments;

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        if (initialValues) setDoctor({...defaultDoctorValues, ...initialValues});
    }, [initialValues]);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        setDoctor((prev) => ({...prev, [name]: name === "maritalStatus" ? value === "true" : value}));
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit(doctor);
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-4xl w-full mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                <Input
                    name="firstName"
                    label="Ism:"
                    placeholder="Akmal"
                    value={doctor.firstName}
                    onChange={handleChange}
                    disabled={isPending}
                    required
                />

                <Input
                    name="lastName"
                    label="Familiya:"
                    placeholder="Karimov"
                    value={doctor.lastName}
                    onChange={handleChange}
                    disabled={isPending}
                    required
                />

                <Input
                    name="middleName"
                    label="Sharifi yoki otasining ismi:"
                    placeholder="Dilmurod o'g'li"
                    value={doctor.middleName}
                    onChange={handleChange}
                    disabled={isPending}
                    required
                />

                <div>
                    <label htmlFor="specialization" className="font-semibold text-sm">Mutaxassisligi:</label>
                    <select
                        id="specialization"
                        name="specialization"
                        value={doctor.specialization}
                        onChange={handleChange}
                        disabled={isPending}
                        className="w-full p-2 border-2 border-gray rounded-md"
                        required
                    >
                        <option value="">Tanlang</option>
                        <option value="CARDIOLOGY">Kardiolog</option>
                        <option value="NEUROLOGY">Nevrolog</option>
                        <option value="PEDIATRICS">Pediatr</option>
                        <option value="SURGERY">Jarroh</option>
                        <option value="DERMATOLOGY">Dermatolog</option>
                        <option value="OPHTHALMOLOGY">Oftalmolog</option>
                        <option value="DENTISTRY">Stomatolog</option>
                        <option value="GYNECOLOGY">Ginekolog</option>
                        <option value="UROLOGY">Urolog</option>
                        <option value="ORTHOPEDICS">Ortoped</option>
                        <option value="RADIOLOGY">Radiolog</option>
                        <option value="ANESTHESIOLOGY">Anesteziolog</option>
                        <option value="PSYCHIATRY">Psixiatr</option>
                        <option value="ONCOLOGY">Onkolog</option>
                        <option value="GENERAL_PRACTICE">Umumiy shifokor</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="departmentId" className="font-semibold text-sm">Bo'lim:</label>
                    <select
                        id="departmentId"
                        name="departmentId"
                        value={doctor.departmentId}
                        onChange={handleChange}
                        disabled={isPending}
                        className="w-full p-2 border-2 border-gray rounded-md"
                        required
                    >
                        <option value="">Bo'limni tanlang</option>
                        {departments?.map((department) => (
                            <option key={department.id} value={department.id}>{department.name}</option>
                        ))}
                    </select>
                </div>

                <Input
                    name="birthDate"
                    type="date"
                    label="Tug'ilgan sana:"
                    value={doctor.birthDate}
                    onChange={handleChange}
                    disabled={isPending}
                    required
                />

                <Input
                    name="birthPlace"
                    label="Tug'ilgan hudud:"
                    placeholder="Toshkent shahri"
                    value={doctor.birthPlace}
                    onChange={handleChange}
                    disabled={isPending}
                    required
                />

                <Input
                    name="address"
                    label="Manzil:"
                    placeholder="Yunusobod tumani..."
                    value={doctor.address}
                    onChange={handleChange}
                    disabled={isPending}
                    required
                />

                <div>
                    <label htmlFor="maritalStatus" className="font-semibold text-sm">Oilaviy holati:</label>
                    <select
                        id="maritalStatus"
                        name="maritalStatus"
                        value={String(doctor.maritalStatus)}
                        onChange={handleChange}
                        disabled={isPending}
                        className="w-full p-2 border-2 border-gray rounded-md"
                        required
                    >
                        <option value="">Tanlang</option>
                        <option value="false">Oila qurmagan</option>
                        <option value="true">Oila qurgan</option>
                    </select>
                </div>

                <Input
                    name="education"
                    label="Ta'lim:"
                    placeholder="Tashkent Medical Academy"
                    value={doctor.education}
                    onChange={handleChange}
                    disabled={isPending}
                    required
                />

                <Input
                    name="phone"
                    type="tel"
                    label="Telefon raqami:"
                    placeholder="+998901234567"
                    value={doctor.phone}
                    onChange={handleChange}
                    disabled={isPending}
                    required
                />

                <Input
                    name="emergencyPhone"
                    type="tel"
                    label="Favqulodda aloqa raqami:"
                    placeholder="+998901112233"
                    value={doctor.emergencyPhone}
                    onChange={handleChange}
                    disabled={isPending}
                    required
                />

                <Input
                    name="hireDate"
                    type="date"
                    label="Ishga kirgan sana:"
                    value={doctor.hireDate}
                    onChange={handleChange}
                    disabled={isPending}
                    required
                />

                <div>
                    <label htmlFor="employmentType" className="font-semibold text-sm">Bandlik turi:</label>
                    <select
                        id="employmentType"
                        name="employmentType"
                        value={doctor.employmentType}
                        onChange={handleChange}
                        disabled={isPending}
                        className="w-full p-2 border-2 border-gray rounded-md"
                        required
                    >
                        <option value="">Tanlang</option>
                        <option value="PERMANENT">Doimiy</option>
                        <option value="TEMPORARY">Vaqtinchalik</option>
                    </select>
                </div>

                <div className='outline-none'>
                    <label htmlFor="workSchedule" className="font-semibold text-sm">Ish vaqti:</label>
                    <select
                        id="workSchedule"
                        name="workSchedule"
                        value={doctor.workSchedule}
                        onChange={handleChange}
                        disabled={isPending}
                        className="w-full p-2 border-gray border-2 rounded-md outline-none"
                        required
                    >
                        <option value="">Tanlang</option>
                        <option value="FULL-TIME">To'liq ish kuni</option>
                        <option value="PART-TIME">Yarim ish kuni</option>
                    </select>
                </div>
            </div>

            <div className="flex justify-end mt-5 gap-2">
                <Link to="/doctors">
                    <Button type="button" variant="outline" disabled={isPending}>Bekor qilish</Button>
                </Link>
                <Button type="submit" variant="primary" disabled={isPending}>
                    {isPending ? "Saqlanmoqda..." : submitText}
                </Button>
            </div>
        </form>
    );
};

export default DoctorForm;