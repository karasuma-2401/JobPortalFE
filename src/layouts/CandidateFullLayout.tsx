import { Outlet } from "react-router-dom";
import Header from "../pages/home/components/Header";

export default function CandidateFullLayout() {
  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-900 bg-bg-white">
      <Header /> 
      <main className="flex-1 w-full">
        <Outlet />
      </main>
    </div>
  );
}