import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {useCreateDoctor} from "../../hooks/useDoctor.ts";
import type {CreateDoctorInput} from "../../types/doctor.type.ts";
import DoctorForm from "../../components/forms/doctor.form.tsx";

const CreateDoctorPage = () => {
    const navigate = useNavigate();
    const {mutate: createDoctor, isPending} = useCreateDoctor();

    const handleSubmit = (doctor: CreateDoctorInput) => {
        createDoctor(doctor, {
            onSuccess: () => {
                toast.success("Shifokor muvaffaqiyatli yaratildi.");
                navigate("/doctors");
            },
            onError: (error) => toast.error(error.message),
        });
    };

    return (
        <section>
            <div className='container my-7.5'>
                <h1 className="text-3xl font-bold mb-2 text-center">Yangi shifokor qo'shish</h1>
                <p className='text-lg font-bold text-center mb-5'>Shaxsiy ma'lumotlari</p>

                <DoctorForm onSubmit={handleSubmit} isPending={isPending} submitText="Shifokor yaratish"/>
            </div>
        </section>
    );
};

export default CreateDoctorPage;