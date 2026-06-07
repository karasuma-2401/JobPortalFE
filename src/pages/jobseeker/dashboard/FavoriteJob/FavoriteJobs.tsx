import { useState } from "react";
import FavoriteJobItem from "./FavoriteJobItem";
import DashboardPagination from "../../../../components/ui/DashboardPagination";
import ApplyJobModal from "../../FindJob/components/ApplyJobModal";
import { useFavoriteJobs } from "./hooks/useFavoriteJobs";

export default function FavoriteJobsPage() {
  const {
    favoriteJobs,
    loading,
    error,
    totalCount,
    currentPage,
    selectedJobId,
    setSelectedJobId,
    totalPages,
    handlePageChange,
    handleRemoveFavorite,
    handleApplyJob,
  } = useFavoriteJobs();

  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [applyJobId, setApplyJobId] = useState("");
  const [applyJobTitle, setApplyJobTitle] = useState("");

  const handleApplyClick = (id: string) => {
    const job = favoriteJobs.find((j) => j.id === id);
    if (job) {
      setApplyJobId(job.id);
      setApplyJobTitle(job.role);
      setIsApplyModalOpen(true);
    }
  };

  const handleApplySubmit = async (data: { resumeId: string; coverLetter: string }) => {
    try {
      await handleApplyJob(applyJobId, data.resumeId, data.coverLetter);
      setIsApplyModalOpen(false);
      alert(`Ứng tuyển thành công vị trí: ${applyJobTitle}`);
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert(`Ứng tuyển thất bại: ${err.message}`);
      } else {
        alert(`Ứng tuyển thất bại: ${"An unknown error occurred"}`);
      }
    }
  };

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
      <div className="flex items-center gap-2 pb-4">
        <h1 className="text-[18px] font-bold text-gray-900">Favorite Jobs</h1>
        <span className="text-[15px] font-medium text-gray-400">({totalCount})</span>
      </div>

      <div className="flex flex-col gap-4">
        {favoriteJobs.length === 0 ? (
          <div className="text-center py-20 bg-white border border-gray-100 rounded-xl">
            <p className="text-[15px] text-gray-400">You haven't saved any favorite jobs yet.</p>
          </div>
        ) : (
          favoriteJobs.map((job) => (
            <FavoriteJobItem
              key={job.id}
              id={job.id}
              logo={job.logo}
              role={job.role}
              type={job.type}
              location={job.location}
              salary={job.salary}
              timeStatus={job.timeStatus}
              isExpired={job.isExpired}
              isSelected={selectedJobId === job.id}
              onSelect={() => setSelectedJobId(job.id)}
              onBookmarkClick={handleRemoveFavorite}
              onApplyClick={handleApplyClick}
            />
          ))
        )}
      </div>

      {favoriteJobs.length > 0 && (
        <DashboardPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}

      <ApplyJobModal
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
        jobTitle={applyJobTitle}
        onSubmit={handleApplySubmit}
      />
    </div>
  );
}