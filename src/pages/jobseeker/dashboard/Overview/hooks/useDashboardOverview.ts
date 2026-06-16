import { useState, useEffect, useCallback } from "react";
import { JobseekerService } from "../../../../../services/jobseekerService";
import type { AppliedJobType } from "../../../../../types/jobseeker";

export function useDashboardOverview() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [stats, setStats] = useState({
    appliedCount: 0,
    favoriteCount: 0,
    alertCount: 0,
  });
  
  const [recentApplied, setRecentApplied] = useState<AppliedJobType[]>([]);
  const [isProfileCompleted, setIsProfileCompleted] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);

  const fetchOverviewData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await JobseekerService.getDashboardOverview();
      setStats({
        appliedCount: data.appliedCount,
        favoriteCount: data.favoriteCount,
        alertCount: data.alertCount,
      });
      setRecentApplied(data.recentApplied);
      setIsProfileCompleted(data.ProfileCompleted);
      
      // Chọn mặc định công việc đầu tiên nếu có
      if (data.recentApplied.length > 0) {
        setSelectedJobId(data.recentApplied[data.recentApplied.length - 1].id);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Failed to load dashboard overview");
      } else {
        setError("Failed to load dashboard overview");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOverviewData();
  }, [fetchOverviewData]);

  return {
    loading,
    error,
    stats,
    recentApplied,
    isProfileCompleted,
    selectedJobId,
    setSelectedJobId,
  };
}
