import { Calendar, Building2, Users, Layers, Globe, Phone, Mail } from "lucide-react";


interface SidebarProps {
  overview: {
    founded: string;
    orgType: string;
    teamSize: string;
    industry: string;
  };
  contact: {
    website: string;
    phone: string;
    email: string;
  };
}

export default function EmployerSidebar({ overview, contact }: SidebarProps) {
  return (
    <div className="space-y-6">
      {/* 1. Job Overview Widget */}
      <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-6">
        <h3 className="text-[16px] font-bold text-gray-900">Job Overview</h3>
        <div className="grid grid-cols-2 gap-y-5 gap-x-4">
          <div className="space-y-1.5">
            <Calendar size={20} className="text-primary-500" />
            <p className="text-[12px] text-gray-400 font-medium uppercase tracking-wider">Founded In:</p>
            <p className="text-[14px] font-semibold text-gray-800">{overview.founded}</p>
          </div>
          <div className="space-y-1.5">
            <Building2 size={20} className="text-primary-500" />
            <p className="text-[12px] text-gray-400 font-medium uppercase tracking-wider">Organization Type:</p>
            <p className="text-[14px] font-semibold text-gray-800">{overview.orgType}</p>
          </div>
          <div className="space-y-1.5">
            <Users size={20} className="text-primary-500" />
            <p className="text-[12px] text-gray-400 font-medium uppercase tracking-wider">Team Size:</p>
            <p className="text-[14px] font-semibold text-gray-800">{overview.teamSize}</p>
          </div>
          <div className="space-y-1.5">
            <Layers size={20} className="text-primary-500" />
            <p className="text-[12px] text-gray-400 font-medium uppercase tracking-wider">Industry Types:</p>
            <p className="text-[14px] font-semibold text-gray-800">{overview.industry}</p>
          </div>
        </div>
      </div>

      {/* 2. Contact Information Widget */}
      <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-5">
        <h3 className="text-[16px] font-bold text-gray-900">Contact Information</h3>
        <div className="space-y-4">
          <div className="flex items-start gap-3.5 border-b border-gray-50 pb-3">
            <Globe size={20} className="text-primary-500 shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <p className="text-[12px] text-gray-400 font-medium uppercase">Website</p>
              <a href={`https://${contact.website}`} target="_blank" rel="noreferrer" className="text-[14px] font-medium text-gray-700 hover:text-primary-500 break-all">{contact.website}</a>
            </div>
          </div>
          <div className="flex items-start gap-3.5 border-b border-gray-50 pb-3">
            <Phone size={20} className="text-primary-500 shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <p className="text-[12px] text-gray-400 font-medium uppercase">Phone</p>
              <p className="text-[14px] font-medium text-gray-700">{contact.phone}</p>
            </div>
          </div>
          <div className="flex items-start gap-3.5">
            <Mail size={20} className="text-primary-500 shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <p className="text-[12px] text-gray-400 font-medium uppercase">Email Address</p>
              <p className="text-[14px] font-medium text-gray-700 break-all">{contact.email}</p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Follow Us Widget */}
      <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-4">
        <h3 className="text-[16px] font-bold text-gray-900">Follow us on:</h3>
        <div className="flex items-center gap-2.5">
          <a href="#" className="p-2.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-all">Facebook</a>
          <a href="#" className="p-2.5 rounded-lg bg-cyan-50 text-cyan-500 hover:bg-cyan-500 hover:text-white transition-all">Twitter</a>
          <a href="#" className="p-2.5 rounded-lg bg-pink-50 text-pink-600 hover:bg-pink-600 hover:text-white transition-all">Instagram</a>
          <a href="#" className="p-2.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-all">Youtube</a>
        </div>
      </div>
    </div>
  );
}