import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

interface StatCardProps {
  title: string;
  count: string | number;
  icon: React.ReactNode;
  bgColorClass: string;
  textColorClass: string;
  trend?: {
    value: number;
    isPositive: boolean;
    label?: string;
  };
}

export default function StatCard({
  title,
  count,
  icon,
  bgColorClass,
  textColorClass,
  trend,
}: StatCardProps) {
  return (
    <div className="group relative flex flex-col p-6 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md hover:border-gray-200 hover:-translate-y-1 transition-all duration-300">
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-1.5">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
            {title}
          </p>
          <h3 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            {count}
          </h3>
        </div>

        <div
          className={`flex items-center justify-center w-12 h-12 rounded-xl ${bgColorClass} ${textColorClass} shadow-inner transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}
        >
          {icon}
        </div>
      </div>
      {trend && (
        <div className="mt-4 flex items-center gap-2">
          <span
            className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-md ${
              trend.isPositive
                ? "bg-success-50 text-success-700"
                : "bg-danger-50 text-danger-700"
            }`}
          >
            {trend.isPositive ? (
              <TrendingUp size={14} strokeWidth={2.5} />
            ) : (
              <TrendingDown size={14} strokeWidth={2.5} />
            )}
            {trend.value}%
          </span>
          {trend.label && (
            <span className="text-xs font-medium text-gray-400">
              {trend.label}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
