import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import JobLogo from "../../../assets/JobLogo.svg";
import {
  LayoutDashboard,
  CreditCard,
  Building,
  Users,
  Briefcase,
  FileText,
  Settings,
} from "lucide-react";

const MENU_ITEMS = [
  {
    name: "Dashboard",
    path: "/admin/dashboard",
    icon: <LayoutDashboard size={20} />,
  },
  {
    name: "Payment Management",
    path: "/admin/payments",
    icon: <CreditCard size={20} />,
  },
  {
    name: "Employer Approval",
    path: "/admin/employer-approvals",
    icon: <Building size={20} />,
  },
  { name: "User Management", path: "/admin/users", icon: <Users size={20} /> },
  {
    name: "Industry Management",
    path: "/admin/industries",
    icon: <Briefcase size={20} />,
  },
  {
    name: "Audit Logs",
    path: "/admin/audit-logs",
    icon: <FileText size={20} />,
  },
];

export default function AdminSidebar() {
  const navigate = useNavigate();
  const handleNavigate = (path: string) => {
    navigate(path);
  };
  const location = useLocation();

  return (
    <aside className="w-64 h-screen bg-gray-900 text-white flex flex-col fixed left-0 top-0 border-r border-gray-800 z-20">
      <div className="h-16 flex items-center px-6 border-b border-gray-800 shrink-0">
        <h1 className="text-xl font-bold text-white tracking-wider flex items-center gap-2">
          <div className="w-8 h-8 bg-transparent rounded-lg flex items-center justify-center">
            <img src={JobLogo} content="Logo Website" />
          </div>
          MyJob
        </h1>
      </div>

      <nav className="flex-1 overflow-y-auto py-6 px-3 flex flex-col gap-1.5 scrollbar-hide">
        {MENU_ITEMS.map((item) => {
          const isActive = location.pathname.includes(item.path);
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-all ${
                isActive
                  ? "bg-blue-600 text-white font-medium shadow-md shadow-blue-900/20"
                  : "text-gray-400 hover:bg-gray-800 hover:text-white"
              }`}
            >
              {item.icon}
              <span className="text-sm">{item.name}</span>
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-gray-800 shrink-0">
        <button
          onClick={() => handleNavigate("/admin/settings")}
          className="flex items-center gap-3 px-3 py-3 w-full text-left text-gray-400 hover:bg-gray-800 hover:text-white rounded-lg transition-colors"
        >
          <Settings size={20} />
          <span className="text-sm">Settings</span>
        </button>
      </div>
    </aside>
  );
}
