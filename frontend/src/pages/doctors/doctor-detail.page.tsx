import {Link, useParams} from "react-router-dom";
import {useDoctor} from "../../hooks/useDoctor.ts";
import type {DoctorType} from "../../types/doctor.type.ts";
import Loading from "../../components/shared/loading.tsx";
import ErrorCard from "../../components/cards/error.card.tsx";
import {format} from "date-fns";
import Button from "../../components/ui/button.tsx";
import MedicalHistoryList from "../../components/lists/medical-history.list.tsx";

const DoctorDetailPage = () => {
    const {id} = useParams();
    const {isLoading, data, isError} = useDoctor(id!);

    const doctor: DoctorType = data?.doctor

    if (isLoading) return <Loading/>

    if (isError) {
        return (
            <div className='p-10'>
                <ErrorCard/>
            </div>
        )
    }

    return (
        <>
            <div className='container mx-9 gap-5  mb-20'>
                <div className='bg-white rounded-2xl shadow-md mb-10'>
                    <div className='flex mb-5'>
                        <figure className='w-50 h-54'>
                            <img src={doctor.avatarUrl || '/images/user.png'} className='size-full object-contain'/>
                        </figure>

                        <div className='p-5'>
                            <h2 className='font-bold text-2xl mb-5'>{doctor.firstName} {doctor.lastName}</h2>

                            <div className='flex gap-16'>
                                <div className='flex flex-col gap-6.5'>
                                    <p className='detail-text flex items-center gap-5'>
                                        Mutaxassisligi: <span
                                        className='detail-text-bold'>{doctor.specialization || "—"}</span>
                                    </p>

                                    <p className='detail-text flex items-center gap-5'>
                                        Ishlayotgan bo’lim: <span
                                        className='detail-text-bold'>{doctor.departmentId || "—"}</span>
                                    </p>

                                    <p className='detail-text flex items-center gap-5'>
                                        Ish tajribasi: <span
                                        className='detail-text-bold'>{doctor.hireDate || "—"}</span>
                                    </p>
                                </div>
                                <div className='flex flex-col gap-6.5'>
                                    <p className='detail-text flex items-center gap-5'>
                                        Ishga kirgan sana: <span
                                        className='detail-text-bold'>{doctor.hireDate || "—"}</span>
                                    </p>

                                    <p className='detail-text flex items-center gap-5'>
                                        Ish grafigi: <span
                                        className='detail-text-bold'>{doctor.workSchedule || "—"}</span>
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className='flex pt-6.5 pr-6 ml-auto'>
                            <Link to={`/doctors/update/${doctor.id}`}>
                                <Button title="Bemor ma'lumotlarini yangilash">
                                    <img src='/icons/edit.svg' alt='Update doctor icon' className='size-4'/>
                                </Button>
                            </Link>
                            {/*<Button title="Bemorni dasturdan o'chirib tashlash" onClick={open}>*/}
                            {/*    <img src='/icons/delete.svg' alt='Delete doctor icon' className='size-4'/>*/}
                            {/*</Button>*/}
                        </div>
                    </div>

                    {/* Personal Information */}
                    <div className='pl-5 pb-8 mb-7.5'>
                        <h3 className='detail-text-bold mb-5'>Shaxsiy ma’lumotlar</h3>

                        <div className='flex w-full gap-10'>
                            <div className='flex flex-col gap-4.5 w-1/3'>
                                <p className='detail-text flex items-center gap-11'>
                                    Tug’ilgan sanasi <span
                                    className='detail-text-bold'>{format(doctor.birthDate, 'dd/MM/yyyy') || "—"}</span>
                                </p>

                                <p className='detail-text flex items-center gap-11'>
                                    Tug’ilgan hudud <span
                                    className='detail-text-bold'>{doctor.birthPlace || "—"}</span>
                                </p>

                                <p className='detail-text flex items-center gap-25'>
                                    Manzil <span
                                    className='detail-text-bold'>{doctor.address || "—"}</span>
                                </p>
                            </div>

                            <div className='flex flex-col gap-4.5 w-1/3'>
                                <p className='detail-text flex items-center gap-11'>
                                    Oilaviy holat <span
                                    className='detail-text-bold'>{doctor.maritalStatus && "Oilali" || "—"}</span>
                                </p>

                                <p className='detail-text flex items-center gap-15'>
                                    Ma’lumoti <span
                                    className='detail-text-bold'>{doctor.education || "—"}</span>
                                </p>
                            </div>

                            <div className='flex flex-col gap-4.5 w-1/3'>
                                <p className='detail-text flex items-center gap-11'>
                                    Telefon raqam <span
                                    className='detail-text-bold'>{doctor.phone || "—"}</span>
                                </p>

                                <p className='detail-text flex items-center gap-11'>
                                    Oila a’zolaridan <br/>
                                    telefon raqam <span
                                    className='detail-text-bold'>{doctor.phone || "—"}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/*  Medical History */}
                <MedicalHistoryList/>
            </div>

            {/*<Modal*/}
            {/*    title="Bemorni rostan ham dasturdan o'chirmoqchimisiz?"*/}
            {/*    description="Bemorni o'chirgandan so'ng ma'lumotlarni qayta tiklash imkoni mavjud emas."*/}
            {/*    action={handleDelete}*/}
            {/*/>*/}
        </>
    );
};

export default DoctorDetailPage;