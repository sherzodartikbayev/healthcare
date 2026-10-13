import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {toast} from "react-toastify";
import {useDoctor, useUpdateDoctor} from "../../hooks/useDoctor.ts";
import type {CreateDoctorInput} from "../../types/doctor.type.ts";
import DoctorForm from "../../components/forms/doctor.form.tsx";

const UpdateDoctorPage = () => {
    const {id} = useParams<{ id: string }>();

    const navigate = useNavigate();
    const {data, isLoading, isError} = useDoctor(id!);
    const {mutate: updateDoctor, isPending} = useUpdateDoctor();
    const [initialValues, setInitialValues] = useState<CreateDoctorInput>();

    useEffect(() => {
        const doctor = data?.doctor;
        if (!doctor) return;
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setInitialValues({
            departmentId: doctor.departmentId,
            firstName: doctor.firstName,
            lastName: doctor.lastName,
            middleName: doctor.middleName ?? "",
            specialization: doctor.specialization,
            birthDate: doctor.birthDate ?? "",
            birthPlace: doctor.birthPlace ?? "",
            avatarUrl: doctor.avatarUrl ?? "",
            address: doctor.address ?? "",
            maritalStatus: doctor.maritalStatus,
            education: doctor.education ?? "",
            phone: doctor.phone ?? "",
            emergencyPhone: doctor.emergencyPhone ?? "",
            hireDate: doctor.hireDate ?? "",
            employmentType: doctor.employmentType ?? "",
            workSchedule: doctor.workSchedule,
        });
    }, [data]);

    const handleSubmit = (doctor: CreateDoctorInput) => {
        if (!id) return;

        updateDoctor({id, doctor}, {
            onSuccess: () => {
                toast.success("Shifokor ma'lumotlari yangilandi.");
                navigate("/doctors");
            },
            onError: (error) => toast.error(error.message),
        });
    };

    if (isLoading) return <p className='text-xl text-center py-10'>Shifokor ma'lumotlari yuklanmoqda...</p>;
    if (isError || !initialValues) return <p className='text-xl text-center py-10'>Shifokor ma'lumotlarini yuklashda xatolik yuz berdi.</p>;

    return (
        <section>
            <div className='container my-7.5'>
                <h1 className="text-3xl font-bold mb-2 text-center">Yangi shifokor qo'shish</h1>
                <p className='text-lg font-bold text-center mb-5'>Shaxsiy ma'lumotlari</p>


                <DoctorForm
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                    isPending={isPending}
                    submitText="O'zgarishlarni saqlash"
                />
            </div>
        </section>
    )
        ;
};

export default UpdateDoctorPage;