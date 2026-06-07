import { useState, useEffect, useCallback } from "react";
import { JobseekerService } from "../../../../../services/jobseekerService";
import type { JobAlertItemType } from "../../../../../types/jobseeker";

export function useJobAlerts() {
  const [jobAlerts, setJobAlerts] = useState<JobAlertItemType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);

  const fetchJobAlerts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await JobseekerService.getJobAlerts(currentPage, itemsPerPage);
      setJobAlerts(result.items);
      setTotalCount(result.totalCount);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Failed to load job alerts");
      } else {
        setError("Failed to load job alerts");
      }
    } finally {
      setLoading(false);
    }
  }, [currentPage, itemsPerPage]);

  useEffect(() => {
    fetchJobAlerts();
  }, [fetchJobAlerts]);

  const handlePageChange = useCallback((pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const totalPages = Math.max(1, Math.ceil(totalCount / itemsPerPage));

  return {
    jobAlerts,
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
