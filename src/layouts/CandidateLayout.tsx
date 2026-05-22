import { Outlet, useLocation, Link, useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, 
  Briefcase, 
  Bookmark, 
  Bell, 
  Settings, 
  LogOut,
  Search
} from "lucide-react";

const Topbar = () => {
  return (
    <header className="w-full h-20 bg-white border-b border-gray-100 flex items-center shrink-0 sticky top-0 z-50">
      <div className="w-64 h-full border-r border-gray-100 flex items-center px-6 shrink-0">
        <span className="text-[13px] font-extrabold tracking-wider text-gray-900 uppercase">
          JobPortal
        </span>
      </div>

      <div className="flex-1 h-full flex items-center justify-between px-8">
        <div className="relative w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search jobs, companies..."
            className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-100 rounded-lg outline-none focus:border-primary-400 transition-colors bg-gray-50/30"
          />
        </div>

        <div className="flex items-center gap-5">
          <button className="relative p-2 text-gray-500 hover:text-gray-900 transition-colors">
            <Bell size={22} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary-500 rounded-full" />
          </button>
          
          <div className="w-[1px] h-6 bg-gray-200" />
          
          <div className="flex items-center gap-3 cursor-pointer group">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop"
              alt="Candidate avatar"
              className="w-10 h-10 rounded-full object-cover border border-gray-100 group-hover:border-primary-400 transition-colors"
            />
            <div className="hidden md:flex flex-col text-left">
              <span className="text-sm font-semibold text-gray-900 group-hover:text-primary-500 transition-colors">
                Albert Flores
              </span>
              <span className="text-xs text-gray-400">Candidate</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { path: "/candidate/overview", label: "Overview", icon: <LayoutDashboard size={22} /> },
    { path: "/candidate/applied", label: "Applied Jobs", icon: <Briefcase size={22} /> },
    { path: "/candidate/favorites", label: "Favorite Jobs", icon: <Bookmark size={22} /> },
    { path: "/candidate/alerts", label: "Job Alert", icon: <Bell size={22} />, badge: "09" },
    { path: "/candidate/settings", label: "Settings", icon: <Settings size={22} /> },
  ];

  return (
    <div className="w-64 h-full bg-white border-r border-gray-100 flex flex-col justify-between shrink-0">
      <div className="flex flex-col w-full pt-4">
        <span className="px-6 text-[10px] font-bold tracking-wider text-gray-400 uppercase mb-3 block text-left">
          Candidate Dashboard
        </span>
        <nav className="flex flex-col w-full">
          {menuItems.map((item) => {
            const isActive = location.pathname.includes(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center justify-between px-6 py-3.5 text-[15px] font-medium transition-all border-l-[3px] ${
                  isActive
                    ? "bg-blue-50/50 border-primary-500 text-primary-500"
                    : "border-transparent text-gray-500 hover:text-gray-900 hover:bg-gray-50/50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={isActive ? "text-primary-500" : "text-gray-400"}>{item.icon}</span>
                  {item.label}
                </div>
                {item.badge && (
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded ${
                    isActive ? "bg-white text-primary-500" : "bg-gray-100 text-gray-700"
                  }`}>
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-4 border-t border-gray-50">
        <button
          onClick={() => navigate("/login")}
          className="flex items-center gap-3 w-full px-4 py-3 text-[15px] font-medium text-gray-500 hover:text-danger-500 hover:bg-red-50/50 rounded-lg transition-all"
        >
          <LogOut size={22} className="text-gray-400 hover:text-danger-500" />
          Log-out
        </button>
      </div>
    </div>
  );
};

export default function CandidateLayout() {
  return (
    <div className="flex flex-col w-full h-screen bg-gray-50/40 font-sans antialiased overflow-hidden">
      <Topbar />
      <div className="flex flex-1 min-w-0 overflow-hidden">
        <Sidebar />
        <main className="flex-1 p-8 overflow-y-auto w-full relative">
          <div className="max-w-6xl mx-auto w-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}