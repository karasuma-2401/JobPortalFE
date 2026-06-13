import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../../../../contexts/auth/useAuth';
import { useJobseekerProfile } from '../../../../../hooks/useJobseeker';

export default function ProfileAlert() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { data: profile } = useJobseekerProfile();

    const avatarUrl = `${
        profile?.avatar ||
        user?.avatar ||
        `https://ui-avatars.com/api/?name=${profile?.fullName || user?.name || user?.displayName || 'Candidate'}&background=eff6ff&color=2563eb`
    }`;

    return (
        <div className='flex items-center justify-between px-8 py-7 rounded-xl bg-danger-500 text-white shadow-sm'>
            <div className='flex items-center gap-5'>
                <img
                    src={avatarUrl}
                    alt='Avatar'
                    className='w-16 h-16 rounded-full border-2 border-white/20 object-cover'
                />
                <div className='space-y-1 text-left'>
                    <h3 className='text-[18px] font-bold'>
                        Your profile editing is not completed.
                    </h3>
                    <p className='text-[14px] text-white/90'>
                        Complete your profile editing & build your custom Resume
                    </p>
                </div>
            </div>
            <button
                type='button'
                onClick={() => navigate('/jobseeker/DashBoard/settings')}
                className='flex items-center gap-2.5 bg-white text-danger-500 px-6 py-3 rounded-lg text-[15px] font-bold hover:bg-gray-50 transition-colors'
            >
                Edit Profile <ArrowRight size={18} strokeWidth={2.5} />
            </button>
        </div>
    );
}
