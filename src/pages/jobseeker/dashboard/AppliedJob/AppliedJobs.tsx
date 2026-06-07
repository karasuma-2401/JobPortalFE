import AppliedJobItem from "./AppliedJobItem";
import DashboardPagination from "../../../../components/ui/DashboardPagination";
import { useAppliedJobs } from "./hooks/useAppliedJobs";

export default function AppliedJobsPage() {
  const {
    appliedJobs,
    loading,
    error,
    totalCount,
    currentPage,
    selectedJobId,
    setSelectedJobId,
    totalPages,
    handlePageChange,
  } = useAppliedJobs();

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="w-10 h-10 border-4 border-primary-200 border-t-primary-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 text-red-500 font-semibold">{error}</div>
    );
  }

  return (
    <div className="space-y-6 text-left animate-fade-in pb-8">
      <div className="flex items-center gap-2 pb-2">
        <h1 className="text-[18px] font-bold text-gray-900">Applied Jobs</h1>
        <span className="text-[15px] font-medium text-gray-400">({totalCount})</span>
      </div>

      <div className="space-y-4">
        {appliedJobs.length === 0 ? (
          <div className="text-center py-20 bg-white border border-gray-100 rounded-xl">
            <p className="text-[15px] text-gray-400">You haven't applied to any jobs yet.</p>
          </div>
        ) : (
          <>
            <div className="flex items-center px-6 py-3.5 bg-gray-50 rounded-lg text-xs font-bold text-gray-500 tracking-wider">
              <div className="flex-1">JOBS</div>
              <div className="w-[180px]">DATE APPLIED</div>
              <div className="w-[120px]">STATUS</div>
              <div className="w-[140px] text-center">ACTION</div>
            </div>

            <div className="flex flex-col gap-3">
              {appliedJobs.map((job) => (
                <AppliedJobItem
                  key={job.id}
                  id={job.id}
                  logo={job.logo}
                  role={job.role}
                  type={job.type}
                  location={job.location}
                  salary={job.salary}
                  dateApplied={job.dateApplied}
                  status={job.status}
                  isSelected={selectedJobId === job.id}
                  onSelect={() => setSelectedJobId(job.id)}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {appliedJobs.length > 0 && (
        <DashboardPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}
