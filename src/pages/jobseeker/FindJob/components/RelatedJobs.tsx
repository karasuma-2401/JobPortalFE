import { ArrowLeft, ArrowRight } from "lucide-react";
import JobCard from "../../../../components/ui/JobCard"; 

export default function RelatedJobs() {
  // Dữ liệu mock phục vụ hiển thị liên quan (Giống ảnh số 2)
  const relatedMockData = [
    { id: "1", title: "Visual Designer", companyName: "Freepik", type: "Full Time", isFeatured: true, logo: "https://logo.clearbit.com/freepik.com", location: "China", salary: "$10K-$15K", daysRemaining: "4 Days Remaining" },
    { id: "2", title: "Front End Developer", companyName: "Instagram", type: "Contract Base", isFeatured: false, logo: "https://logo.clearbit.com/instagram.com", location: "Australia", salary: "$50K-$80K", daysRemaining: "2 Days Remaining" },
    { id: "3", title: "Technical Support Specialist", companyName: "Upwork", type: "Full Time", isFeatured: false, logo: "https://logo.clearbit.com/upwork.com", location: "France", salary: "$35K-$40K", daysRemaining: "6 Days Remaining" },
  ];

  return (
    <div className="mt-16 border-t border-gray-100 pt-10">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-[24px] font-bold text-gray-900">Related Jobs</h2>
        <div className="flex items-center gap-2">
          <button className="p-2.5 rounded-lg border border-gray-100 bg-white text-gray-600 hover:bg-gray-50 transition-colors">
            <ArrowLeft size={18} />
          </button>
          <button className="p-2.5 rounded-lg border border-gray-100 bg-white text-gray-600 hover:bg-gray-50 transition-colors">
            <ArrowRight size={18} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {relatedMockData.map((job) => (
          <JobCard
            key={job.id}
            logo={job.logo}
            companyName={job.companyName}
            location={job.location}
            title={job.title}
            type={job.type}
            salary={job.salary}
            daysRemaining={job.daysRemaining}
            isFeatured={job.isFeatured}
          />
        ))}
      </div>
    </div>
  );
}