import { useQuery } from "@tanstack/react-query";
import { EmployerService } from "../services/employerService";
import type { JobResponse } from "../types/employer";

interface SavedCandidateResponse {
  id: number;
}

interface MappedJob {
  id: number;
  title: string;
  type: string;
  remaining: string;
  status: string;
  applications: number;
}

const getRemainingDays = (expiresAt: string): string => {
  const diffTime = new Date(expiresAt).getTime() - new Date().getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays <= 0) return "Expired";
  return `${diffDays} days remaining`;
};

export const useEmployerDashboard = () => {
  return useQuery({
    queryKey: ["employerDashboard"],
    queryFn: async () => {
      const jobs: JobResponse[] = await EmployerService.getRecentJobs();
      const saved: { data: SavedCandidateResponse[] } =
        await EmployerService.getSavedCandidates();

      const mappedJobs: MappedJob[] = jobs.map((job) => ({
        id: job.id,
        title: job.title,
        type: job.employmentType.replace("_", " "),
        remaining: getRemainingDays(job.expiresAt),
        status: job.status === "OPEN" ? "Active" : "Expired",
        applications: 0,
      }));

      return {
        jobs: mappedJobs,
        savedCandidates: saved.data?.length || 0,
      };
    },
  });
};
