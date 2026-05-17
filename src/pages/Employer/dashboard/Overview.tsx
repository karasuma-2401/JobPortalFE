import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Briefcase, BookmarkCheck } from "lucide-react";
import { toast } from "sonner";
import StatCard from "./components/StatCard";
import RecentJobsTable, { type Job } from "./components/RecentJobsTable";

interface DashboardData {
  companyName: string;
  openJobs: number;
  savedCandidates: number;
  recentJobs: Job[];
}

export default function Overview() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 800));

        const mockData: DashboardData = {
          companyName: "Instagram",
          openJobs: 589,
          savedCandidates: 2517,
          recentJobs: [
            {
              id: 1,
              title: "UI/UX Designer",
              type: "Full Time",
              remaining: "27 days remaining",
              status: "Active",
              applications: 798,
            },
            {
              id: 2,
              title: "Senior UX Designer",
              type: "Internship",
              remaining: "8 days remaining",
              status: "Active",
              applications: 185,
            },
            {
              id: 3,
              title: "Technical Support Specialist",
              type: "Part Time",
              remaining: "4 days remaining",
              status: "Active",
              applications: 556,
            },
            {
              id: 4,
              title: "Junior Graphic Designer",
              type: "Full Time",
              remaining: "24 days remaining",
              status: "Active",
              applications: 583,
            },
            {
              id: 5,
              title: "Front End Developer",
              type: "Full Time",
              remaining: "Dec 7, 2019",
              status: "Expire",
              applications: 740,
            },
          ],
        };

        setData(mockData);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const handleViewApplications = (jobId: number) => {
    navigate(`/employer/applications?jobId=${jobId}`);
  };

  const handlePromote = (jobId: number) => {
    toast.success(`Redirecting to Promote Job page for ID: ${jobId}`);
  };

  const handleViewDetail = (jobId: number) => {
    toast.info(`Viewing job details for ID: ${jobId}`);
  };

  const handleMarkExpired = (jobId: number) => {
    if (!data) return;

    const updatedJobs = data.recentJobs.map((job) =>
      job.id === jobId ? { ...job, status: "Expire" } : job,
    );

    setData({ ...data, recentJobs: updatedJobs });
    toast.success(`Job ID ${jobId} marked as expired!`);
  };

  if (isLoading || !data) {
    return (
      <div className="w-full h-full flex items-center justify-center min-h-100">
        <div className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto animate-in fade-in duration-500 pb-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Hello, {data.companyName}
        </h1>
        <p className="text-sm text-gray-500">
          Here is your daily activities and applications
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          title="Open Jobs"
          count={data.openJobs}
          icon={<Briefcase size={24} />}
          bgColorClass="bg-primary-50"
          textColorClass="text-primary-500"
        />
        <StatCard
          title="Saved Candidates"
          count={data.savedCandidates}
          icon={<BookmarkCheck size={24} />}
          bgColorClass="bg-warning-50"
          textColorClass="text-warning-500"
        />
      </div>

      <RecentJobsTable
        jobs={data.recentJobs}
        onViewApplications={handleViewApplications}
        onPromote={handlePromote}
        onViewDetail={handleViewDetail}
        onMarkExpired={handleMarkExpired}
      />
    </div>
  );
}
