import { useState, useEffect, useCallback } from "react";
import { JobseekerService } from "../../../../services/jobseekerService";
import type { Employer } from "../../../../types/jobseeker";

export function useFindEmployers() {
  const [employers, setEmployers] = useState<Employer[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);

  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");

  const [filterParams, setFilterParams] = useState({
    keyword: "",
    location: "",
    category: "",
  });

  const [selectedEmployerId, setSelectedEmployerId] = useState<string | null>(null);

  const fetchEmployers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await JobseekerService.getEmployers({
        keyword: filterParams.keyword,
        location: filterParams.location,
        category: filterParams.category,
        page: currentPage,
        limit: itemsPerPage,
      });
      setEmployers(result.items);
      setTotalCount(result.totalItems);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Failed to fetch employers");
      } else {
        setError("Failed to fetch employers");
      }
    } finally {
      setLoading(false);
    }
  }, [filterParams, currentPage, itemsPerPage]);

  useEffect(() => {
    fetchEmployers();
  }, [fetchEmployers]);

  const handleSearch = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    setFilterParams({
      keyword,
      location,
      category,
    });
  }, [keyword, location, category]);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const totalPages = Math.max(1, Math.ceil(totalCount / itemsPerPage));

  return {
    employers,
    loading,
    error,
    viewMode,
    setViewMode,
    currentPage,
    keyword,
    setKeyword,
    location,
    setLocation,
    category,
    setCategory,
    selectedEmployerId,
    setSelectedEmployerId,
    totalPages,
    totalCount,
    handleSearch,
    handlePageChange,
  };
}
