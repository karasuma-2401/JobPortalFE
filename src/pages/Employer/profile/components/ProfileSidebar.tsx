import {
  Calendar,
  Users,
  Briefcase,
  Mail,
  Phone,
  Facebook,
  Twitter,
  Linkedin,
} from "lucide-react";

interface ProfileSidebarProps {
  founded: string;
  teamSize: string;
  industry: string;
  email: string;
  phone: string;
  socials: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
  };
}

export default function ProfileSidebar({
  founded,
  teamSize,
  industry,
  email,
  phone,
  socials,
}: ProfileSidebarProps) {
  return (
    <div className="flex flex-col gap-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-base font-bold text-gray-900 mb-6">
          Company Information
        </h3>
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <Calendar size={20} />
            </div>
            <div>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">
                Founded In
              </p>
              <p className="text-sm font-semibold text-gray-900">{founded}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <Users size={20} />
            </div>
            <div>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">
                Team Size
              </p>
              <p className="text-sm font-semibold text-gray-900">{teamSize}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <Briefcase size={20} />
            </div>
            <div>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">
                Industry
              </p>
              <p className="text-sm font-semibold text-gray-900">{industry}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-base font-bold text-gray-900 mb-6">Contact Us</h3>
        <div className="flex flex-col gap-5 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded border border-gray-100 text-gray-400 flex items-center justify-center shrink-0">
              <Mail size={18} />
            </div>
            <div>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">
                Email
              </p>
              <p className="text-sm font-semibold text-gray-900">{email}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded border border-gray-100 text-gray-400 flex items-center justify-center shrink-0">
              <Phone size={18} />
            </div>
            <div>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">
                Phone
              </p>
              <p className="text-sm font-semibold text-gray-900">{phone}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {socials.facebook && (
            <a
              href={socials.facebook}
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 rounded bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white transition-colors"
            >
              <Facebook size={18} />
            </a>
          )}
          {socials.twitter && (
            <a
              href={socials.twitter}
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 rounded bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-blue-400 hover:text-white transition-colors"
            >
              <Twitter size={18} />
            </a>
          )}
          {socials.linkedin && (
            <a
              href={socials.linkedin}
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 rounded bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-blue-700 hover:text-white transition-colors"
            >
              <Linkedin size={18} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
