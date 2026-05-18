import { Outlet } from "react-router-dom";
import EmployerSidebar from "../pages/employer/components/EmployerSidebar";
import EmployerHeader from "../pages/employer/components/EmployerHeader";

export default function EmployerDashboardLayout() {
  return (
    <div className="flex flex-col h-screen bg-gray-50 overflow-hidden">
      <EmployerHeader />
      <div className="flex flex-1 overflow-hidden">
        <EmployerSidebar />
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
