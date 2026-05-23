import { useState } from "react";
import FavoriteJobItem from "./FavoriteJobItem";
import DashboardPagination from "../../../../components/ui/DashboardPagination";

// Định nghĩa kiểu dữ liệu sạch cho mock data (không chứa trạng thái UI)
interface RawFavoriteJob {
  id: string;
  logo: string;
  role: string;
  type: string;
  location: string;
  salary: string;
  timeStatus: string;
  isExpired?: boolean;
}

const mockFavorites: RawFavoriteJob[] = [
  { id: "1", logo: "https://logo.clearbit.com/google.com", role: "Technical Support Specialist", type: "Full Time", location: "Idaho, USA", salary: "$15K-$20K", timeStatus: "Job Expire", isExpired: true },
  { id: "2", logo: "https://logo.clearbit.com/youtube.com", role: "UI/UX Designer", type: "Full Time", location: "Minnesota, USA", salary: "$10K-$15K", timeStatus: "4 Days Remaining" },
  { id: "3", logo: "https://logo.clearbit.com/slack.com", role: "Senior UX Designer", type: "Full Time", location: "United Kingdom of Great Britain", salary: "$30K-$35K", timeStatus: "4 Days Remaining" }, // Đã bỏ 'active: true' fix cứng
  { id: "4", logo: "https://logo.clearbit.com/facebook.com", role: "Junior Graphic Designer", type: "Full Time", location: "Mymensingh, Bangladesh", salary: "$40K-$50K", timeStatus: "4 Days Remaining" },
  { id: "5", logo: "https://logo.clearbit.com/google.com", role: "Technical Support Specialist", type: "Full Time", location: "Idaho, USA", salary: "$15K-$20K", timeStatus: "Job Expire", isExpired: true },
  { id: "6", logo: "https://logo.clearbit.com/twitter.com", role: "Product Designer", type: "Full Time", location: "Sivas, Turkey", salary: "$50K-$70K", timeStatus: "4 Days Remaining" },
  { id: "7", logo: "https://logo.clearbit.com/udemy.com", role: "Project Manager", type: "Full Time", location: "Ohio, USA", salary: "$50K-$80K", timeStatus: "4 Days Remaining" },
  { id: "8", logo: "https://logo.clearbit.com/google.com", role: "Technical Support Specialist", type: "Full Time", location: "Idaho, USA", salary: "$15K-$20K", timeStatus: "Job Expire", isExpired: true },
  { id: "9", logo: "https://logo.clearbit.com/google.com", role: "Technical Support Specialist", type: "Full Time", location: "Idaho, USA", salary: "$15K-$20K", timeStatus: "Job Expire", isExpired: true },
];

export default function FavoriteJobsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5;
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="space-y-8 text-left animate-fade-in pb-8">
      <div className="flex items-center gap-2 pb-4">
        <h1 className="text-[18px] font-bold text-gray-900">Favorite Jobs</h1>
        <span className="text-[15px] font-medium text-gray-400">(17)</span>
      </div>

      <div className="flex flex-col gap-4">
        {mockFavorites.map((job) => (
          <FavoriteJobItem
            key={job.id}
            {...job}
            isSelected={selectedJobId === job.id}
            onSelect={() => setSelectedJobId(job.id)}
          />
        ))}
      </div>

      {/* Phân trang */}
      <DashboardPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}