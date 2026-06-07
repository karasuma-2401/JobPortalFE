import {
    Calendar,
    Users,
    Briefcase,
    Mail,
    Phone,
    Building2,
} from 'lucide-react';
import { FaFacebook, FaYoutube, FaLinkedin } from 'react-icons/fa';

interface ProfileSidebarProps {
    founded: string;
    teamSize: string;
    industry: string;
    organizationType: string;
    email: string;
    phone: string;
    socials: {
        facebook?: string;
        youtube?: string;
        linkedin?: string;
    };
}

export default function ProfileSidebar({
    founded,
    teamSize,
    industry,
    organizationType,
    email,
    phone,
    socials,
}: ProfileSidebarProps) {
    return (
        <div className='flex flex-col gap-6'>
            <div className='bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 p-7'>
                <h3 className='text-lg font-semibold text-gray-900 mb-6'>
                    Company Information
                </h3>
                <div className='flex flex-col gap-6'>
                    <div className='group flex items-center gap-4 cursor-default'>
                        <div className='w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110'>
                            <Calendar size={20} strokeWidth={2} />
                        </div>
                        <div>
                            <p className='text-[11px] text-gray-500 font-medium uppercase tracking-wider mb-1'>
                                Founded In
                            </p>
                            <p className='text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors'>
                                {founded}
                            </p>
                        </div>
                    </div>

                    <div className='group flex items-center gap-4 cursor-default'>
                        <div className='w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110'>
                            <Building2 size={20} strokeWidth={2} />
                        </div>
                        <div>
                            <p className='text-[11px] text-gray-500 font-medium uppercase tracking-wider mb-1'>
                                Organization Type
                            </p>
                            <p className='text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors'>
                                {organizationType}
                            </p>
                        </div>
                    </div>

                    <div className='group flex items-center gap-4 cursor-default'>
                        <div className='w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110'>
                            <Users size={20} strokeWidth={2} />
                        </div>
                        <div>
                            <p className='text-[11px] text-gray-500 font-medium uppercase tracking-wider mb-1'>
                                Team Size
                            </p>
                            <p className='text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors'>
                                {teamSize}
                            </p>
                        </div>
                    </div>

                    <div className='group flex items-center gap-4 cursor-default'>
                        <div className='w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110'>
                            <Briefcase size={20} strokeWidth={2} />
                        </div>
                        <div>
                            <p className='text-[11px] text-gray-500 font-medium uppercase tracking-wider mb-1'>
                                Industry
                            </p>
                            <p className='text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1'>
                                {industry}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 p-7'>
                <h3 className='text-lg font-semibold text-gray-900 mb-6'>
                    Contact Us
                </h3>

                <div className='flex flex-col gap-6 mb-8'>
                    <div className='group flex items-center gap-4 cursor-pointer'>
                        <div className='w-12 h-12 rounded-xl bg-[#EA4335]/10 text-[#EA4335] flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:shadow-sm'>
                            <Mail size={20} strokeWidth={2} />
                        </div>
                        <div className='flex-1 min-w-0'>
                            <p className='text-[11px] text-gray-500 font-medium uppercase tracking-wider mb-1'>
                                Email
                            </p>
                            <p className='text-sm font-medium text-gray-900 truncate group-hover:text-[#EA4335] transition-colors'>
                                {email}
                            </p>
                        </div>
                    </div>

                    <div className='group flex items-center gap-4 cursor-pointer'>
                        <div className='w-12 h-12 rounded-xl bg-emerald-50 text-emerald-500 flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:shadow-sm'>
                            <Phone size={20} strokeWidth={2} />
                        </div>
                        <div>
                            <p className='text-[11px] text-gray-500 font-medium uppercase tracking-wider mb-1'>
                                Phone
                            </p>
                            <p className='text-sm font-medium text-gray-900 group-hover:text-emerald-500 transition-colors'>
                                {phone}
                            </p>
                        </div>
                    </div>
                </div>
                <div className='flex items-center gap-3 pt-6 border-t border-gray-100'>
                    {socials.facebook && (
                        <a
                            href={socials.facebook}
                            target='_blank'
                            rel='noreferrer'
                            className='w-11 h-11 rounded-xl bg-[#1877F2]/10 text-[#1877F2] flex items-center justify-center transition-all duration-300 hover:bg-[#1877F2] hover:text-white hover:-translate-y-1 hover:shadow-md'
                            title='Facebook'
                        >
                            <FaFacebook size={18} strokeWidth={2} />
                        </a>
                    )}
                    {socials.youtube && (
                        <a
                            href={socials.youtube}
                            target='_blank'
                            rel='noreferrer'
                            className='w-11 h-11 rounded-xl bg-[#FF0000]/10 text-[#FF0000] flex items-center justify-center transition-all duration-300 hover:bg-[#FF0000] hover:text-white hover:-translate-y-1 hover:shadow-md'
                            title='YouTube'
                        >
                            <FaYoutube size={18} strokeWidth={2} />
                        </a>
                    )}
                    {socials.linkedin && (
                        <a
                            href={socials.linkedin}
                            target='_blank'
                            rel='noreferrer'
                            className='w-11 h-11 rounded-xl bg-[#0A66C2]/10 text-[#0A66C2] flex items-center justify-center transition-all duration-300 hover:bg-[#0A66C2] hover:text-white hover:-translate-y-1 hover:shadow-md'
                            title='LinkedIn'
                        >
                            <FaLinkedin size={18} strokeWidth={2} />
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}
