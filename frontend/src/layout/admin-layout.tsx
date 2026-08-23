import Navbar from "../components/layout/navbar.tsx";
import {Outlet} from 'react-router-dom';
import Sidebar from "../components/layout/sidebar.tsx";

const AdminLayout = () => {
  return (
    <>
      <Navbar />
      <Sidebar />
      <main className='lg:ml-64 mt-[88px]'>
        <Outlet />
      </main>
    </>
  )
};

export default AdminLayout;
