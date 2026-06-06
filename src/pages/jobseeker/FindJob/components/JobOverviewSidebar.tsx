import { Calendar, Hourglass, Award, DollarSign, MapPin, Briefcase, ShieldAlert } from "lucide-react";

interface JobOverviewSidebarProps {
  overview: {
    postedDate: string;
    expireIn: string;
    education: string;
    salary: string;
    location: string;
    jobType: string;
    experience: string;
  };
  profile: {
    industry: string;
    foundedIn: string;
    orgType: string;
    companySize: string;
  };
  companyName: string;
  logo: string;
  phone: string;
  email: string;
  website: string;
}

export default function JobOverviewSidebar({ 
  overview, 
  profile, 
  companyName, 
  logo, 
  phone, 
  email, 
  website 
}: JobOverviewSidebarProps) {
  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="bg-white border border-blue-100/70 rounded-xl p-6 shadow-sm">
        <h3 className="text-[18px] font-bold text-gray-900 mb-5">Job Overview</h3>
        <div className="grid grid-cols-2 gap-y-5 gap-x-4">
          
          <div className="flex flex-col gap-1">
            <Calendar size={20} className="text-primary-500" />
            <span className="text-[12px] text-gray-400 uppercase font-semibold tracking-wider mt-1">Job Posted:</span>
            <span className="text-[14px] font-medium text-gray-800">{overview.postedDate}</span>
          </div>

          <div className="flex flex-col gap-1">
            <Hourglass size={20} className="text-primary-500" />
            <span className="text-[12px] text-gray-400 uppercase font-semibold tracking-wider mt-1">Job Expire In:</span>
            <span className="text-[14px] font-medium text-gray-800">{overview.expireIn}</span>
          </div>

          <div className="flex flex-col gap-1">
            <Award size={20} className="text-primary-500" />
            <span className="text-[12px] text-gray-400 uppercase font-semibold tracking-wider mt-1">Education:</span>
            <span className="text-[14px] font-medium text-gray-800">{overview.education}</span>
          </div>

          <div className="flex flex-col gap-1">
            <DollarSign size={20} className="text-primary-500" />
            <span className="text-[12px] text-gray-400 uppercase font-semibold tracking-wider mt-1">Salary:</span>
            <span className="text-[14px] font-medium text-gray-800">{overview.salary}</span>
          </div>

          <div className="flex flex-col gap-1">
            <MapPin size={20} className="text-primary-500" />
            <span className="text-[12px] text-gray-400 uppercase font-semibold tracking-wider mt-1">Location:</span>
            <span className="text-[14px] font-medium text-gray-800">{overview.location}</span>
          </div>

          <div className="flex flex-col gap-1">
            <Briefcase size={20} className="text-primary-500" />
            <span className="text-[12px] text-gray-400 uppercase font-semibold tracking-wider mt-1">Job Type:</span>
            <span className="text-[14px] font-medium text-gray-800">{overview.jobType}</span>
          </div>
        </div>
        
        <div className="flex flex-col gap-1 mt-5 pt-4 border-t border-gray-100">
          <ShieldAlert size={20} className="text-primary-500" />
          <span className="text-[12px] text-gray-400 uppercase font-semibold tracking-wider mt-1">Experience:</span>
          <span className="text-[14px] font-medium text-gray-800">{overview.experience}</span>
        </div>
      </div>

      <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-4 mb-5">
          <img src={logo} alt={companyName} className="w-12 h-12 rounded-lg object-cover" />
          <div>
            <h4 className="text-[16px] font-bold text-gray-900">{companyName}</h4>
            <span className="text-[13px] text-gray-400">{profile.industry}</span>
          </div>
        </div>

        <div className="flex flex-col gap-3.5 text-[14px]">
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Founded in:</span>
            <span className="text-gray-700 font-medium">{profile.foundedIn}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Organization type:</span>
            <span className="text-gray-700 font-medium">{profile.orgType}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Company size:</span>
            <span className="text-gray-700 font-medium">{profile.companySize}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Phone:</span>
            <span className="text-gray-700 font-medium">{phone}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Email:</span>
            <span className="text-gray-700 font-medium truncate max-w-[180px]">{email}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Website:</span>
            <a href={website} target="_blank" rel="noreferrer" className="text-primary-500 hover:underline font-medium truncate max-w-[180px]">
              {website}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}