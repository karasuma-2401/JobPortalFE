import React from "react";

interface StatCardProps {
  title: string;
  count: string | number;
  icon: React.ReactNode;
  bgColorClass: string;
  textColorClass: string;
}

export default function StatCard({
  title,
  count,
  icon,
  bgColorClass,
  textColorClass,
}: StatCardProps) {
  return (
    <div className="flex items-center justify-between p-6 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow">
      <div className="flex flex-col gap-1">
        <h3 className="text-3xl font-bold text-gray-900">{count}</h3>
        <p className="text-sm font-medium text-gray-500">{title}</p>
      </div>
      <div
        className={`flex items-center justify-center w-14 h-14 rounded-lg ${bgColorClass} ${textColorClass}`}
      >
        {icon}
      </div>
    </div>
  );
}
