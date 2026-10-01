import {type ChangeEvent, type FormEvent, useState} from "react";

import Input from "../ui/input.tsx";
import Button from "../ui/button.tsx";
import type {CreatePatientType} from "../../types/patient.type.ts";
import {defaultPatientValues} from "../../constants";
import {Link} from "react-router-dom";

type PatientFormProps = {
    initialValues?: CreatePatientType;
    onSubmit: (patient: CreatePatientType) => void;
    isPending?: boolean;
    submitText?: string;
};

const PatientForm = ({initialValues, onSubmit, isPending = false, submitText = "Saqlash"}: PatientFormProps) => {
    const [patient, setPatient] = useState<CreatePatientType>({
        ...defaultPatientValues,
        ...initialValues,
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        setPatient((prev) => ({...prev, [name]: value}));
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit(patient);
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-4xl w-full mx-auto">
            <div className="d-flex gap-3.5">
                {/* LEFT */}
                <div className="w-1/2 d-flex flex-col gap-3.5">
                    <Input
                        type="text"
                        id="firstName"
                        name="firstName"
                        label="Ism:"
                        placeholder="Akmal"
                        value={patient.firstName}
                        onChange={handleChange}
                        required
                    />

                    <Input
                        type="text"
                        id="lastName"
                        name="lastName"
                        label="Familiya:"
                        placeholder="Karimov"
                        value={patient.lastName}
                        onChange={handleChange}
                        required
                    />

                    <Input
                        type="text"
                        id="middleName"
                        name="middleName"
                        label="Sharifi yoki otasining ismi:"
                        placeholder="Dilmurod o'g'li"
                        value={patient.middleName}
                        onChange={handleChange}
                        required
                    />

                    <Input
                        type="date"
                        id="birthDate"
                        name="birthDate"
                        label="Tug'ilgan sana:"
                        value={patient.birthDate}
                        onChange={handleChange}
                        required
                    />

                    <Input
                        type="text"
                        id="birthPlace"
                        name="birthPlace"
                        label="Tug'ilgan hudud:"
                        placeholder="Toshkent shahri"
                        value={patient.birthPlace}
                        onChange={handleChange}
                        required
                    />

                    <Input
                        type="text"
                        id="address"
                        name="address"
                        label="Manzil:"
                        placeholder="Yunusobod tumani..."
                        value={patient.address}
                        onChange={handleChange}
                        required
                    />

                    {/* Education */}
                    <div className="w-full">
                        <label htmlFor="education"
                               className="font-semibold md:text-sm text-xs text-black">Ma'lumoti:</label>
                        <select
                            id="education"
                            name="education"
                            value={patient.education}
                            onChange={handleChange}
                            className="w-full p-2 border-gray border-2 outline-none rounded-md"
                        >
                            <option value="">Tanlang</option>
                            <option value="Oliy ma'lumotli">Oliy ma'lumotli</option>
                            <option value="O'rta maxsus">O'rta maxsus</option>
                            <option value="O'rta">O'rta</option>
                        </select>
                    </div>

                    {/* Marital status */}
                    <div className="w-full">
                        <label htmlFor="maritalStatus" className="font-semibold md:text-sm text-xs text-black">Oilaviy
                            holati:</label>

                        <select
                            id="maritalStatus"
                            name="maritalStatus"
                            value={patient.maritalStatus}
                            onChange={handleChange}
                            className="w-full p-2 border-gray border-2 outline-none rounded-md"
                            required
                        >
                            <option value="">Tanlang</option>
                            <option value="Turmush qurmagan">Turmush qurmagan</option>
                            <option value="Turmush qurgan">Turmush qurgan</option>
                            <option value="Ajrashgan">Ajrashgan</option>
                            <option value="Beva">Beva</option>
                        </select>
                    </div>

                    <Input
                        type="text"
                        id="workplace"
                        name="workplace"
                        label="Ish joyi:"
                        placeholder="IT Solutions LLC"
                        value={patient.workplace}
                        onChange={handleChange}
                    />
                </div>

                {/* RIGHT */}
                <div className="w-1/2 d-flex flex-col gap-3.5">
                    <Input
                        type="tel"
                        id="phone"
                        name="phone"
                        label="Telefon raqami:"
                        placeholder="+998901234567"
                        value={patient.phone}
                        onChange={handleChange}
                        required
                    />

                    <Input
                        type="tel"
                        id="emergencyPhone"
                        name="emergencyPhone"
                        label="Favqulodda aloqa raqami:"
                        placeholder="+998901112233"
                        value={patient.emergencyPhone}
                        onChange={handleChange}
                        required
                    />

                    {/* Blood group */}
                    <div className="w-full">
                        <label htmlFor="bloodGroup" className="font-semibold md:text-sm text-xs text-black">Qon
                            guruhi:</label>
                        <select
                            id="bloodGroup"
                            name="bloodGroup"
                            value={patient.bloodGroup}
                            onChange={handleChange}
                            className="w-full p-2 border-gray border-2 outline-none rounded-md"
                            required
                        >
                            <option value="">Tanlang</option>
                            <option value="1-guruh">1-guruh</option>
                            <option value="2-guruh">2-guruh</option>
                            <option value="3-guruh">3-guruh</option>
                            <option value="4-guruh">4-guruh</option>
                        </select>
                    </div>

                    {/* Rh */}
                    <div className="w-full">
                        <label htmlFor="rhFactor" className="font-semibold md:text-sm text-xs text-black">Rh
                            faktor:</label>
                        <select
                            id="rhFactor"
                            name="rhFactor"
                            value={patient.rhFactor}
                            onChange={handleChange}
                            className="w-full p-2 border-gray border-2 outline-none rounded-md"
                        >
                            <option value="">Tanlang</option>
                            <option value="+">Rh+</option>
                            <option value="-">Rh-</option>
                        </select>
                    </div>

                    <Input
                        type="text"
                        id="insurancePolicy"
                        name="insurancePolicy"
                        label="Sug'urta polisi:"
                        placeholder="UZ-INS-2026-001245"
                        value={patient.insurancePolicy}
                        onChange={handleChange}
                    />

                    <Input
                        type="text"
                        id="insuranceProvider"
                        name="insuranceProvider"
                        label="Sug'urta kompaniyasi:"
                        placeholder="Uzbekistan Insurance"
                        value={patient.insuranceProvider}
                        onChange={handleChange}
                    />

                    <Input
                        type="number"
                        id="weight"
                        name="weight"
                        label="Vazni (kg):"
                        placeholder="72.5"
                        value={patient.weight}
                        onChange={handleChange}
                        min="0"
                        step="0.01"
                        required
                    />

                    <Input
                        type="number"
                        id="height"
                        name="height"
                        label="Bo'yi (cm):"
                        placeholder="178"
                        value={patient.height}
                        onChange={handleChange}
                        min="0"
                        step="0.01"
                        required
                    />

                    <Input
                        type="text"
                        id="allergies"
                        name="allergies"
                        label="Allergiyalar:"
                        placeholder="Penitsillin, chang..."
                        value={patient.allergies}
                        onChange={handleChange}
                    />
                </div>
            </div>

            <div className="flex justify-end mt-5 gap-2">
                <Link to='/patients'>
                    <Button type="submit" variant="outline">Bekor qilish</Button>
                </Link>
                <Button type="submit" variant="primary" disabled={isPending}>
                    {isPending ? "Saqlanmoqda..." : submitText}
                </Button>
            </div>
        </form>
    );
};

export default PatientForm;
