import SearchForm from "../forms/search.form.tsx";
import {Link} from "react-router-dom";
import Userbox from "../ui/user-box.tsx";

const Navbar = () => (
    <header>
      <div className='fixed top-0 right-0 left-0 lg:ml-64 py-6 px-9 max-md:px-2 max-md:py-3 d-between'>
        {/* Search */}
        <SearchForm />

        <div className='d-flex md:gap-6.5 gap-4'>
          <Link to={'/notifications'}>
            <img src='/icons/notification.png' alt='Notification' />
          </Link>

          <Userbox />
        </div>
      </div>
    </header>
);

export default Navbar;
