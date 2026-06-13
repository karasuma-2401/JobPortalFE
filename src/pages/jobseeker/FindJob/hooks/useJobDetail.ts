import { useCallback, useEffect, useState } from 'react';
import { JobseekerService } from '../../../../services/jobseekerService';
import type { JobDetailType , Job } from '../../../../types/jobseeker';

export function useJobDetail(jobId: string) {
    const [jobData, setJobData] = useState<JobDetailType | null>(null);
    const [relatedJobs, setRelatedJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isSaved, setIsSaved] = useState(false);

    const fetchJobDetail = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await JobseekerService.getJobDetail(jobId);
            setJobData(data);
            const relatedRes = await JobseekerService.getJobs({
                page: 1,
                limit: 5, 
            });

            const filteredJobs = (relatedRes.items || []).filter(
                (job) => String(job.id) !== String(jobId)
            );
            setRelatedJobs(filteredJobs.slice(0, 4));
        } catch (err) {
            setError((err as Error).message || 'Failed to fetch job details');
        } finally {
            setLoading(false);
        }
    }, [jobId]);

    const checkSaved = useCallback(async () => {
        try {
            const savedIds = await JobseekerService.getFavoriteJobIds();
            setIsSaved(savedIds.includes(jobId));
        } catch {
            setIsSaved(false);
        }
    }, [jobId]);

    useEffect(() => {
        void fetchJobDetail();
        if (localStorage.getItem('me')) {
            void checkSaved();
        }
    }, [checkSaved, fetchJobDetail]);

    const handleToggleSave = useCallback(async () => {
        await JobseekerService.toggleFavoriteJob(jobId);
        await checkSaved();
    }, [checkSaved, jobId]);

    const handleApplySubmit = useCallback(
        async (data: { resumeId: string; coverLetter: string }) => {
            if (!jobData) {
                return;
            }

            await JobseekerService.applyJob({
                jobId: jobData.id,
                resumeId: data.resumeId,
                coverLetter: data.coverLetter,
            });
        },
        [jobData]
    );

    return {
        jobData,
        relatedJobs,
        loading,
        error,
        isSaved,
        handleToggleSave,
        handleApplySubmit,
    };
}
