import { useCallback, useEffect, useState } from 'react';
import { JobseekerService } from '../../../../services/jobseekerService';
import type { Job } from '../../../../types/jobseeker';

export function useFindJobs() {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [totalCount, setTotalCount] = useState(0);
    const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [locationKeyword, setLocationKeyword] = useState('');
    const [experience, setExperience] = useState('');
    const [salaryRange, setSalaryRange] = useState('');
    const [jobTypes, setJobTypes] = useState<string[]>([]);
    const [education, setEducation] = useState<string[]>([]);
    const [jobLevel, setJobLevel] = useState('');
    const [filterParams, setFilterParams] = useState({
        keyword: '',
        location: '',
        experience: '',
        salaryRange: '',
        jobTypes: [] as string[],
        education: [] as string[],
        jobLevel: '',
    });
    const [savedJobIds, setSavedJobIds] = useState<string[]>([]);

    const fetchJobs = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await JobseekerService.getJobs({
                keyword: filterParams.keyword,
                location: filterParams.location,
                experience: filterParams.experience,
                salaryRange: filterParams.salaryRange,
                jobTypes: filterParams.jobTypes,
                education: filterParams.education,
                jobLevel: filterParams.jobLevel,
                page: currentPage,
                limit: itemsPerPage,
            });
            setJobs(data.items);
            setTotalCount(data.totalItems);
        } catch (err) {
            setError((err as Error).message || 'Failed to load jobs');
        } finally {
            setLoading(false);
        }
    }, [currentPage, filterParams, itemsPerPage]);

    const loadSavedIds = useCallback(async () => {
        try {
            const ids = await JobseekerService.getFavoriteJobIds();
            setSavedJobIds(ids);
        } catch {
            setSavedJobIds([]);
        }
    }, []);

    useEffect(() => {
        void fetchJobs();
    }, [fetchJobs]);

    useEffect(() => {
        const user = localStorage.getItem('me');
        if (user) {
            void loadSavedIds();
        } else {
            setSavedJobIds([]);
        }
    }, [loadSavedIds]);

    const handleSearch = useCallback(
        (event: React.FormEvent) => {
            event.preventDefault();
            setCurrentPage(1);
            setFilterParams({
                keyword: searchKeyword,
                location: locationKeyword,
                experience,
                salaryRange,
                jobTypes,
                education,
                jobLevel,
            });
        },
        [
            education,
            experience,
            jobLevel,
            jobTypes,
            locationKeyword,
            salaryRange,
            searchKeyword,
        ]
    );

    const handleResetFilters = useCallback(() => {
        setSearchKeyword('');
        setLocationKeyword('');
        setExperience('');
        setSalaryRange('');
        setJobTypes([]);
        setEducation([]);
        setJobLevel('');
        setCurrentPage(1);
        setFilterParams({
            keyword: '',
            location: '',
            experience: '',
            salaryRange: '',
            jobTypes: [],
            education: [],
            jobLevel: '',
        });
    }, []);

    const handlePageChange = useCallback((page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    const handleToggleSave = useCallback(
        async (id: string | number) => {
            await JobseekerService.toggleFavoriteJob(String(id));
            await loadSavedIds();
        },
        [loadSavedIds]
    );

    return {
        jobs,
        loading,
        error,
        viewMode,
        setViewMode,
        currentPage,
        searchKeyword,
        setSearchKeyword,
        locationKeyword,
        setLocationKeyword,
        experience,
        setExperience,
        salaryRange,
        setSalaryRange,
        jobTypes,
        setJobTypes,
        education,
        setEducation,
        jobLevel,
        setJobLevel,
        handleResetFilters,
        savedJobIds,
        totalPages: Math.max(1, Math.ceil(totalCount / itemsPerPage)),
        handleSearch,
        handlePageChange,
        handleToggleSave,
    };
}
