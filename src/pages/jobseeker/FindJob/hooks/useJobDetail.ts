import { useState, useEffect, useCallback } from "react";
import { JobseekerService } from "../../../../services/jobseekerService";
import type { JobDetailType } from "../../../../types/jobseeker";

export function useJobDetail(jobId: string) {
  const [jobData, setJobData] = useState<JobDetailType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const fetchJobDetail = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await JobseekerService.getJobDetail(jobId);
      setJobData(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Failed to fetch job details");
      } else {
        setError("Failed to fetch job details");
      }
    } finally {
      setLoading(false);
    }
  }, [jobId]);

  const checkSaved = useCallback(async () => {
    try {
      const savedIds = await JobseekerService.getFavoriteJobIds();
      setIsSaved(savedIds.includes(jobId));
    } catch (err) {
      console.error("Failed to check saved status:", err);
    }
  }, [jobId]);

  useEffect(() => {
    fetchJobDetail();
    checkSaved();
  }, [fetchJobDetail, checkSaved]);

  const handleToggleSave = useCallback(async () => {
    try {
      await JobseekerService.toggleFavoriteJob(jobId);
      await checkSaved();
    } catch (err) {
      console.error("Failed to toggle favorite:", err);
    }
  }, [jobId, checkSaved]);

  const handleApplySubmit = useCallback(async (data: { resumeId: string; coverLetter: string }) => {
    if (!jobData) return;



    try {
      await JobseekerService.applyJob({
        jobId: jobData.id,
        resumeId: data.resumeId,
        coverLetter: data.coverLetter,
      });
      setIsApplyModalOpen(false);
      alert(`Ứng tuyển thành công vị trí: ${jobData.title}`);
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert(`Ứng tuyển thất bại: ${err.message}`);
      } else {
        alert(`Ứng tuyển thất bại: ${"An unknown error occurred"}`);
      }
    }
  }, [jobData]);

  return {
    jobData,
    loading,
    error,
    isApplyModalOpen,
    setIsApplyModalOpen,
    isSaved,
    handleToggleSave,
    handleApplySubmit,
  };
}
