import Input from "../ui/input.tsx";
import {type FormEvent, useState} from "react";
import Button from "../ui/button.tsx";
import {registerAdmin} from "../../api/admin.api.ts";
import type {Admin} from "../../types/admin.type.ts";
import {toast} from "react-toastify";

const AdminForm = () => {
    const [admin, setAdmin] = useState<Admin>({
        name: '',
        email: '',
        password: '',
        role: 'ADMIN'
    });

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        try {
            await registerAdmin(admin);
            toast.success('Yangi admin tizimga kiritildi.')
        } catch (error) {
            console.log(error);
            toast.error('Admin yaratilmadi!');
        }
    }

    return (
        <form className='max-w-md mx-auto mt-40 border px-10 py-15 rounded-2xl bg-white d-flex flex-col gap-3'
              onClick={handleSubmit}>
            <Input
                type='text'
                name='name'
                label='Ism'
                placeholder='Ali'
                value={admin.name}
                onChange={(e) => setAdmin({...admin, name: e.target.value})}
                required
            />

            <Input
                type='email'
                name='email'
                label='Email'
                placeholder='alivaliyev@mail.com'
                value={admin.email}
                onChange={(e) => setAdmin({...admin, email: e.target.value})}
                required
            />

            <Input
                type='password'
                name='password'
                label='Parol'
                placeholder='********'
                value={admin.password}
                onChange={(e) => setAdmin({...admin, password: e.target.value})}
                minLength={8}
                required
            />

            <Button type='submit' variant='primary' className='ml-auto'>Davom etish</Button>
        </form>
    );
};

export default AdminForm;