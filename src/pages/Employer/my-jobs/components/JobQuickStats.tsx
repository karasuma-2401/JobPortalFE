import { DollarSign, Briefcase, Calendar, Clock } from "lucide-react";

interface JobQuickStatsProps {
  salary: string;
  experience: string;
  postedDate: string;
  expirationDate: string;
}

export default function JobQuickStats({
  salary,
  experience,
  postedDate,
  expirationDate,
}: JobQuickStatsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-2">
        <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
          <DollarSign size={20} strokeWidth={2.5} />
        </div>
        <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mt-1">
          Salary
        </p>
        <p className="text-sm font-bold text-gray-900">{salary}</p>
      </div>
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-2">
        <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
          <Briefcase size={20} strokeWidth={2.5} />
        </div>
        <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mt-1">
          Experience
        </p>
        <p className="text-sm font-bold text-gray-900">{experience}</p>
      </div>
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-2">
        <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
          <Calendar size={20} strokeWidth={2.5} />
        </div>
        <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mt-1">
          Date Posted
        </p>
        <p className="text-sm font-bold text-gray-900">{postedDate}</p>
      </div>
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-2">
        <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center">
          <Clock size={20} strokeWidth={2.5} />
        </div>
        <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mt-1">
          Expiration
        </p>
        <p className="text-sm font-bold text-gray-900">{expirationDate}</p>
      </div>
    </div>
  );
}
