import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import AdminLayout from "./layout/admin-layout.tsx";
import ErrorPage from "./pages/error.page.tsx";
import DashboardPage from "./pages/dashboard.page.tsx";
import LoginPage from "./pages/login.page.tsx";
import AuthInitializer from "./components/shared/auth-initializer.tsx";
import ProtectedRoute from "./components/shared/protected-route.tsx";
import DoctorPage from "./pages/doctors/doctors.page.tsx";
import PatientsPage from "./pages/patient/patients.page.tsx";
import DepartmentsPage from "./pages/departments/departments.page.tsx";
import RoomsPage from "./pages/rooms/rooms.page.tsx";
import {ToastContainer} from 'react-toastify';
import CreatePatient from './pages/patient/create-patient.tsx';
import UpdatePatient from './pages/patient/update-patient.tsx';
import PatientDetailPage from "./pages/patient/patient-detail.page.tsx";
import CreateMedicalRecordPage from "./pages/medical-record/create-medicalRecord.page.tsx";
import UpdateMedicalRecordPage from "./pages/medical-record/update-medicalRecord.page.tsx";
import DoctorDetailPage from "./pages/doctors/doctor-detail.page.tsx";
import CreateDoctorPage from "./pages/doctors/create-doctor.page.tsx";
import UpdateDoctorPage from "./pages/doctors/update-doctor.page.tsx";
import CreateDepartmentPage from "./pages/departments/create-department.page.tsx";
import UpdateDepartmentPage from "./pages/departments/update-department.page.tsx";
import UpdateRoomsPage from "./pages/rooms/update-rooms.page.tsx";
import CreateRoomsPage from "./pages/rooms/create-rooms.page.tsx";
import RegisterAdminPage from "./pages/register-admin.page.tsx";

const App = () => {
    const router = createBrowserRouter([
        {
            path: "/login",
            element: <LoginPage/>
        },
        {
            path: "/",
            element: (
                <ProtectedRoute>
                    <AdminLayout/>
                </ProtectedRoute>
            ),
            errorElement: <ErrorPage/>,
            children: [
                {
                    index: true,
                    element: <DashboardPage/>
                },
                {
                    path: '/rooms',
                    element: <RoomsPage/>
                },
                {
                    path: '/doctors',
                    element: <DoctorPage/>
                },
                {
                    path: '/doctors/:id',
                    element: <DoctorDetailPage/>
                },
                {
                    path: '/patients',
                    element: <PatientsPage/>,
                },
                {
                    path: '/patients/:id',
                    element: <PatientDetailPage/>
                },
                {
                    path: '/departments',
                    element: <DepartmentsPage/>
                },
                {
                    path: '/admin',
                    element: <RegisterAdminPage />
                }
            ]
        },
        //   Doctor
        {
            path: '/create/doctors',
            element: (
                <ProtectedRoute>
                    <CreateDoctorPage/>
                </ProtectedRoute>
            )
        },
        {
            path: '/update/doctors/:id',
            element: (
                <ProtectedRoute>
                    <UpdateDoctorPage/>
                </ProtectedRoute>
            )
        },
        //   Patient
        {
            path: '/patients/create',
            element: (
                <ProtectedRoute>
                    <CreatePatient/>
                </ProtectedRoute>
            )
        },
        {
            path: '/patients/update/:id',
            element: (
                <ProtectedRoute>
                    <UpdatePatient/>
                </ProtectedRoute>
            )
        },
        //   Medical records
        {
            path: '/patients/:patientId/medical-record/create',
            element: (
                <ProtectedRoute>
                    <CreateMedicalRecordPage/>
                </ProtectedRoute>
            )
        },
        {
            path: '/patients/:patientId/medical-record/update/:id',
            element: (
                <ProtectedRoute>
                    <UpdateMedicalRecordPage/>
                </ProtectedRoute>
            )
        },
        // Departments
        {
            path: '/create/departments',
            element: (
                <ProtectedRoute>
                    <CreateDepartmentPage/>
                </ProtectedRoute>
            )
        },
        {
            path: '/update/departments/:id',
            element: (
                <ProtectedRoute>
                    <UpdateDepartmentPage/>
                </ProtectedRoute>
            )
        },
        //     Rooms
        {
            path: '/create/rooms',
            element: (
                <ProtectedRoute>
                    <CreateRoomsPage />
                </ProtectedRoute>
            )
        },
        {
            path: '/update/rooms/:id',
            element: (
                <ProtectedRoute>
                    <UpdateRoomsPage/>
                </ProtectedRoute>
            )
        }
    ]);

    return (
        <>
            <AuthInitializer/>
            <RouterProvider router={router}/>
            <ToastContainer/>
        </>
    )
}

export default App

