import {type ChangeEvent, type FormEvent, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {useDepartments} from "../../hooks/useDepartment.ts";
import type {DepartmentType} from "../../types/department.type.ts";
import type {CreateRoomInput} from "../../types/room.type.ts";
import Input from "../ui/input.tsx";
import Button from "../ui/button.tsx";
import {defaultRoomValues} from "../../constants";

type RoomFormProps = {
    initialValues?: CreateRoomInput;
    onSubmit: (room: CreateRoomInput) => void;
    isPending?: boolean;
    submitText?: string;
};

const RoomForm = ({initialValues, onSubmit, isPending = false, submitText = "Saqlash"}: RoomFormProps) => {
    const [room, setRoom] = useState<CreateRoomInput>({...defaultRoomValues, ...initialValues});
    const {data, isLoading: isDepartmentsLoading} = useDepartments();
    const departments: DepartmentType[] = data?.departments ?? [];

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        if (initialValues) setRoom({...defaultRoomValues, ...initialValues});
    }, [initialValues]);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setRoom((prev) => ({
            ...prev,
            [name]: ["roomNumber", "floor", "capacity"].includes(name) ? Number(value) : value,
        }));
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit(room);
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-4xl w-full mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                <div>
                    <label htmlFor="departmentId" className="font-semibold text-sm">Bo'lim:</label>
                    <select
                        id="departmentId"
                        name="departmentId"
                        value={room.departmentId}
                        onChange={handleChange}
                        disabled={isPending || isDepartmentsLoading}
                        className="w-full p-2 border-2 border-gray rounded-md outline-none"
                        required
                    >
                        <option value="">Bo'limni tanlang</option>
                        {departments.map((department) => (
                            <option key={department.id} value={department.id}>{department.name}</option>
                        ))}
                    </select>
                </div>

                <Input
                    name="roomNumber"
                    type="number"
                    label="Xona raqami:"
                    value={room.roomNumber}
                    onChange={handleChange}
                    disabled={isPending}
                    min="1"
                    required
                />

                <Input
                    name="floor"
                    type="number"
                    label="Qavat:"
                    value={room.floor}
                    onChange={handleChange}
                    disabled={isPending}
                    min="0"
                    required
                />

                <Input
                    name="capacity"
                    type="number"
                    label="Sig'imi:"
                    value={room.capacity}
                    onChange={handleChange}
                    disabled={isPending}
                    min="1"
                    required
                />

                <div>
                    <label htmlFor="status" className="font-semibold text-sm">Holati:</label>
                    <select
                        id="status"
                        name="status"
                        value={room.status}
                        onChange={handleChange}
                        disabled={isPending}
                        className="w-full p-2 border-2 border-gray rounded-md outline-none"
                        required
                    >
                        <option value="ACTIVE">Faol</option>
                        <option value="INACTIVE">Faol emas</option>
                    </select>
                </div>

                <div className="md:col-span-2">
                    <label htmlFor="description" className="font-semibold text-sm">Tavsif:</label>
                    <textarea
                        id="description"
                        name="description"
                        value={room.description ?? ""}
                        onChange={handleChange}
                        disabled={isPending}
                        rows={3}
                        className="w-full p-2 border-2 border-gray rounded-md outline-none"
                        placeholder="Xona haqida qo'shimcha ma'lumot..."
                    />
                </div>
            </div>

            <div className="flex justify-end mt-5 gap-2">
                <Link to="/rooms">
                    <Button type="button" variant="outline" disabled={isPending}>Bekor qilish</Button>
                </Link>
                <Button type="submit" variant="primary" disabled={isPending || isDepartmentsLoading}>
                    {isPending ? "Saqlanmoqda..." : submitText}
                </Button>
            </div>
        </form>
    );
};

export default RoomForm;