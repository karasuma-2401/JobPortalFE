import { useState } from "react";
import { Briefcase, Bookmark, Bell, ArrowRight } from "lucide-react";

// Import các component con đã được tách ra
import AppliedJobItem from "../AppliedJob/AppliedJobItem";
import StatCard from "./components/StatCard";
import ProfileAlert from "./components/ProfileAlert";
import JobTableHeader from "./components/JobTableHeader";

const mockRecentJobs = [
  { id: "1", logo: "https://logo.clearbit.com/upwork.com", role: "Networking Engineer", type: "Remote", location: "Washington", salary: "$50k-80k/month", dateApplied: "Feb 2, 2019 19:28", status: "Active" },
  { id: "2", logo: "https://logo.clearbit.com/dribbble.com", role: "Product Designer", type: "Full Time", location: "Dhaka", salary: "$50k-80k/month", dateApplied: "Dec 7, 2019 23:26", status: "Active" },
  { id: "3", logo: "https://logo.clearbit.com/apple.com", role: "Junior Graphic Designer", type: "Temporary", location: "Brazil", salary: "$50k-80k/month", dateApplied: "Feb 2, 2019 19:28", status: "Active" },
  { id: "4", logo: "https://logo.clearbit.com/microsoft.com", role: "Visual Designer", type: "Contract Base", location: "Wisconsin", salary: "$50k-80k/month", dateApplied: "Dec 7, 2019 23:26", status: "Active" },
];

export default function OverviewPage() {
  const [selectedJobId, setSelectedJobId] = useState<string | null>("4");
  const [isProfileCompleted] = useState(false);

  return (
    <div className="space-y-8 text-left animate-fade-in pb-8">
      <div>
        <h1 className="text-[22px] font-bold text-gray-900">Hello</h1>
        <p className="text-[15px] text-gray-500 mt-1">Here is your daily activities and job alerts</p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <StatCard 
          count="589" 
          label="Applied jobs" 
          variant="blue"
          icon={<Briefcase size={26} strokeWidth={2.5} />} 
        />
        <StatCard 
          count="238" 
          label="Favorite jobs" 
          variant="orange"
          icon={<Bookmark size={26} strokeWidth={2.5} />} 
        />
        <StatCard 
          count="574" 
          label="Job Alerts" 
          variant="green"
          icon={<Bell size={26} strokeWidth={2.5} />} 
        />
      </div>

      {!isProfileCompleted && <ProfileAlert />}
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="text-[18px] font-bold text-gray-900">Recently Applied</h2>
          <button className="flex items-center gap-2 text-[15px] font-medium text-gray-500 hover:text-gray-900 transition-colors group">
            View all <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <JobTableHeader />

        <div className="flex flex-col gap-3">
          {mockRecentJobs.map((job) => (
            <AppliedJobItem
              key={job.id}
              {...job}
              isSelected={selectedJobId === job.id}
              onSelect={() => setSelectedJobId(job.id)}
            />
          ))}
        </div>
      </div>
      
    </div>
  );
}