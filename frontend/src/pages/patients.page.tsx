import PatientList from "../components/lists/patient.list.tsx";

const PatientsPage = () => {
  return (
    <section className=''>
      <div className='container px-9'>
        <h2 className='section-title'>Bemorlar</h2>

        <PatientList />
      </div>
    </section>
  )
};

export default PatientsPage;
