import { privateApi } from "../api/api";
import type {
  Job,
  JobDetailType,
  Employer,
  EmployerDetail,
  JobFilterParams,
  EmployerFilterParams,
  ApplyJobRequest,
  AppliedJobType,
  FavoriteJobType,
  JobAlertItemType,
  DashboardOverviewType,
} from "../types/jobseeker";

export const JobseekerService = {
  // Favorite
  getFavoriteJobIds: async (): Promise<string[]> => {
    return privateApi.get("/job-seeker/favorite-job-ids");
  },

  toggleFavoriteJob: async (jobId: string): Promise<void> => {
    return privateApi.post("/job-seeker/favorite-jobs/toggle", { jobId });
  },

  // Jobs
  getJobs: async (
    params: JobFilterParams
  ): Promise<{ items: Job[]; totalCount: number }> => {
    return privateApi.get("/jobs", { params });
  },

  getJobDetail: async (id: string): Promise<JobDetailType> => {
    return privateApi.get(`/jobs/${id}`);
  },

  applyJob: async (payload: ApplyJobRequest): Promise<void> => {
    return privateApi.post("/job-application", payload);
  },

  // Employers
  getEmployers: async (
    params: EmployerFilterParams
  ): Promise<{ items: Employer[]; totalCount: number }> => {
    return privateApi.get("/employers", { params });
  },

  getEmployerDetail: async (id: string): Promise<EmployerDetail> => {
    return privateApi.get(`/employers/${id}`);
  },

  getJobsByEmployer: async (employerId: string): Promise<Job[]> => {
    return privateApi.get(`/employers/${employerId}/jobs`);
  },

  // Dashboard
  getDashboardOverview: async (): Promise<DashboardOverviewType> => {
    return privateApi.get("/job-seeker/statistics");
  },

  // Applied Jobs
  getAppliedJobs: async (
    page: number,
    limit: number
  ): Promise<{ items: AppliedJobType[]; totalCount: number }> => {
    return privateApi.get("/job-seeker/applied-jobs", {
      params: { page, limit },
    });
  },

  // Favorite Jobs
  getFavoriteJobs: async (
    page: number,
    limit: number
  ): Promise<{ items: FavoriteJobType[]; totalCount: number }> => {
    return privateApi.get("/job-seeker/favorite-jobs", {
      params: { page, limit },
    });
  },

  // Job Alerts
  getJobAlerts: async (
    page: number,
    limit: number
  ): Promise<{ items: JobAlertItemType[]; totalCount: number }> => {
    return privateApi.get("/job-seeker/job-alerts", {
      params: { page, limit },
    });
  },
};