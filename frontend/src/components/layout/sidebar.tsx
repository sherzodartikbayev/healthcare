import {Link} from 'react-router-dom';
import {SidebarLinks} from "../../constants";

const Sidebar = () => (
  <>
    <aside className='max-lg:hidden'>
      <div className='fixed top-0 left-0 bottom-0 p-6 w-64 bg-white shadow-xl'>
        {/* Logo */}
        <Link to='/'>
          <img src='/logo.png' alt='Healthcare logo'/>
        </Link>

        {/* Links */}
        <ul className='flex flex-col mt-[46px]'>
          <p className='font-normal text-[14px] text-gray mb-5'>MEDICINE</p>

          {SidebarLinks.map((item) => (
            <li key={item.id}>
              <Link to={item.link} className='my-3.5 flex gap-3.5'>
                <img src={item.src} alt={item.label}/>
                <p className='font-bold text-[14px] transition-colors hover:text-blue'>{item.label}</p>
              </Link>
            </li>
          ))}
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
);

export default Sidebar;
