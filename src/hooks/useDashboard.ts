import { useQuery } from '@tanstack/react-query';
import { EmployerService } from '../services/employerService';

interface MappedJob {
    id: number;
    title: string;
    type: string;
    remaining: string;
    status: string;
    applications: number;
    isFeatured: boolean;
    isHighlighted: boolean;
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
    isFeatured?: boolean;
    isHighlighted?: boolean;
}

interface RecentJobsData {
    items: RawJobResponse[];
    totalItems: number;
    page: number;
    size: number;
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
            const [jobsData, statsData] = await Promise.all([
                EmployerService.getRecentJobs<RecentJobsData>({ limit: 5 }),
                EmployerService.getStatistics<DashboardStatistics>(),
            ]);

            const jobsList: RawJobResponse[] = jobsData?.items || [];

            const stats: DashboardStatistics = statsData || {
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
                    isFeatured: job.isFeatured || false,
                    isHighlighted: job.isHighlighted || false,
                })
            );

            return {
                jobs: mappedJobs,
                statistics: stats,
            };
        },
    });
};
