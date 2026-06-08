import { privateApi, publicApi } from '../api/api';
import type {
    ApiResponse,
    ApplyJobRequest,
    AppliedJobType,
    DashboardOverviewType,
    Employer,
    EmployerDetail,
    EmployerFilterParams,
    FavoriteJobType,
    Job,
    JobAlertItemType,
    JobDetailType,
    JobFilterParams,
    JobSeekerProfile,
    PagedResponse,
    Resume,
} from '../types/jobseeker';

const MULTIPART_HEADERS = {
    'Content-Type': 'multipart/form-data',
};

export const JobseekerService = {
    getProfile: async (): Promise<JobSeekerProfile> => {
        return privateApi.get('/job-seeker');
    },

    createProfile: async (formData: FormData): Promise<JobSeekerProfile> => {
        return privateApi.post('/job-seeker', formData, {
            headers: MULTIPART_HEADERS,
        });
    },

    updateProfile: async (formData: FormData): Promise<JobSeekerProfile> => {
        return privateApi.patch('/job-seeker', formData, {
            headers: MULTIPART_HEADERS,
        });
    },

    getFavoriteJobIds: async (): Promise<string[]> => {
        const page = (await privateApi.get('/job-seeker/saved-jobs', {
            params: { offset: 0, limit: 100 },
        })) as ApiResponse<PagedResponse<FavoriteJobType>>;

        return page.data.items.map((job) => job.id);
    },

    toggleFavoriteJob: async (jobId: string): Promise<void> => {
        await privateApi.post(`/job-seeker/saved-jobs/${jobId}/toggle`);
    },

    getJobs: async (params: JobFilterParams): Promise<PagedResponse<Job>> => {
        const { page, limit, ...filters } = params;
        const offset = (page - 1) * limit;
        const response = (await publicApi.get('/jobpost', {
            params: {
                ...filters,
                offset,
                limit,
            },
        })) as ApiResponse<PagedResponse<Job>>;

        return response.data;
    },

    getJobDetail: async (id: string): Promise<JobDetailType> => {
        return publicApi.get(`/jobpost/${id}`);
    },

    applyJob: async (payload: ApplyJobRequest): Promise<void> => {
        await privateApi.post('/job-seeker/apply', {
            jobId: Number(payload.jobId),
            resumeId: Number(payload.resumeId),
            coverLetter: payload.coverLetter,
        });
    },

    getEmployers: async (
        params: EmployerFilterParams
    ): Promise<{ items: Employer[]; totalCount: number }> => {
        return publicApi.get('/employer', { params });
    },

    getEmployerDetail: async (id: string): Promise<EmployerDetail> => {
        return publicApi.get(`/employer/${id}`);
    },

    getJobsByEmployer: async (employerId: string): Promise<Job[]> => {
        return publicApi.get(`/employer/${employerId}/jobs`);
    },

    getDashboardOverview: async (): Promise<DashboardOverviewType> => {
        const response = (await privateApi.get(
            '/job-seeker/statistics'
        )) as ApiResponse<DashboardOverviewType>;

        return response.data;
    },

    getAppliedJobs: async (
        page: number,
        limit: number
    ): Promise<{ items: AppliedJobType[]; totalCount: number }> => {
        const offset = (page - 1) * limit;
        const response = (await privateApi.get('/job-seeker/applications', {
            params: { offset, limit },
        })) as ApiResponse<PagedResponse<AppliedJobType>>;

        return {
            items: response.data.items,
            totalCount: response.data.totalItems,
        };
    },

    getFavoriteJobs: async (
        page: number,
        limit: number
    ): Promise<{ items: FavoriteJobType[]; totalCount: number }> => {
        const offset = (page - 1) * limit;
        const response = (await privateApi.get('/job-seeker/saved-jobs', {
            params: { offset, limit },
        })) as ApiResponse<PagedResponse<FavoriteJobType>>;

        return {
            items: response.data.items,
            totalCount: response.data.totalItems,
        };
    },

    getJobAlerts: async (
        page: number,
        limit: number
    ): Promise<{ items: JobAlertItemType[]; totalCount: number }> => {
        const offset = (page - 1) * limit;
        const response = (await privateApi.get('/job-seeker/alerts', {
            params: { offset, limit },
        })) as ApiResponse<PagedResponse<JobAlertItemType>>;

        return {
            items: response.data.items,
            totalCount: response.data.totalItems,
        };
    },

    getMyResumes: async (): Promise<Resume[]> => {
        return privateApi.get('/resumes/me');
    },

    uploadResume: async (
        file: File,
        fileName: string,
        isDefault?: boolean
    ): Promise<Resume> => {
        const formData = new FormData();

        formData.append('file', file);
        formData.append('fileName', fileName);

        return privateApi.post('/resumes/upload', formData, {
            params:
                typeof isDefault === 'boolean'
                    ? { isDefault }
                    : undefined,
            headers: MULTIPART_HEADERS,
        });
    },

    renameResume: async (resumeId: string, fileName: string): Promise<void> => {
        await privateApi.patch(`/resumes/${resumeId}/name`, { fileName });
    },

    setDefaultResume: async (resumeId: string): Promise<void> => {
        await privateApi.patch(`/resumes/${resumeId}/default`);
    },

    deleteResume: async (resumeId: string): Promise<void> => {
        await privateApi.delete(`/resumes/${resumeId}`);
    },
};
