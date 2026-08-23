import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AdminLayout from "./layout/admin-layout.tsx";
import ErrorPage from "./pages/error.page.tsx";
import DashboardPage from "./pages/dashboard.page.tsx";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AdminLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <DashboardPage />
        },
      ]
    }
  ]);

  return (
    <RouterProvider router={router} />
  )
}

export default App

