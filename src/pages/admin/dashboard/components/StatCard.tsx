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
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex items-center gap-4 hover:shadow-md transition-shadow">
      <div
        className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${iconBgColor} ${iconColor}`}
      >
        {icon}
      </div>
      <div className="flex-1">
        <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-1">
          {title}
        </p>
        <div className="flex items-end gap-3">
          <h3 className="text-2xl font-black text-gray-900">{value}</h3>
          {trend && (
            <span
              className={`flex items-center gap-1 text-xs font-bold mb-1 ${
                trend.isPositive ? "text-green-600" : "text-red-600"
              }`}
            >
              {trend.isPositive ? (
                <TrendingUp size={14} />
              ) : (
                <TrendingDown size={14} />
              )}
              {trend.value}%
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
