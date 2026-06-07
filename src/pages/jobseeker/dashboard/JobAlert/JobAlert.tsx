import { Pencil } from "lucide-react";
import JobAlertItem from "./JobAlertItem";
import DashboardPagination from "../../../../components/ui/DashboardPagination";
import { useJobAlerts } from "./hooks/useJobAlerts";

export default function JobAlertPage() {
  const {
    jobAlerts,
    loading,
    error,
    totalCount,
    currentPage,
    selectedJobId,
    setSelectedJobId,
    totalPages,
    handlePageChange,
  } = useJobAlerts();

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
    <div className="space-y-8 text-left animate-fade-in pb-8">
      <div className="flex items-center justify-between gap-6 pb-2 border-b border-gray-50">
        <div className="flex items-end gap-3">
          <h1 className="text-xl font-bold text-gray-900">Job Alerts</h1>
          <span className="text-sm font-medium text-gray-400 mb-0.5">({totalCount} jobs)</span>
        </div>
        <button className="flex items-center gap-2.5 px-6 py-3.5 text-[15px] font-bold text-primary-500 bg-blue-50 hover:bg-primary-500 hover:text-white rounded-lg transition-colors">
          <Pencil size={18} />
          Edit Job Alerts
        </button>
      </div>

      <div className="flex flex-col gap-5">
        {jobAlerts.length === 0 ? (
          <div className="text-center py-10 bg-white border border-gray-100 rounded-xl">
            <p className="text-[15px] text-gray-400">No job alerts found.</p>
          </div>
        ) : (
          jobAlerts.map((job) => (
            <JobAlertItem 
              key={job.id} 
              id={job.id}
              logo={job.logo}
              role={job.role}
              type={job.type}
              location={job.location}
              salary={job.salary}
              daysRemaining={job.daysRemaining}
              isSelected={selectedJobId === job.id}
              onSelect={() => setSelectedJobId(job.id === selectedJobId ? null : job.id)}
            />
          ))
        )}
      </div>

      {jobAlerts.length > 0 && (
        <DashboardPagination 
          currentPage={currentPage} 
          totalPages={totalPages} 
          onPageChange={handlePageChange} 
        />
      )}
    </div>
  );
}