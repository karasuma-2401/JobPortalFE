import { useState, useEffect, useCallback } from "react";
import { JobseekerService } from "../../../../services/jobseekerService";
import type { EmployerDetail, Job } from "../../../../types/jobseeker";

export function useEmployerDetail(employerId: string) {
  const [employerData, setEmployerData] = useState<EmployerDetail | null>(null);
  const [openJobs, setOpenJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEmployerDetail = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [detailData, jobsData] = await Promise.all([
        JobseekerService.getEmployerDetail(employerId),
        JobseekerService.getJobsByEmployer(employerId),
      ]);
      setEmployerData(detailData);
      setOpenJobs(jobsData);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Failed to fetch employer details");
      } else {
        setError("Failed to fetch employer details");
      }
    } finally {
      setLoading(false);
    }
  }, [employerId]);

  useEffect(() => {
    fetchEmployerDetail();
  }, [fetchEmployerDetail]);

  return {
    employerData,
    openJobs,
    loading,
    error,
  };
}
