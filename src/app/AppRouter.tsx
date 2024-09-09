import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import MainLayout from "../components/MainLayout";
import ErrorPage from "./routes/ErrorPage";
import PolicyholderRoute from "./routes/Policyholder";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/policyholder",
        element: <PolicyholderRoute />,
      },
      { index: true, element: <Navigate to="/policyholder" replace /> },
    ],
    errorElement: <ErrorPage />,
  },
  { path: "*", element: <Navigate to="/policyholder" replace /> },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
