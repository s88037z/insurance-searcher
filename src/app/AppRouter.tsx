import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import ErrorPage from "./routes/ErrorPage";
import PolicyholderRoute from "./routes/Policyholder";
import { useQueryClient, QueryClient } from "@tanstack/react-query";
import { policyholdersLoader } from "@/features/policyholder/api/getPolicyholder";

const createAppRouter = (queryClient: QueryClient) =>
  createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          path: "/policyholder",
          element: <PolicyholderRoute />,
          loader: () => policyholdersLoader(queryClient)(),
        },
        {
          path: "/policyholder/:policyholderId",
          element: <div>policyholder detail</div>,
        },
        { index: true, element: <Navigate to="/policyholder" replace /> },
      ],
      errorElement: <ErrorPage />,
    },
    { path: "*", element: <Navigate to="/policyholder" replace /> },
  ]);

export default function AppRouter() {
  const queryClient = useQueryClient();
  const router = createAppRouter(queryClient);
  return <RouterProvider router={router} />;
}
