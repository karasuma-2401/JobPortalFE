import { useState, useEffect, useCallback } from "react";
import { JobseekerService } from "../../../../services/jobseekerService";
import {
  getFilteredJobsLocal,
  readFavoriteJobs,
  toggleFavoriteJobLocal,
  saveAppliedJobLocal,
} from "../../../../utils/jobseekerMockDb";
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
      console.log(currentPage) 
      console.log(itemsPerPage) 
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
      const data = result.data 
      console.log(data) 
      setJobs(data.items);

      setTotalCount(data.totalItems);
    } catch (err: unknown) {
      console.warn("JobseekerService.getJobs API failed, falling back to local mock data:", err);
      const localResult = getFilteredJobsLocal({
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
      setJobs(localResult.items);
      setTotalCount(localResult.totalCount);
    } finally {
      setLoading(false);
    }
  }, [filterParams, currentPage, itemsPerPage]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const loadSavedIds = useCallback(async () => {
    try {
      const ids = await JobseekerService.getFavoriteJobIds();
      setSavedJobIds(ids);
    } catch (err) {
      console.warn("JobseekerService.getFavoriteJobIds API failed, falling back to local mock data:", err);
      const ids = readFavoriteJobs().map((f) => f.id);
      setSavedJobIds(ids);
    }
  }, []);

  useEffect(() => {
    const user = localStorage.getItem('me');
    if (user) {
      loadSavedIds();
    }
  }, [loadSavedIds]);

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
    try {
      await JobseekerService.toggleFavoriteJob(stringId);
      await loadSavedIds();
    } catch (err) {
      console.warn("JobseekerService.toggleFavoriteJob API failed, updating locally:", err);
      toggleFavoriteJobLocal(stringId);
      const ids = readFavoriteJobs().map((f) => f.id);
      setSavedJobIds(ids);
    }
  }, [loadSavedIds]);

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

      alertSuccess();
    } catch (err: unknown) {
      console.warn("API failed, fallback local:", err);

      try {
        saveAppliedJobLocal(applyingJobId);
        alertSuccess();
      } catch {
        alert("Ứng tuyển thất bại");
      }
    }

    function alertSuccess() {
      setIsListApplyModalOpen(false);
      alert(`Ứng tuyển thành công vị trí: ${applyingJobTitle}`);
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
