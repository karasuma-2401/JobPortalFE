import { useState, useEffect, useCallback } from "react";
import { JobseekerService } from "../../../../services/jobseekerService";
import type { Job } from "../../../../types/jobseeker";

export function useFindJobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);

  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const [searchKeyword, setSearchKeyword] = useState("");
  const [locationKeyword, setLocationKeyword] = useState("");

  // Advance Filter States
  const [experience, setExperience] = useState("");
  const [salaryRange, setSalaryRange] = useState("");
  const [jobTypes, setJobTypes] = useState<string[]>([]);
  const [education, setEducation] = useState<string[]>([]);
  const [jobLevel, setJobLevel] = useState("");

  const [filterParams, setFilterParams] = useState({
    keyword: "",
    location: "",
    experience: "",
    salaryRange: "",
    jobTypes: [] as string[],
    education: [] as string[],
    jobLevel: "",
  });

  const [savedJobIds, setSavedJobIds] = useState<string[]>([]);
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);

  const [isListApplyModalOpen, setIsListApplyModalOpen] = useState(false);
  const [applyingJobId, setApplyingJobId] = useState<string>("");
  const [applyingJobTitle, setApplyingJobTitle] = useState("");

  const fetchJobs = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await JobseekerService.getJobs({
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
      setJobs(result.items);
      setTotalCount(result.totalCount);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to fetch jobs";
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [filterParams, currentPage, itemsPerPage]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  useEffect(() => {
    const loadSavedIds = async () => {
      try {
        const ids = await JobseekerService.getFavoriteJobIds();
        setSavedJobIds(ids);
      } catch (err) {
        console.error("Failed to load favorite job IDs:", err);
      }
    };
    loadSavedIds();
  }, []);

  const handleSearch = useCallback((e: React.FormEvent) => {
    e.preventDefault();
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
  }, [searchKeyword, locationKeyword, experience, salaryRange, jobTypes, education, jobLevel]);

  const handleResetFilters = useCallback(() => {
    setSearchKeyword("");
    setLocationKeyword("");
    setExperience("");
    setSalaryRange("");
    setJobTypes([]);
    setEducation([]);
    setJobLevel("");
    setCurrentPage(1);
    setFilterParams({
      keyword: "",
      location: "",
      experience: "",
      salaryRange: "",
      jobTypes: [],
      education: [],
      jobLevel: "",
    });
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleToggleSave = useCallback(async (id: string | number) => {
    const stringId = String(id);
    await JobseekerService.toggleFavoriteJob(stringId);
    const ids = await JobseekerService.getFavoriteJobIds();
    setSavedJobIds(ids);
  }, []);

  const handleApplyClickFromList = useCallback((id: string) => {
    const targetJob = jobs.find((job) => job.id === id);
    if (targetJob) {
      setApplyingJobId(targetJob.id);
      setApplyingJobTitle(targetJob.title);
      setIsListApplyModalOpen(true);
    }
  }, [jobs]);

  const handleListApplySubmit = useCallback(async (data: { resumeId: string; coverLetter: string }) => {
    try {
      await JobseekerService.applyJob({
        jobId: applyingJobId,
        resumeId: data.resumeId,
        coverLetter: data.coverLetter,
      });
      setIsListApplyModalOpen(false);
      alert(`Ứng tuyển thành công vị trí: ${applyingJobTitle}`);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Ứng tuyển thất bại";
      alert(`Ứng tuyển thất bại: ${message}`);
    }
  }, [applyingJobId, applyingJobTitle]);

  const totalPages = Math.max(1, Math.ceil(totalCount / itemsPerPage));

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
    // Advance Filter values & set
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
    selectedJobId,
    setSelectedJobId,
    savedJobIds,
    isListApplyModalOpen,
    setIsListApplyModalOpen,
    applyingJobTitle,
    totalPages,
    handleSearch,
    handlePageChange,
    handleToggleSave,
    handleApplyClickFromList,
    handleListApplySubmit,
  };
}
