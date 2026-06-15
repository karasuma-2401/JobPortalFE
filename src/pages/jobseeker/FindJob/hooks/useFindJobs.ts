import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { JobseekerService } from '../../../../services/jobseekerService';
import type { Job } from '../../../../types/jobseeker';

export function useFindJobs() {
    const [searchParams, setSearchParams] = useSearchParams();

    const initialKeyword = searchParams.get('keyword') || '';
    const initialLocation = searchParams.get('location') || '';

    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [totalCount, setTotalCount] = useState(0);
    const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    
    const [sortBy, setSortBy] = useState<string>('LATEST');

    const [searchKeyword, setSearchKeyword] = useState(initialKeyword);
    const [locationKeyword, setLocationKeyword] = useState(initialLocation);
    const [category, setCategory] = useState('');
    const [experience, setExperience] = useState('');
    const [salaryRange, setSalaryRange] = useState('');
    const [jobTypes, setJobTypes] = useState<string[]>([]);
    const [education, setEducation] = useState<string[]>([]);
    const [jobLevel, setJobLevel] = useState('');
    
    const [filterParams, setFilterParams] = useState({
        keyword: initialKeyword,
        location: initialLocation,
        category: '',
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
                category: filterParams.category,
                experience: filterParams.experience,
                salaryRange: filterParams.salaryRange,
                jobTypes: filterParams.jobTypes,
                education: filterParams.education,
                jobLevel: filterParams.jobLevel,
                page: currentPage,
                limit: itemsPerPage,
                sortBy: sortBy, 
            });
            setJobs(data.items);
            setTotalCount(data.totalItems);
        } catch (err) {
            setError((err as Error).message || 'Failed to load jobs');
        } finally {
            setLoading(false);
        }
    }, [currentPage, filterParams, itemsPerPage, sortBy]);

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
                category,
                experience,
                salaryRange,
                jobTypes,
                education,
                jobLevel,
            });

            const params = new URLSearchParams(searchParams);
            if (searchKeyword.trim()) params.set('keyword', searchKeyword.trim());
            else params.delete('keyword');
            
            if (locationKeyword.trim()) params.set('location', locationKeyword.trim());
            else params.delete('location');

            setSearchParams(params, { replace: true });
        },
        [
            category,
            education,
            experience,
            jobLevel,
            jobTypes,
            locationKeyword,
            salaryRange,
            searchKeyword,
            searchParams,
            setSearchParams
        ]
    );

    const handleResetFilters = useCallback(() => {
        setSearchKeyword('');
        setLocationKeyword('');
        setCategory('');
        setExperience('');
        setSalaryRange('');
        setJobTypes([]);
        setEducation([]);
        setJobLevel('');
        setCurrentPage(1);
        
        setSortBy('LATEST'); 

        setFilterParams({
            keyword: '',
            location: '',
            category: '',
            experience: '',
            salaryRange: '',
            jobTypes: [],
            education: [],
            jobLevel: '',
        });

        // 5. Xóa URL params khi reset
        setSearchParams(new URLSearchParams(), { replace: true });
    }, [setSearchParams]);

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
        category,
        setCategory,
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
        sortBy,
        setSortBy,
    };
}