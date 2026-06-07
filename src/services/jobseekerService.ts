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
import { JobseekerStorageService } from "./jobseekerStorageService";

export class JobseekerService {
  // Favorite simulator
  static async getFavoriteJobIds(): Promise<string[]> {
    try {
      // Khi có API thật:
      // const res = await privateApi.get<unknown, ApiResponse<string[]>>("/jobseeker/favorite-job-ids");
      // if (res.isSuccess && res.value) return res.value;
      
      console.log("[JobseekerService] Calling GET /api/jobseeker/favorite-job-ids");
      return await JobseekerStorageService.getFavoriteJobIds();
    } catch (error) {
      console.warn("API error, using mock data for favorite job ids", error);
      return await JobseekerStorageService.getFavoriteJobIds();
    }
  }

  static async toggleFavoriteJob(jobId: string): Promise<void> {
    try {
      // Khi có API thật:
      // await privateApi.post<unknown, ApiResponse<void>>(`/jobseeker/favorite-jobs/toggle`, { jobId });
      
      console.log(`[JobseekerService] Calling POST /api/jobseeker/favorite-jobs/toggle for ${jobId}`);
      await JobseekerStorageService.toggleFavoriteJob(jobId);
    } catch (error) {
      console.warn("API error, toggling favorite job in mock storage", error);
      await JobseekerStorageService.toggleFavoriteJob(jobId);
    }
  }

  // 1. Lấy danh sách việc làm (có Filter Nâng Cao)
  static async getJobs(params: JobFilterParams): Promise<{ items: Job[]; totalCount: number }> {
    try {
      console.log("[JobseekerService] Calling GET /api/jobs with params:", params);
      // Khi có API thật:
      // const res = await privateApi.get<unknown, ApiResponse<{ items: Job[]; totalCount: number }>>("/jobs", { params });
      // if (res.isSuccess && res.value) return res.value;
      
      return JobseekerStorageService.getFilteredJobs(params);
    } catch (error) {
      console.warn("API error, using mock data for jobs", error);
      return JobseekerStorageService.getFilteredJobs(params);
    }
  }

  // 2. Lấy chi tiết công việc
  static async getJobDetail(id: string): Promise<JobDetailType> {
    try {
      console.log(`[JobseekerService] Calling GET /api/jobs/${id}`);
      // Khi có API thật:
      // const res = await privateApi.get<unknown, ApiResponse<JobDetailType>>(`/jobs/${id}`);
      // if (res.isSuccess && res.value) return res.value;

      return JobseekerStorageService.getMockJobDetail(id);
    } catch (error) {
      console.warn("API error, using mock data for detail", error);
      return JobseekerStorageService.getMockJobDetail(id);
    }
  }

  // 3. Ứng tuyển công việc
  static async applyJob(payload: ApplyJobRequest): Promise<void> {
    const response = await privateApi.post<unknown, ApiResponse<void>>("/applications", payload)
      .catch((/* offline */ _err: unknown) => {
        void _err;
        console.log(
          "[JobseekerService mock] API /applications offline, simulating success:",
          payload
        );
        return { isSuccess: true, value: undefined, errorMessage: "" };
      });
    if (!response.isSuccess) {
      throw new Error(response.errorMessage || "Failed to submit application");
    }
    
    // Lưu vào LocalStorage thông qua Storage Service
    JobseekerStorageService.saveAppliedJob(payload.jobId);
  }

  // 4. Lấy danh sách nhà tuyển dụng
  static async getEmployers(params: EmployerFilterParams): Promise<{ items: Employer[]; totalCount: number }> {
    try {
      console.log("[JobseekerService] Calling GET /api/employers with params:", params);
      // Khi có API thật:
      // const res = await privateApi.get<unknown, ApiResponse<{ items: Employer[]; totalCount: number }>>("/employers", { params });
      // if (res.isSuccess && res.value) return res.value;

      return JobseekerStorageService.getFilteredEmployers(params);
    } catch (error) {
      console.warn("API error, using mock data for employers", error);
      return JobseekerStorageService.getFilteredEmployers(params);
    }
  }

  // 5. Lấy chi tiết nhà tuyển dụng
  static async getEmployerDetail(id: string): Promise<EmployerDetail> {
    try {
      console.log(`[JobseekerService] Calling GET /api/employers/${id}`);
      // Khi có API thật:
      // const res = await privateApi.get<unknown, ApiResponse<EmployerDetail>>(`/employers/${id}`);
      // if (res.isSuccess && res.value) return res.value;

      return JobseekerStorageService.getMockEmployerDetail(id);
    } catch (error) {
      console.warn("API error, using mock data for employer detail", error);
      return JobseekerStorageService.getMockEmployerDetail(id);
    }
  }

  // 6. Lấy các công việc của một nhà tuyển dụng
  static async getJobsByEmployer(employerId: string): Promise<Job[]> {
    try {
      console.log(`[JobseekerService] Fetching jobs for employer: ${employerId}`);
      // Khi có API thật:
      // const res = await privateApi.get<unknown, ApiResponse<Job[]>>(`/employers/${employerId}/jobs`);
      // if (res.isSuccess && res.value) return res.value;

      return [
        { id: "j1", title: "Visual Designer", companyName: "Twitter", type: "Full Time", salary: "$10K-$15K", location: "China", isFeatured: true, daysRemaining: "4 Days Remaining", logo: "https://logo.clearbit.com/twitter.com" },
        { id: "j2", title: "Front End Developer", companyName: "Twitter", type: "Contract Base", salary: "$50K-$80K", location: "Australia", isFeatured: false, daysRemaining: "2 Days Remaining", logo: "https://logo.clearbit.com/twitter.com" },
        { id: "j3", title: "Technical Support", companyName: "Twitter", type: "Full Time", salary: "$35K-$40K", location: "France", isFeatured: false, daysRemaining: "1 Week Remaining", logo: "https://logo.clearbit.com/twitter.com" },
      ];
    } catch {
      return [];
    }
  }

  // 7. Lấy dữ liệu tổng quan Dashboard (Overview)
  static async getDashboardOverview(): Promise<DashboardOverviewType> {
    try {
      // Khi có API thật:
      // const res = await privateApi.get<unknown, ApiResponse<DashboardOverviewType>>("/jobseeker/dashboard/overview");
      // if (res.isSuccess && res.value) return res.value;
      
      console.log("[JobseekerService] Calling GET /api/jobseeker/dashboard/overview");
      return JobseekerStorageService.getDashboardOverview();
    } catch (error) {
      console.warn("API error, using storage for dashboard overview", error);
      return JobseekerStorageService.getDashboardOverview();
    }
  }

  // 8. Lấy danh sách việc làm đã ứng tuyển (Applied Jobs)
  static async getAppliedJobs(page: number, limit: number): Promise<{ items: AppliedJobType[]; totalCount: number }> {
    try {
      console.log("[JobseekerService] Calling GET /api/jobseeker/applied-jobs");
      // Khi có API thật:
      // const res = await privateApi.get<unknown, ApiResponse<{ items: AppliedJobType[]; totalCount: number }>>("/jobseeker/applied-jobs", { params: { page, limit } });
      // if (res.isSuccess && res.value) return res.value;

      const all = JobseekerStorageService.readAppliedJobs();
      const start = (page - 1) * limit;
      return {
        items: all.slice(start, start + limit),
        totalCount: all.length,
      };
    } catch (error) {
      console.warn("API error, using mock data for applied jobs", error);
      const fallback = JobseekerStorageService.readAppliedJobs();
      return { items: fallback, totalCount: fallback.length };
    }
  }

  // 9. Lấy danh sách việc làm yêu thích (Favorite Jobs)
  static async getFavoriteJobs(page: number, limit: number): Promise<{ items: FavoriteJobType[]; totalCount: number }> {
    try {
      console.log("[JobseekerService] Calling GET /api/jobseeker/favorite-jobs");
      // Khi có API thật:
      // const res = await privateApi.get<unknown, ApiResponse<{ items: FavoriteJobType[]; totalCount: number }>>("/jobseeker/favorite-jobs", { params: { page, limit } });
      // if (res.isSuccess && res.value) return res.value;

      const all = JobseekerStorageService.readFavoriteJobs();
      const start = (page - 1) * limit;
      return {
        items: all.slice(start, start + limit),
        totalCount: all.length,
      };
    } catch (error) {
      console.warn("API error, using mock data for favorite jobs", error);
      const fallback = JobseekerStorageService.readFavoriteJobs();
      return { items: fallback, totalCount: fallback.length };
    }
  }

  // 10. Lấy danh sách thông báo việc làm (Job Alerts)
  static async getJobAlerts(page: number, limit: number): Promise<{ items: JobAlertItemType[]; totalCount: number }> {
    try {
      // Khi có API thật:
      // const res = await privateApi.get<unknown, ApiResponse<{ items: JobAlertItemType[]; totalCount: number }>>("/jobseeker/job-alerts", { params: { page, limit } });
      // if (res.isSuccess && res.value) return res.value;
      console.log("[JobseekerService] Calling GET /api/jobseeker/job-alerts");
      const alerts = JobseekerStorageService.getMockJobAlerts();
      const start = (page - 1) * limit;
      return {
        items: alerts.slice(start, start + limit),
        totalCount: alerts.length,
      };
    } catch (error) {
      console.warn("API error, using mock data for job alerts", error);
      const alerts = JobseekerStorageService.getMockJobAlerts();
      return { items: alerts, totalCount: alerts.length };
    }
  }
}