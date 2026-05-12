import { Outlet } from "react-router-dom";
// import Sidebar từ components của bạn

export default function CandidateLayout() {
  return (
    <div className="flex">
      {/* <Sidebar /> */}
      <main className="flex-1 bg-gray-50 min-h-screen">
        <Outlet /> 
      </main>
    </div>
  );
}