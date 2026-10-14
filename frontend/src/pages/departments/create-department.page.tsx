import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {useCreateDepartment} from "../../hooks/useDepartment.ts";
import type {CreateDepartmentInput} from "../../types/department.type.ts";
import DepartmentForm from "../../components/forms/department.form.tsx";

const CreateDepartmentPage = () => {
    const navigate = useNavigate();
    const {mutate: createDepartment, isPending} = useCreateDepartment();

    const handleSubmit = (department: CreateDepartmentInput) => {
        createDepartment(department, {
            onSuccess: () => {
                toast.success("Bo'lim muvaffaqiyatli yaratildi.");
                navigate("/departments");
            },
            onError: (error) => toast.error(error.message),
        });
    };

    return (
        <section className='my-7.5'>
            <div className='container'>
                <h1 className="text-2xl font-bold mb-2 text-center">Yangi bo'lim qo'shish</h1>
                <p className='text-base font-bold mb-5 text-center'>Bo'lim ma'lumotlari</p>

                <DepartmentForm onSubmit={handleSubmit} isPending={isPending} submitText="Bo'lim yaratish"/>
            </div>
        </section>
    );
};

export default CreateDepartmentPage;