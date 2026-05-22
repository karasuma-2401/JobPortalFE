import { Bell, Search } from "lucide-react";

export default function DashboardTopbar() {
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
}