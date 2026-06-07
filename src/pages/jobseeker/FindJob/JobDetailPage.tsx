import { Link as LinkIcon, Phone, Mail, Bookmark, ArrowRight} from "lucide-react";
import { FaFacebook, FaTwitter } from 'react-icons/fa';
import JobOverviewSidebar from "./components/JobOverviewSidebar";
import JobGridSection from "../../../components/ui/JobGridSection"; 
import ApplyJobModal from "./components/ApplyJobModal";
import { useJobDetail } from "./hooks/useJobDetail";

interface JobDetailPageProps {
  jobId: string; 
}

const MOCK_RELATED_JOBS = [
  { id: "1", title: "Marketing Manager", companyName: "Stripe", type: "Remote", isFeatured: true, logo: "https://logo.clearbit.com/stripe.com", location: "New Mexico, USA", salary: "$50k-$80k/month", daysRemaining: "4 Days Remaining" },
  { id: "2", title: "Project Manager", companyName: "Shopify", type: "Full Time", isFeatured: true, logo: "https://logo.clearbit.com/shopify.com", location: "Dhaka, Bangladesh", salary: "$50k-$80k/month", daysRemaining: "4 Days Remaining" }
];

export default function JobDetailPage({ jobId }: JobDetailPageProps) {
  const {
    jobData,
    loading,
    error,
    isApplyModalOpen,
    setIsApplyModalOpen,
    isSaved,
    handleToggleSave,
    handleApplySubmit,
  } = useJobDetail(jobId);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20 min-h-screen">
        <div className="w-10 h-10 border-4 border-primary-200 border-t-primary-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !jobData) {
    return (
      <div className="text-center py-20 text-red-500 font-semibold min-h-screen">
        {error || "Job not found"}
      </div>
    );
  }

  return (
    <div className="w-full bg-white min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-gray-100 mb-8">
          <div className="flex items-start sm:items-center gap-5">
            <img 
              src={jobData.logo} 
              alt={jobData.companyName} 
              className="w-16 h-16 rounded-full object-cover border border-gray-100 p-1 shrink-0 bg-white shadow-sm" 
            />
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2.5 flex-wrap">
                <h1 className="text-[22px] sm:text-[24px] font-bold text-gray-900 leading-tight">{jobData.title}</h1>
                {jobData.isFeatured && (
                  <span className="bg-[#FFEEEC] text-[#FF4F4F] text-[11px] font-bold px-2.5 py-0.5 rounded uppercase tracking-wider">Featured</span>
                )}
                <span className="bg-blue-50 text-primary-500 text-[12px] font-semibold px-2.5 py-0.5 rounded-md">{jobData.type}</span>
              </div>
              
              <div className="flex items-center gap-4 text-[14px] text-gray-500 flex-wrap mt-0.5">
                <a href={jobData.website} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-primary-500 transition-colors">
                  <LinkIcon size={15} /> <span>{jobData.website}</span>
                </a>
                <span className="text-gray-300 hidden sm:inline">|</span>
                <span className="flex items-center gap-1.5">
                  <Phone size={15} /> <span>{jobData.phone}</span>
                </span>
                <span className="text-gray-300 hidden sm:inline">|</span>
                <span className="flex items-center gap-1.5">
                  <Mail size={15} /> <span>{jobData.email}</span>
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center lg:items-end gap-3 shrink-0 self-start lg:self-center">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button 
                onClick={handleToggleSave}
                className={`p-3.5 rounded-lg transition-colors ${
                  isSaved 
                    ? "bg-[#E6F0FA] text-[#0A65CC]" 
                    : "bg-blue-50 text-primary-500 hover:bg-blue-100"
                }`}
                title={isSaved ? "Remove from Favorite" : "Save to Favorite"}
              >
                <Bookmark size={20} fill={isSaved ? "currentColor" : "none"} />
              </button>
              
              <button 
                onClick={() => setIsApplyModalOpen(true)}
                className="flex-1 sm:flex-initial flex items-center justify-center gap-2 bg-primary-500 hover:bg-primary-600 text-white font-bold px-6 py-3.5 rounded-lg shadow-sm transition-all active:scale-[0.98]"
              >
                <span>Apply Now</span>
                <ArrowRight size={18} />
              </button>
            </div>
            <span className="text-[13px] text-gray-400 sm:text-right w-full sm:w-auto">
              Job expire in: <span className="text-red-500 font-medium">{jobData.expireDate}</span>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <div className="lg:col-span-2 flex flex-col gap-6 text-[15px] text-gray-600 leading-relaxed">
            <div>
              <h3 className="text-[18px] font-bold text-gray-900 mb-3.5">Job Description</h3>
              {jobData.description.map((para, idx) => (
                <p key={idx} className="mb-4">{para}</p>
              ))}
            </div>

            <div className="mt-2">
              <h3 className="text-[18px] font-bold text-gray-900 mb-3.5">Responsibilities</h3>
              <ul className="list-disc pl-5 flex flex-col gap-2.5 text-gray-600">
                {jobData.responsibilities.map((resp, idx) => (
                  <li key={idx}>{resp}</li>
                ))}
              </ul>
            </div>

            <div className="flex items-center gap-3 mt-6 pt-6 border-t border-gray-150">
              <span className="text-[14px] font-semibold text-gray-700">Share this job:</span>
              <button className="flex items-center gap-1.5 px-3 py-1.5 border border-blue-100 rounded-md text-[13px] text-blue-600 hover:bg-blue-50 transition-colors font-medium">
                <FaFacebook size={14} className="fill-current" /> Facebook
              </button>
              <button className="flex items-center gap-1.5 px-3 py-1.5 border border-sky-100 rounded-md text-[13px] text-sky-500 hover:bg-sky-50 transition-colors font-medium">
                <FaTwitter size={14} className="fill-current" /> Twitter
              </button>
            </div>
          </div>

          <div className="lg:col-span-1">
            <JobOverviewSidebar 
              overview={jobData.overview} 
              profile={jobData.companyProfile} 
              companyName={jobData.companyName}
              logo={jobData.logo}
              phone={jobData.phone}
              email={jobData.email}
              website={jobData.website}
            />
          </div>
        </div>

        <div className="border-t border-gray-100 pt-8">
          <JobGridSection 
            title="Related Jobs"
            jobs={MOCK_RELATED_JOBS}
            onJobDoubleClick={(id) => console.log("Related job double clicked:", id)}
          />
        </div>

      </div>

      <ApplyJobModal 
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
        jobTitle={jobData.title} 
        onSubmit={handleApplySubmit}
      />
    </div>
  );
}