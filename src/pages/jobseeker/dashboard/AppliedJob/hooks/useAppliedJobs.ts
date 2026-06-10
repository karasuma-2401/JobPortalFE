import { useState, useEffect, useCallback } from "react";
import { JobseekerService } from "../../../../../services/jobseekerService";
import type { AppliedJobType } from "../../../../../types/jobseeker";

export function useAppliedJobs() {
  const [appliedJobs, setAppliedJobs] = useState<AppliedJobType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);

  const fetchAppliedJobs = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await JobseekerService.getAppliedJobs(currentPage, itemsPerPage);
      console.log("Applied jobs: " , result.items) 
      setAppliedJobs(result.items);
      setTotalCount(result.totalCount);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Failed to load applied jobs");
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  }, [currentPage, itemsPerPage]);

  useEffect(() => {
    fetchAppliedJobs();
  }, [fetchAppliedJobs]);

  const handlePageChange = useCallback((pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const totalPages = Math.max(1, Math.ceil(totalCount / itemsPerPage));

  return {
    appliedJobs,
    loading,
    error,
    totalCount,
    currentPage,
    selectedJobId,
    setSelectedJobId,
    totalPages,
    handlePageChange,
  };
}
