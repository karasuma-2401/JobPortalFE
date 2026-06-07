import { useRef } from "react";
import { Calendar, Building2, Users, Layers} from "lucide-react";
import JobGridSection from "../../../components/ui/JobGridSection"; 

interface EmployerDetailPageProps {
  employerId: string;
}

const MOCK_DETAILS = {
  name: "Twitter",
  logo: "https://logo.clearbit.com/twitter.com",
  category: "Information Technology (IT)",
  description: `Fusce et erat at nibh maximus fermentum. Mauris ac justo nibh. Praesent nec lorem lorem. Donec porttitor, odio a efficitur blandit, orci nisl porta nisi, eget vulputate quam nibh ut tellus.`,
  benefits: ["In hac habitasse platea dictumst.", "Sed aliquet, arcu eget pretium bibendum."],
  vision: "Praesent ultrices mauris at nisi euismod, ut venenatis augue blandit.",
  overview: { founded: "14 June, 2021", orgType: "Private Company", teamSize: "120-300 Candidates", industry: "Technology" },
  contact: { website: "www.twitter.com", phone: "+1-202-555-0141", email: "career@twitter.com" }
};

const RAW_OPEN_JOBS = [
  { id: "j1", title: "Visual Designer", type: "Full Time", salary: "$10K-$15K", location: "China", isFeatured: true, daysRemaining: "4 Days Remaining" },
  { id: "j2", title: "Front End Developer", type: "Contract Base", salary: "$50K-$80K", location: "Australia", isFeatured: false, daysRemaining: "2 Days Remaining" },
  { id: "j3", title: "Technical Support", type: "Full Time", salary: "$35K-$40K", location: "France", isFeatured: false, daysRemaining: "1 Week Remaining" },
];

export default function EmployerDetailPage({ employerId }: EmployerDetailPageProps) {
  const positionsRef = useRef<HTMLDivElement>(null);
  console.log("Loading Employer ID:", employerId);

  const formattedJobs = RAW_OPEN_JOBS.map(job => ({
    ...job,
    companyName: MOCK_DETAILS.name,
    logo: MOCK_DETAILS.logo
  }));

  return (
    <div className="w-full bg-[#F8F9FA] py-8 px-8 text-left">
      <div className="max-w-7xl mx-auto space-y-8">
        
        <div className="w-full bg-white border border-gray-200/60 rounded-xl p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 shadow-sm">
          <div className="flex items-center gap-5">
            <img src={MOCK_DETAILS.logo} alt={MOCK_DETAILS.name} className="w-16 h-16 rounded-xl object-cover border border-gray-100 shadow-sm" />
            <div className="space-y-1">
              <h1 className="text-[24px] font-bold text-gray-900">{MOCK_DETAILS.name}</h1>
              <p className="text-[14px] text-gray-500">{MOCK_DETAILS.category}</p>
            </div>
          </div>
          <button 
            onClick={() => positionsRef.current?.scrollIntoView({ behavior: "smooth" })}
            className="w-full sm:w-auto px-6 py-3 bg-primary-500 text-white font-bold text-[15px] rounded-lg hover:bg-primary-600 transition-all"
          >
            View Open Position →
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 space-y-8 bg-white border border-gray-200/60 rounded-2xl p-6 sm:p-8 shadow-sm">
            <div className="space-y-3">
              <h2 className="text-[18px] font-bold text-gray-900">Description</h2>
              <p className="text-[14px] text-gray-500 leading-relaxed">{MOCK_DETAILS.description}</p>
            </div>
            <div className="space-y-3">
              <h2 className="text-[18px] font-bold text-gray-900">Company Benefits</h2>
              <ul className="space-y-2.5 list-disc pl-5 text-[14px] text-gray-500">
                {MOCK_DETAILS.benefits.map((b, i) => <li key={i}>{b}</li>)}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white border border-gray-200/60 rounded-2xl p-6 shadow-sm space-y-5">
              <h3 className="text-[16px] font-bold text-gray-900">Job Overview</h3>
              <div className="grid grid-cols-2 gap-y-5 gap-x-4">
                <div className="space-y-1"><Calendar size={20} className="text-primary-500" /><p className="text-[11px] text-gray-400 font-bold uppercase">Founded In</p><p className="text-[14px] font-semibold text-gray-800">{MOCK_DETAILS.overview.founded}</p></div>
                <div className="space-y-1"><Building2 size={20} className="text-primary-500" /><p className="text-[11px] text-gray-400 font-bold uppercase">Org Type</p><p className="text-[14px] font-semibold text-gray-800">{MOCK_DETAILS.overview.orgType}</p></div>
                <div className="space-y-1"><Users size={20} className="text-primary-500" /><p className="text-[11px] text-gray-400 font-bold uppercase">Team Size</p><p className="text-[14px] font-semibold text-gray-800">{MOCK_DETAILS.overview.teamSize}</p></div>
                <div className="space-y-1"><Layers size={20} className="text-primary-500" /><p className="text-[11px] text-gray-400 font-bold uppercase">Industry</p><p className="text-[14px] font-semibold text-gray-800">{MOCK_DETAILS.overview.industry}</p></div>
              </div>
            </div>
          </div>
        </div>

        <div ref={positionsRef}>
          <JobGridSection 
            title={`Open Position (${formattedJobs.length})`}
            jobs={formattedJobs}
            onJobDoubleClick={(id) => console.log("Double click xem công việc:", id)}
          />
        </div>

      </div>
    </div>
  );
}