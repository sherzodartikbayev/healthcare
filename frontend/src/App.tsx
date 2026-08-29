import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import AdminLayout from "./layout/admin-layout.tsx";
import ErrorPage from "./pages/error.page.tsx";
import DashboardPage from "./pages/dashboard.page.tsx";
import LoginPage from "./pages/login.page.tsx";
import AuthInitializer from "./components/shared/auth-initializer.tsx";
import ProtectedRoute from "./components/shared/protected-route.tsx";

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
      ]
    }
  ]);

  return (
    <>
      <AuthInitializer />
      <RouterProvider router={router}/>
    </>
  )
}

export default App

