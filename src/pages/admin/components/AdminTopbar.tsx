import { Bell, Search, LogOut } from "lucide-react";
import avatar from "../../../assets/sulkyunggu.jpg";

export default function AdminTopbar() {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-10 shrink-0 shadow-sm">
      <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 w-100 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all">
        <Search size={18} className="text-gray-400" />
        <input
          type="text"
          placeholder="Search globally (Transactions, Users, Logs)..."
          className="bg-transparent border-none outline-none ml-2 w-full text-sm text-gray-700"
        />
      </div>

      <div className="flex items-center gap-6">
        <button className="relative text-gray-500 hover:text-gray-900 transition-colors">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

        <div className="h-8 w-px bg-gray-200"></div>

        <div className="flex items-center gap-3 cursor-pointer group">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-gray-900 leading-tight group-hover:text-blue-600 transition-colors">
              Super Admin
            </p>
            <p className="text-xs text-gray-500">admin@system.com</p>
          </div>
          <img
            src={avatar}
            alt="Admin Avatar"
            className="w-10 h-10 rounded-full border-2 border-gray-100"
          />
          <button
            className="text-gray-400 hover:text-red-500 transition-colors ml-2"
            title="Logout"
          >
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </header>
  );
}
