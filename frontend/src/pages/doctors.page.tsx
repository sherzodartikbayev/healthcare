import {DoctorList} from "../components/lists/doctor.list.tsx";

const DoctorPage = () => {
  return (
    <section className=''>
      <div className='container md:px-9 px-5'>
        <h2 className='section-title'>Shifokorlar</h2>

        <DoctorList />
      </div>
    </section>
  )
};

export default DoctorPage;
