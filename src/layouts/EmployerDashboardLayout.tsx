import { Outlet } from "react-router-dom";
import EmployerSidebar from "../pages/employer/components/EmployerSidebar";
import EmployerHeader from "../pages/employer/components/EmployerHeader";
import useAuth from "../contexts/auth/useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react'
export default function EmployerDashboardLayout() {
  const { isEmployer } = useAuth() 
  const navigate = useNavigate(); 
  
  useEffect(() => {
     if (!isEmployer) 
        navigate("/login"); 
  } , [isEmployer , navigate])
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
