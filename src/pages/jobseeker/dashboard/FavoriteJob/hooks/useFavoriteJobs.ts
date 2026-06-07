import { useState, useEffect, useCallback } from "react";
import { JobseekerService } from "../../../../../services/jobseekerService";
import type { FavoriteJobType } from "../../../../../types/jobseeker";

export function useFavoriteJobs() {
  const [favoriteJobs, setFavoriteJobs] = useState<FavoriteJobType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);

  const fetchFavoriteJobs = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await JobseekerService.getFavoriteJobs(currentPage, itemsPerPage);
      setFavoriteJobs(result.items);
      setTotalCount(result.totalCount);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Failed to load favorite jobs");
      } else {
        setError("Failed to load favorite jobs");
      }
    } finally {
      setLoading(false);
    }
  }, [currentPage, itemsPerPage]);

  useEffect(() => {
    fetchFavoriteJobs();
  }, [fetchFavoriteJobs]);

  const handlePageChange = useCallback((pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleRemoveFavorite = useCallback(async (jobId: string) => {
    try {
      await JobseekerService.toggleFavoriteJob(jobId);
      await fetchFavoriteJobs();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Failed to remove favorite");
      } else {
        setError("Failed to remove favorite");
      }
    }
  }, [fetchFavoriteJobs]);

  const handleApplyJob = useCallback(async (jobId: string, resumeId: string, coverLetter: string) => {
    try {
      await JobseekerService.applyJob({
        jobId,
        resumeId,
        coverLetter,
      });
    } catch (err: unknown) {
      if (err instanceof Error) {
        throw new Error(err.message || "Failed to apply");
      } else {
        throw new Error("Failed to apply");
      }
    }
  }, []);

  const totalPages = Math.max(1, Math.ceil(totalCount / itemsPerPage));

  return {
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
  };
}
