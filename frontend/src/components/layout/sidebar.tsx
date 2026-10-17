import {Link, NavLink, useNavigate} from 'react-router-dom';
import {SidebarLinks} from "../../constants";
import Button from "../ui/button.tsx";
import {toast} from "react-toastify";
import {logout} from "../../api/admin.api.ts";

const Sidebar = () => {
    const navigate = useNavigate();

    async function handleLogout() {
        try {
            await logout();
            toast.success('Dasturdan muvaffaqiyatli chiqdingiz.')
            navigate('/login');
        } catch(error) {
            console.error(error);
            toast.error('Dasturdan chiqishda xatolik!');
        }
    }

    return (
        <>
            <aside className='max-lg:hidden'>
                <div className='fixed top-0 left-0 bottom-0 p-6 w-64 bg-white shadow-xl'>
                    {/* Logo */}
                    <Link to='/'>
                        <img src='/logo.png' alt='Healthcare logo'/>
                    </Link>

                    {/* Links */}
                    <ul className='flex flex-col mt-11.5'>
                        <p className='font-normal text-sm text-gray mb-5'>MEDICINE</p>

                        {SidebarLinks.map((item) => (
                            <li key={item.id}>
                                <NavLink to={item.link}
                                         className={({isActive}) => `my-3.5 flex gap-3.5 ${isActive ? 'text-blue' : 'text-black'}`}>
                                    <img src={item.src} alt={item.label}/>
                                    <p className='font-bold text-sm transition-colors hover:text-blue'>{item.label}</p>
                                </NavLink>
                            </li>
                        ))}

                        <hr className='mt-14'/>

                        <Button className='p-3.5 mt-2' onClick={handleLogout}>
                            <img src='/icons/logout.svg' />
                            Tizimdan chiqish
                        </Button>
                    </ul>
                </div>
            </aside>

            <aside className='lg:hidden'>
                <div className='fixed right-0 left-0 bottom-0 md:px-10 px-5 w-full bg-white shadow-xl'>
                    {/* Links */}
                    <ul className='flex items-center justify-between gap-5'>
                        {SidebarLinks.map((item) => (
                            <li key={item.id}>
                                <Link to={item.link} key={item.id} className='my-3 flex items-center flex-col gap-1'>
                                    <img src={item.src} alt={item.label} className='size-5 md:size-6'/>
                                    <p className='font-bold text-[10px] md:text-xs transition-colors text-center hover:text-blue'>
                                        {item.label}
                                    </p>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </aside>
        </>
    )
};

export default Sidebar;
