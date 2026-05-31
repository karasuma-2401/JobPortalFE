import { DollarSign, Users, Briefcase, Building2 } from "lucide-react";
import StatCard from "./components/StatCard";
import RevenueChart from "./components/RevenueChart";
import IndustryPieChart from "./components/IndustryPieChart";
import PendingApprovalsList from "./components/PendingApprovalsList";

export default function DashboardPage() {
  return (
    <div className="animate-in fade-in duration-500 pb-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-sm text-gray-500 mt-1">
          Welcome back, Super Admin! Here's what's happening today.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Revenue"
          value="$124,500"
          icon={<DollarSign size={24} />}
          trend={{ value: 12.5, isPositive: true }}
          iconBgColor="bg-blue-50"
          iconColor="text-blue-600"
        />
        <StatCard
          title="Users"
          value="8,234"
          icon={<Users size={24} />}
          trend={{ value: 5.2, isPositive: true }}
          iconBgColor="bg-purple-50"
          iconColor="text-purple-600"
        />
        <StatCard
          title="Active Jobs"
          value="1,245"
          icon={<Briefcase size={24} />}
          trend={{ value: 1.5, isPositive: false }}
          iconBgColor="bg-green-50"
          iconColor="text-green-600"
        />
        <StatCard
          title="Pending Employers"
          value="24"
          icon={<Building2 size={24} />}
          iconBgColor="bg-orange-50"
          iconColor="text-orange-600"
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RevenueChart />
        </div>
        <div className="flex flex-col gap-6">
          <IndustryPieChart />

          <PendingApprovalsList />
        </div>
      </div>
    </div>
  );
}
