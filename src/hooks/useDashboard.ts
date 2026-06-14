// src/hooks/useDashboard.ts
import { useQuery } from '@tanstack/react-query';
import { EmployerService } from '../services/employerService';

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
    totalSavedCandidates: number;
}
interface RawJobResponse {
    id: number;
    title: string;
    type?: string;
    employmentType?: string;
    daysRemaining?: string;
    expiresAt?: string;
    status: string;
    applicationCount?: number;
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
            const [jobsResponse, statsResponse] = await Promise.all([
                EmployerService.getRecentJobs({ limit: 5 }),
                EmployerService.getStatistics(),
            ]);

            const safeJobsRes = jobsResponse as unknown as Record<
                string,
                unknown
            >;
            const jobsData = safeJobsRes?.data as
                | Record<string, unknown>
                | undefined;
            const jobsList: RawJobResponse[] =
                (jobsData?.items as RawJobResponse[]) ||
                (safeJobsRes?.data as RawJobResponse[]) ||
                (jobsResponse as unknown as RawJobResponse[]) ||
                [];

            const safeStatsRes = statsResponse as unknown as Record<
                string,
                unknown
            >;
            const statsData: DashboardStatistics =
                safeStatsRes && 'totalJobs' in safeStatsRes
                    ? (safeStatsRes as unknown as DashboardStatistics)
                    : (safeStatsRes?.data as DashboardStatistics) || {
                          totalJobs: 0,
                          totalApplicants: 0,
                          totalSavedCandidates: 0,
                      };
            const mappedJobs: MappedJob[] = jobsList.map(
                (job: RawJobResponse) => ({
                    id: job.id,
                    title: job.title,
                    type:
                        job.type ||
                        (job.employmentType
                            ? job.employmentType.replace('_', ' ')
                            : 'N/A'),
                    remaining:
                        job.daysRemaining ||
                        (job.expiresAt
                            ? getRemainingDays(job.expiresAt)
                            : 'N/A'),
                    status:
                        job.status === 'OPEN' || job.status === 'ACTIVE'
                            ? 'Active'
                            : 'Expired',
                    applications: job.applicationCount || 0,
                })
            );

            return {
                jobs: mappedJobs,
                statistics: statsData,
            };
        },
    });
};
