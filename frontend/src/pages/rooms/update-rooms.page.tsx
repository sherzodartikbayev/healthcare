import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {toast} from "react-toastify";
import {useRooms, useUpdateRooms} from "../../hooks/useRoom.ts";
import type {CreateRoomInput} from "../../types/room.type.ts";
import RoomForm from "../../components/forms/room.form.tsx";

const UpdateRoomPage = () => {
    const {id} = useParams<{ id: string }>();
    const navigate = useNavigate();
    const {data, isLoading, isError} = useRooms();
    const {mutate: updateRoom, isPending} = useUpdateRooms();
    const [initialValues, setInitialValues] = useState<CreateRoomInput>();

    useEffect(() => {
        if (!id || !data?.rooms) return;

        const room = data.rooms.find((item: { id: string; }) => item.id === id);
        if (!room) return;

        // eslint-disable-next-line react-hooks/set-state-in-effect
        setInitialValues({
            departmentId: room.departmentId,
            roomNumber: room.roomNumber,
            floor: room.floor,
            capacity: room.capacity,
            description: room.description ?? "",
            patients: room.patients ?? [],
            status: room.status,
        });
    }, [data, id]);

    const handleSubmit = (room: CreateRoomInput) => {
        if (!id) return;
        updateRoom({id, room}, {
            onSuccess: () => {
                toast.success("Xona ma'lumotlari yangilandi.");
                navigate("/rooms");
            },
            onError: (error) => toast.error(error.message),
        });
    };

    if (isLoading) return <p className='p-10 text-center'>Xona ma'lumotlari yuklanmoqda...</p>;
    if (isError || !initialValues) return <p className='p-10 text-center'>Xona topilmadi yoki ma'lumotlarni yuklashda
        xatolik yuz berdi.</p>;

    return (
        <section className='my-7.5'>
            <div className='container'>
                <h1 className="text-2xl font-bold mb-2 text-center">Xonani tahrirlash</h1>
                <p className='text-base font-bold text-center mb-5'>Xona ma'lumotlari</p>

                <RoomForm initialValues={initialValues} onSubmit={handleSubmit} isPending={isPending} submitText="O'zgarishlarni saqlash"/>
            </div>
        </section>
    );
};

export default UpdateRoomPage;