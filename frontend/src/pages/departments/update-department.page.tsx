import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {toast} from "react-toastify";
import {useDepartment, useUpdateDepartment} from "../../hooks/useDepartment.ts";
import type {CreateDepartmentInput} from "../../types/department.type.ts";
import DepartmentForm from "../../components/forms/department.form.tsx";

const UpdateDepartmentPage = () => {
    const {id} = useParams<{ id: string }>();
    const navigate = useNavigate();
    const {data, isLoading, isError} = useDepartment(id!);
    const {mutate: updateDepartment, isPending} = useUpdateDepartment();
    const [initialValues, setInitialValues] = useState<CreateDepartmentInput>();

    useEffect(() => {
        const department = data?.department;
        if (!department) return;
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setInitialValues({name: department.name, description: department.description ?? ""});
    }, [data]);

    const handleSubmit = (department: CreateDepartmentInput) => {
        if (!id) return;

        updateDepartment({id, department}, {
            onSuccess: () => {
                toast.success("Bo'lim ma'lumotlari yangilandi.");
                navigate("/departments");
            },
            onError: (error) => toast.error(error.message),
        });
    };

    if (isLoading) return <p className='p-10 text-center'>Bo'lim ma'lumotlari yuklanmoqda...</p>;
    if (isError || !initialValues) return <p className='p-10 text-center'>Bo'limni topib bo'lmadi yoki yuklashda xatolik yuz berdi.</p>;

    return (
        <section className='my-7.5'>
            <div className='container'>
                <h1 className="text-2xl font-bold mb-2 text-center">Yangi bo'lim qo'shish</h1>
                <p className='text-base font-bold mb-5 text-center'>Bo'lim ma'lumotlari</p>

                <DepartmentForm onSubmit={handleSubmit} isPending={isPending} initialValues={initialValues} submitText="Bo'lim yaratish"/>
            </div>
        </section>
    );
};

export default UpdateDepartmentPage;