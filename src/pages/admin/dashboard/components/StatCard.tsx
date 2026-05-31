import type { ReactNode } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  iconBgColor: string;
  iconColor: string;
}

export default function StatCard({
  title,
  value,
  icon,
  trend,
  iconBgColor,
  iconColor,
}: StatCardProps) {
  return (
    <div className="group relative bg-white rounded-2xl p-5 sm:p-6 flex items-center gap-4 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl border border-gray-100 hover:border-transparent">
      <div
        className={`absolute -right-8 -top-8 w-32 h-32 rounded-full opacity-30 blur-2xl transition-all duration-500 group-hover:opacity-70 group-hover:scale-150 pointer-events-none ${iconBgColor}`}
      ></div>
      <div
        className={`relative z-10 w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-inner border border-white/60 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 ${iconBgColor} ${iconColor}`}
      >
        {icon}
      </div>

      <div className="flex-1 min-w-0 relative z-10">
        <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-1 transition-colors duration-300 group-hover:text-gray-700 truncate">
          {title}
        </p>

        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-2 mt-1">
          <h3 className="text-2xl font-black text-gray-900 tracking-tight truncate max-w-full">
            {value}
          </h3>

          {trend && (
            <span
              className={`flex items-center gap-1 text-xs font-bold shrink-0 px-2 py-1 rounded-md transition-colors ${
                trend.isPositive
                  ? "text-green-700 bg-green-50 border border-green-100"
                  : "text-red-700 bg-red-50 border border-red-100"
              }`}
            >
              {trend.isPositive ? (
                <TrendingUp size={14} strokeWidth={2.5} />
              ) : (
                <TrendingDown size={14} strokeWidth={2.5} />
              )}
              {trend.value}%
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
