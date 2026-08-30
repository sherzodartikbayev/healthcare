import DepartmentList from "../components/lists/department.list.tsx";

const DepartmentsPage = () => {
  return (
    <section>
      <div className='container md:px-9 px-5 mb-2'>
        <h2 className='section-title'>Bo'limlar</h2>

        <DepartmentList />
      </div>
    </section>
  )
}

export default DepartmentsPage;
