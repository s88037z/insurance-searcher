import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import ErrorPage from "./routes/ErrorPage";
import PolicyholderRoute from "./routes/Policyholder";

const createAppRouter = () =>
  createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          path: "/policyholders",
          element: <PolicyholderRoute />,
        },
        { index: true, element: <Navigate to="/policyholders" replace /> },
      ],
      errorElement: <ErrorPage />,
    },
    { path: "*", element: <Navigate to="/policyholders" replace /> },
  ]);

export default function AppRouter() {
  const router = createAppRouter();
  return <RouterProvider router={router} />;
}
