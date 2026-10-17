import AdminForm from "../components/forms/admin.form.tsx";

const RegisterAdminPage = () => {
    return (
        <section>
            <div className='container'>
                <h2 className='section-title'>Adminlar</h2>

                <AdminForm />
            </div>
        </section>
    );
};

export default RegisterAdminPage;