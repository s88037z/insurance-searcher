import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <main className="flex w-full justify-center">
      <Outlet />
    </main>
  );
}
