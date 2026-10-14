import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {useCreateRoom} from "../../hooks/useRoom.ts";
import type {CreateRoomInput} from "../../types/room.type.ts";
import RoomForm from "../../components/forms/room.form.tsx";

const CreateRoomPage = () => {
    const navigate = useNavigate();
    const {mutate: createRoom, isPending} = useCreateRoom();

    const handleSubmit = (room: CreateRoomInput) => {
        createRoom(room, {
            onSuccess: () => {
                toast.success("Xona muvaffaqiyatli yaratildi.");
                navigate("/rooms");
            },
            onError: (error) => toast.error(error.message),
        });
    };

    return (
        <section className='my-7.5'>
            <div className='container'>
                <h1 className="text-2xl font-bold mb-2 text-center">Yangi xona yaratish</h1>
                <p className='text-base font-bold text-center mb-5'>Xona ma'lumotlari</p>

                <RoomForm onSubmit={handleSubmit} isPending={isPending} submitText="Xona yaratish"/>
            </div>
        </section>
    );
};

export default CreateRoomPage;