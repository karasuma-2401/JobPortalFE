import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import MyJobsTable, { type JobItem } from "./components/MyJobsTable";
import Pagination from "../../../components/ui/Pagination";
import PromoteJobModal from "./components/PromoteJobModal";

const mockJobs: JobItem[] = [
  {
    id: "1",
    title: "UI/UX Designer",
    type: "Full Time",
    dateInfo: "27 days remaining",
    status: "Active",
    applications: 798,
    isFeatured: true,
  },
  {
    id: "2",
    title: "Senior UX Designer",
    type: "Internship",
    dateInfo: "8 days remaining",
    status: "Active",
    applications: 185,
  },
  {
    id: "3",
    title: "Junior Graphic Designer",
    type: "Full Time",
    dateInfo: "24 days remaining",
    status: "Active",
    applications: 583,
    isHighlighted: true,
  },
  {
    id: "4",
    title: "Front End Developer",
    type: "Full Time",
    dateInfo: "Dec 7, 2019",
    status: "Expire",
    applications: 740,
  },
  {
    id: "5",
    title: "Technical Support Specialist",
    type: "Part Time",
    dateInfo: "4 days remaining",
    status: "Active",
    applications: 556,
  },
  {
    id: "6",
    title: "Interaction Designer",
    type: "Contract Base",
    dateInfo: "Feb 2, 2019",
    status: "Expire",
    applications: 426,
  },
  {
    id: "7",
    title: "Software Engineer",
    type: "Temporary",
    dateInfo: "9 days remaining",
    status: "Active",
    applications: 922,
  },
  {
    id: "8",
    title: "Product Designer",
    type: "Full Time",
    dateInfo: "7 days remaining",
    status: "Active",
    applications: 994,
  },
  {
    id: "9",
    title: "Project Manager",
    type: "Full Time",
    dateInfo: "Dec 4, 2019",
    status: "Expire",
    applications: 196,
  },
  {
    id: "10",
    title: "Marketing Manager",
    type: "Full Time",
    dateInfo: "4 days remaining",
    status: "Active",
    applications: 492,
  },
];

const ITEMS_PER_PAGE = 6;

export default function MyJobsPage() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState<JobItem[]>(mockJobs);
  const [filter, setFilter] = useState<"All Jobs" | "Active" | "Expire">(
    "All Jobs",
  );
  const [currentPage, setCurrentPage] = useState(1);

  const [promoteModalData, setPromoteModalData] = useState<{
    isOpen: boolean;
    jobId: string;
    jobTitle: string;
  }>({
    isOpen: false,
    jobId: "",
    jobTitle: "",
  });

  const filteredJobs = useMemo(() => {
    if (filter === "All Jobs") return jobs;
    return jobs.filter((job) => job.status === filter);
  }, [jobs, filter]);

  const totalPages = Math.ceil(filteredJobs.length / ITEMS_PER_PAGE);
  const currentJobs = filteredJobs.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(e.target.value as "All Jobs" | "Active" | "Expire");
    setCurrentPage(1);
  };

  const handleViewApplications = (id: string) => {
    navigate(`/employer/applications?jobId=${id}`);
  };

  const handlePromoteClick = (id: string) => {
    const job = jobs.find((j) => j.id === id);
    if (job) {
      setPromoteModalData({ isOpen: true, jobId: job.id, jobTitle: job.title });
    }
  };

  const handleConfirmPromote = (plan: string) => {
    setJobs((prev) =>
      prev.map((job) => {
        if (job.id === promoteModalData.jobId) {
          return {
            ...job,
            isFeatured: plan === "featured",
            isHighlighted: plan === "highlight",
          };
        }
        return job;
      }),
    );

    setPromoteModalData((prev) => ({ ...prev, isOpen: false }));
    toast.success(`Successfully promoted job as ${plan.toUpperCase()}`);
  };

  const handleViewDetail = (id: string) => {
    toast.info(`Viewing details for Job ID: ${id}`);
  };

  const handleMarkExpired = (id: string) => {
    setJobs((prev) =>
      prev.map((job) => (job.id === id ? { ...job, status: "Expire" } : job)),
    );
    toast.success("Job marked as expired!");
  };

  return (
    <div className="w-full max-w-7xl mx-auto animate-in fade-in duration-500 pb-16">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-xl font-bold text-gray-900">
          My Jobs{" "}
          <span className="text-gray-400 font-medium">
            ({filteredJobs.length})
          </span>
        </h1>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-500">Job status</span>
          <select
            value={filter}
            onChange={handleFilterChange}
            className="px-4 py-2 bg-white border border-gray-200 rounded-md text-sm text-gray-700 focus:outline-none focus:border-blue-500 cursor-pointer"
          >
            <option value="All Jobs">All Jobs</option>
            <option value="Active">Active</option>
            <option value="Expire">Expire</option>
          </select>
        </div>
      </div>

      <MyJobsTable
        jobs={currentJobs}
        onViewApplications={handleViewApplications}
        onPromote={handlePromoteClick}
        onViewDetail={handleViewDetail}
        onMarkExpired={handleMarkExpired}
      />

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}

      <PromoteJobModal
        isOpen={promoteModalData.isOpen}
        jobTitle={promoteModalData.jobTitle}
        onClose={() =>
          setPromoteModalData((prev) => ({ ...prev, isOpen: false }))
        }
        onConfirm={handleConfirmPromote}
      />
    </div>
  );
}
