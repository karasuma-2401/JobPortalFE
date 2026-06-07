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
  Resume
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
    return privateApi.get("/jobpost", { params });
  },

  getJobDetail: async (id: string): Promise<JobDetailType> => {
    return privateApi.get(`/jobpost/${id}`);
  },

  applyJob: async (payload: ApplyJobRequest): Promise<void> => {
    return privateApi.post("/job-application", payload);
  },

  // Employers
  getEmployers: async (
    params: EmployerFilterParams
  ): Promise<{ items: Employer[]; totalCount: number }> => {
    return privateApi.get("/employer", { params });
  },

  getEmployerDetail: async (id: string): Promise<EmployerDetail> => {
    return privateApi.get(`/employer/${id}`);
  },

  getJobsByEmployer: async (employerId: string): Promise<Job[]> => {
    return privateApi.get(`/employer/${employerId}/jobs`);
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
    const offset = (page - 1) * limit; 
    
    return privateApi.get("/job-application", {
      params: { offset, limit },
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
    const offset = (page - 1) * limit;
    return privateApi.get("/jobpost", {
      params: { offset, limit },
    });
  },
  getMyResumes: async (): Promise<Resume[]> => {
        try {
            return privateApi.get("/job-seeker/resume")
            
        } catch (error) {
            console.error("Lỗi khi lấy danh sách CV:", error);
            throw error;
        }
    },
};