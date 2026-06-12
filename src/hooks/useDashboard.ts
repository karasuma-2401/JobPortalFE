import { useQuery } from '@tanstack/react-query';
import { EmployerService } from '../services/employerService';
import type { JobResponse } from '../types/employer';

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

interface DashboardStatistics {
    totalJobs: number;
    totalApplicants: number;
}

const getRemainingDays = (expiresAt: string): string => {
    const diffTime = new Date(expiresAt).getTime() - new Date().getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays <= 0) return 'Expired';
    return `${diffDays} days remaining`;
};

export const useEmployerDashboard = () => {
    return useQuery({
        queryKey: ['employerDashboard'],
        queryFn: async () => {
            const [jobsResponse, savedResponse, statsResponse] =
                await Promise.all([
                    EmployerService.getRecentJobs(),
                    EmployerService.getSavedCandidates(),
                    EmployerService.getStatistics(),
                ]);
            const safeJobsRes = jobsResponse as unknown as Record<
                string,
                unknown
            >;
            const jobsData = safeJobsRes?.data as
                | Record<string, unknown>
                | undefined;

            const jobsList: JobResponse[] =
                (jobsData?.items as JobResponse[]) ||
                (safeJobsRes?.data as JobResponse[]) ||
                (jobsResponse as JobResponse[]) ||
                [];

            const safeSavedRes = savedResponse as unknown as Record<
                string,
                unknown
            >;
            const savedList: SavedCandidateResponse[] =
                (safeSavedRes?.data as SavedCandidateResponse[]) || [];

            const safeStatsRes = statsResponse as unknown as Record<
                string,
                unknown
            >;
            const statsData: DashboardStatistics =
                (safeStatsRes?.data as DashboardStatistics) || {
                    totalJobs: 0,
                    totalApplicants: 0,
                };

            const mappedJobs: MappedJob[] = jobsList.map(
                (job: JobResponse) => ({
                    id: job.id,
                    title: job.title,
                    type: job.employmentType
                        ? job.employmentType.replace('_', ' ')
                        : 'N/A',
                    remaining: job.expiresAt
                        ? getRemainingDays(job.expiresAt)
                        : 'N/A',
                    status:
                        job.status === 'OPEN' || job.status === 'ACTIVE'
                            ? 'Active'
                            : 'Expired',
                    applications: 0,
                })
            );

            return {
                jobs: mappedJobs,
                savedCandidates: savedList.length || 0,
                statistics: statsData,
            };
        },
    });
};
