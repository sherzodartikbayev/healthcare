import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import AdminLayout from "./layout/admin-layout.tsx";
import ErrorPage from "./pages/error.page.tsx";
import DashboardPage from "./pages/dashboard.page.tsx";
import LoginPage from "./pages/login.page.tsx";
import AuthInitializer from "./components/shared/auth-initializer.tsx";
import ProtectedRoute from "./components/shared/protected-route.tsx";
import DoctorPage from "./pages/doctors.page.tsx";
import PatientsPage from "./pages/patient/patients.page.tsx";
import DepartmentsPage from "./pages/departments.page.tsx";
import RoomsPage from "./pages/rooms.page.tsx";
import {ToastContainer} from 'react-toastify';
import CreatePatient from './pages/patient/create-patient.tsx';
import UpdatePatient from './pages/patient/update-patient.tsx';
import PatientDetailPage from "./pages/patient/patient-detail.page.tsx";

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
        }
      ]
    },
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

