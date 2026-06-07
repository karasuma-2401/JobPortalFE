import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import ProfileHeader from './components/ProfileHeader';
import ProfileAbout from './components/ProfileAbout';
import ProfileSidebar from './components/ProfileSidebar';
import OpenJobsList from './components/OpenJobsList';
import { useEmployerProfilePageData } from '../../../hooks/useEmployer';

export default function EmployerProfilePage() {
    const navigate = useNavigate();
    const { data, isLoading } = useEmployerProfilePageData();

    const handleEditProfile = () => {
        navigate('/employer/settings');
    };

    const handleViewAllJobs = () => {
        navigate('/employer/my-jobs');
    };

    if (isLoading || !data) {
        return (
            <div className='w-full h-full flex items-center justify-center min-h-[60vh]'>
                <Loader2 className='w-8 h-8 animate-spin text-blue-600' />
            </div>
        );
    }

    const { profile, jobs } = data;

    const mappedJobs = jobs.map((job) => {
        let salaryText = 'Negotiable';
        if (job.salaryMin > 0 && job.salaryMax > 0) {
            salaryText = `$${job.salaryMin} - $${job.salaryMax} / ${job.salaryType?.toLowerCase() || 'month'}`;
        } else if (job.salaryMin > 0) {
            salaryText = `From $${job.salaryMin} / ${job.salaryType?.toLowerCase() || 'month'}`;
        }

        return {
            id: job.id.toString(),
            title: job.title,
            type: job.employmentType.replace('_', ' '),
            location: profile.address || 'Remote',
            salary: salaryText,
        };
    });

    const formatOrganizationType = (type?: string) => {
        if (!type) return 'Not Specified';
        return type
            .split('_')
            .map(
                (word) =>
                    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
            )
            .join(' ');
    };

    return (
        <div className='w-full mx-auto animate-in fade-in duration-500 pb-16'>
            <ProfileHeader
                companyName={profile.companyName}
                location={profile.address}
                website={profile.companyWebsite}
                logoUrl={profile.logo}
                bannerUrl={profile.banner}
                onEdit={handleEditProfile}
            />

            <div className='grid grid-cols-1 xl:grid-cols-12 gap-8 mt-8'>
                <div className='xl:col-span-8 flex flex-col gap-8'>
                    <ProfileAbout
                        aboutUs={profile.description}
                        vision={profile.vision}
                    />
                    <OpenJobsList
                        jobs={mappedJobs}
                        onViewAll={handleViewAllJobs}
                    />
                </div>

                <div className='xl:col-span-4'>
                    <ProfileSidebar
                        founded={profile.founded}
                        teamSize={profile.teamSize}
                        industry={profile.industry}
                        organizationType={formatOrganizationType(
                            profile.organizationType
                        )}
                        email={profile.email}
                        phone={profile.phone}
                        socials={{
                            facebook: profile.facebookUrl,
                            youtube: profile.youtubeUrl,
                            linkedin: profile.linkedInUrl,
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
