import { Link } from "react-router-dom";
import Button from "../components/ui/button";

const ErrorPage = () => (
  <section>
    <div className='container h-screen d-flex flex-col'>
      <h2 className="text-9xl font-bold text-blue">404</h2>
      <h3 className="text-2xl text-gray-dark mb-2">Sahifa mavjud emas!</h3>
      <p className="text-base max-w-96 text-center mb-5">Ushbu sahifa hozirda saytda mavjud emas. Pastdagi tugma orqali bosh sahifaga qaytishingiz mumkin.</p>

      <Button variant='primary'><Link to='/'>Bosh sahifa</Link></Button>
    </div>
  </section>
);

export default ErrorPage;
