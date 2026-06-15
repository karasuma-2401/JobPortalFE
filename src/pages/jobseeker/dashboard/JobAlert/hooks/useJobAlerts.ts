import { useState, useEffect, useCallback } from "react";
import { JobseekerService } from "../../../../../services/jobseekerService";
import type { Job } from "../../../../../types/jobseeker";

export function useJobAlerts() {
  const [recentJobs, setRecentJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const fetchRecentJobs = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await JobseekerService.getRecentJobs(currentPage, itemsPerPage);
      setRecentJobs(result.items);
      setTotalCount(result.totalCount);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Failed to load recent jobs");
      } else {
        setError("Failed to load recent jobs");
      }
    } finally {
      setLoading(false);
    }
  }, [currentPage, itemsPerPage]);

  useEffect(() => {
    fetchRecentJobs();
  }, [fetchRecentJobs]);

  const handlePageChange = useCallback((pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const totalPages = Math.max(1, Math.ceil(totalCount / itemsPerPage));

  return {
    recentJobs,
    loading,
    error,
    totalCount,
    currentPage,
    totalPages,
    handlePageChange,
  };
}
