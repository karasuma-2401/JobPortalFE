import { MapPin, Globe, Edit } from 'lucide-react';

interface ProfileHeaderProps {
    companyName: string;
    location: string;
    website: string;
    logoUrl?: string;
    bannerUrl?: string;
    onEdit: () => void;
}

export default function ProfileHeader({
    companyName,
    location,
    website,
    logoUrl,
    bannerUrl,
    onEdit,
}: ProfileHeaderProps) {
    const formatWebsiteUrl = (url: string) => {
        if (!url) return '#';
        return url.startsWith('http://') || url.startsWith('https://')
            ? url
            : `https://${url}`;
    };
    const defaultLogo =
        'https://ui-avatars.com/api/?name=' +
        (companyName || 'Company') +
        '&background=2563eb&color=fff';
    const defaultBanner =
        'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2000&auto=format&fit=crop';

    return (
        <div className='bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden'>
            <div className='h-64 w-full relative'>
                <img
                    src={bannerUrl || defaultBanner}
                    alt='Company Banner'
                    className='w-full h-full object-cover'
                    onError={(e) => {
                        (e.target as HTMLImageElement).src = defaultBanner;
                    }}
                />
                <div className='absolute inset-0 bg-linear-to-t from-gray-900/60 to-transparent'></div>
            </div>

            <div className='px-8 pb-8 relative'>
                <div className='flex flex-col sm:flex-row justify-between items-end sm:items-start gap-4'>
                    <div className='flex flex-col sm:flex-row items-center sm:items-end gap-6 -mt-16 relative z-10'>
                        <div className='w-32 h-32 rounded-xl border-4 border-white bg-white shadow-md overflow-hidden shrink-0'>
                            <img
                                src={logoUrl || defaultLogo}
                                alt={`${companyName} Logo`}
                                className='w-full h-full object-cover'
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src =
                                        defaultLogo;
                                }}
                            />
                        </div>
                        <div className='pb-2 text-center sm:text-left'>
                            <h1 className='text-2xl font-bold text-gray-900 mb-2'>
                                {companyName || 'Unknown Company'}
                            </h1>
                            <div className='flex items-center gap-4 text-sm text-gray-500 justify-center sm:justify-start'>
                                <span className='flex items-center gap-1.5'>
                                    <MapPin size={16} />{' '}
                                    {location || 'No location'}
                                </span>
                                {website && (
                                    <a
                                        href={formatWebsiteUrl(website)}
                                        target='_blank'
                                        rel='noreferrer'
                                        className='flex items-center gap-1.5 text-blue-600 hover:underline'
                                    >
                                        <Globe size={16} /> {website}
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={onEdit}
                        className='flex items-center gap-2 px-6 py-2.5 bg-blue-50 text-blue-600 font-semibold text-sm rounded-md hover:bg-blue-600 hover:text-white transition-colors mt-4 sm:mt-6'
                    >
                        <Edit size={16} /> Edit Profile
                    </button>
                </div>
            </div>
        </div>
    );
}
