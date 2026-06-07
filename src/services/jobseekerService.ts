import { privateApi } from "../api/api";
import type { ApiResponse } from "../types/auth";
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
  // Favorite simulator
  getFavoriteJobIds: async (): Promise<string[]> => {
    console.log("[JobseekerService] Calling GET /jobseeker/favorite-job-ids");
    const res = await privateApi.get<unknown, ApiResponse<string[]>>("/jobseeker/favorite-job-ids");
    if (res.isSuccess && res.value) return res.value;
    throw new Error(res.errorMessage || "Failed to fetch favorite job ids");
  },

  toggleFavoriteJob: async (jobId: string): Promise<void> => {
    console.log(`[JobseekerService] Calling POST /jobseeker/favorite-jobs/toggle for ${jobId}`);
    const res = await privateApi.post<unknown, ApiResponse<void>>("/jobseeker/favorite-jobs/toggle", { jobId });
    if (!res.isSuccess) {
      throw new Error(res.errorMessage || "Failed to toggle favorite job");
    }
  },

  // 1. Lấy danh sách việc làm (có Filter Nâng Cao)
  getJobs: async (params: JobFilterParams): Promise<{ items: Job[]; totalCount: number }> => {
    console.log("[JobseekerService] Calling GET /jobs with params:", params);
    const res = await privateApi.get<unknown, ApiResponse<{ items: Job[]; totalCount: number }>>("/jobs", { params });
    if (res.isSuccess && res.value) return res.value;
    throw new Error(res.errorMessage || "Failed to fetch jobs");
  },

  // 2. Lấy chi tiết công việc
  getJobDetail: async (id: string): Promise<JobDetailType> => {
    console.log(`[JobseekerService] Calling GET /jobs/${id}`);
    const res = await privateApi.get<unknown, ApiResponse<JobDetailType>>(`/jobs/${id}`);
    if (res.isSuccess && res.value) return res.value;
    throw new Error(res.errorMessage || "Failed to fetch job detail");
  },

  // 3. Ứng tuyển công việc
  applyJob: async (payload: ApplyJobRequest): Promise<void> => {
    console.log("[JobseekerService] Calling POST /applications with payload:", payload);
    const res = await privateApi.post<unknown, ApiResponse<void>>("/applications", payload);
    if (!res.isSuccess) {
      throw new Error(res.errorMessage || "Failed to submit application");
    }
  },

  // 4. Lấy danh sách nhà tuyển dụng
  getEmployers: async (params: EmployerFilterParams): Promise<{ items: Employer[]; totalCount: number }> => {
    console.log("[JobseekerService] Calling GET /employers with params:", params);
    const res = await privateApi.get<unknown, ApiResponse<{ items: Employer[]; totalCount: number }>>("/employers", { params });
    if (res.isSuccess && res.value) return res.value;
    throw new Error(res.errorMessage || "Failed to fetch employers");
  },

  // 5. Lấy chi tiết nhà tuyển dụng
  getEmployerDetail: async (id: string): Promise<EmployerDetail> => {
    console.log(`[JobseekerService] Calling GET /employers/${id}`);
    const res = await privateApi.get<unknown, ApiResponse<EmployerDetail>>(`/employers/${id}`);
    if (res.isSuccess && res.value) return res.value;
    throw new Error(res.errorMessage || "Failed to fetch employer detail");
  },

  // 6. Lấy các công việc của một nhà tuyển dụng
  getJobsByEmployer: async (employerId: string): Promise<Job[]> => {
    console.log(`[JobseekerService] Calling GET /employers/${employerId}/jobs`);
    const res = await privateApi.get<unknown, ApiResponse<Job[]>>(`/employers/${employerId}/jobs`);
    if (res.isSuccess && res.value) return res.value;
    throw new Error(res.errorMessage || "Failed to fetch jobs by employer");
  },

  // 7. Lấy dữ liệu tổng quan Dashboard (Overview)
  getDashboardOverview: async (): Promise<DashboardOverviewType> => {
    console.log("[JobseekerService] Calling GET /jobseeker/dashboard/overview");
    const res = await privateApi.get<unknown, ApiResponse<DashboardOverviewType>>("/jobseeker/dashboard/overview");
    if (res.isSuccess && res.value) return res.value;
    throw new Error(res.errorMessage || "Failed to fetch dashboard overview");
  },

  // 8. Lấy danh sách việc làm đã ứng tuyển (Applied Jobs)
  getAppliedJobs: async (page: number, limit: number): Promise<{ items: AppliedJobType[]; totalCount: number }> => {
    console.log(`[JobseekerService] Calling GET /jobseeker/applied-jobs with page: ${page}, limit: ${limit}`);
    const res = await privateApi.get<unknown, ApiResponse<{ items: AppliedJobType[]; totalCount: number }>>("/jobseeker/applied-jobs", { params: { page, limit } });
    if (res.isSuccess && res.value) return res.value;
    throw new Error(res.errorMessage || "Failed to fetch applied jobs");
  },

  // 9. Lấy danh sách việc làm yêu thích (Favorite Jobs)
  getFavoriteJobs: async (page: number, limit: number): Promise<{ items: FavoriteJobType[]; totalCount: number }> => {
    console.log(`[JobseekerService] Calling GET /jobseeker/favorite-jobs with page: ${page}, limit: ${limit}`);
    const res = await privateApi.get<unknown, ApiResponse<{ items: FavoriteJobType[]; totalCount: number }>>("/jobseeker/favorite-jobs", { params: { page, limit } });
    if (res.isSuccess && res.value) return res.value;
    throw new Error(res.errorMessage || "Failed to fetch favorite jobs");
  },

  // 10. Lấy danh sách thông báo việc làm (Job Alerts)
  getJobAlerts: async (page: number, limit: number): Promise<{ items: JobAlertItemType[]; totalCount: number }> => {
    console.log(`[JobseekerService] Calling GET /jobseeker/job-alerts with page: ${page}, limit: ${limit}`);
    const res = await privateApi.get<unknown, ApiResponse<{ items: JobAlertItemType[]; totalCount: number }>>("/jobseeker/job-alerts", { params: { page, limit } });
    if (res.isSuccess && res.value) return res.value;
    throw new Error(res.errorMessage || "Failed to fetch job alerts");
  }
};