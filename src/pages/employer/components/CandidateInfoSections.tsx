import { Globe } from 'lucide-react';
import { FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';

interface BiographySectionProps {
    biography: string;
    coverLetter: string;
    social: { facebook?: string; twitter?: string; linkedin?: string };
}

export function BiographySection({
    biography,
    coverLetter,
    social,
}: BiographySectionProps) {
    return (
        <div className='lg:col-span-2 space-y-8'>
            <section>
                <h3 className='text-sm font-bold text-gray-900 uppercase tracking-widest mb-4'>
                    Biography
                </h3>
                <div className='text-sm text-gray-600 leading-relaxed whitespace-pre-line'>
                    {biography}
                </div>
            </section>

            <div className='w-full h-px bg-gray-100'></div>

            <section>
                <h3 className='text-sm font-bold text-gray-900 uppercase tracking-widest mb-4'>
                    Cover Letter
                </h3>
                <div className='text-sm text-gray-600 leading-relaxed whitespace-pre-line bg-gray-50 p-6 rounded-xl border border-gray-100 italic'>
                    "{coverLetter}"
                </div>
            </section>

            <section>
                <h3 className='text-sm font-bold text-gray-900 mb-4'>
                    Social Media
                </h3>
                {!social.facebook && !social.twitter && !social.linkedin ? (
                    <p className='text-sm text-gray-400 italic'>
                        No social media links provided.
                    </p>
                ) : (
                    <div className='flex items-center gap-3'>
                        {social.facebook && (
                            <a
                                href={social.facebook}
                                target='_blank'
                                rel='noreferrer'
                                className='w-10 h-10 flex items-center justify-center rounded bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-colors'
                            >
                                <FaFacebook size={18} />
                            </a>
                        )}
                        {social.twitter && (
                            <a
                                href={social.twitter}
                                target='_blank'
                                rel='noreferrer'
                                className='w-10 h-10 flex items-center justify-center rounded bg-blue-50 text-blue-400 hover:bg-blue-400 hover:text-white transition-colors'
                            >
                                <FaTwitter size={18} />
                            </a>
                        )}
                        {social.linkedin && (
                            <a
                                href={social.linkedin}
                                target='_blank'
                                rel='noreferrer'
                                className='w-10 h-10 flex items-center justify-center rounded bg-blue-50 text-blue-700 hover:bg-blue-700 hover:text-white transition-colors'
                            >
                                <FaLinkedin size={18} />
                            </a>
                        )}
                    </div>
                )}
            </section>
        </div>
    );
}

interface PersonalStatsCardProps {
    dateOfBirth: string;
    nationality: string;
    maritalStatus: string;
    gender: string;
    experience: string;
    education: string;
}

export function PersonalStatsCard({
    dateOfBirth,
    nationality,
    maritalStatus,
    gender,
    experience,
    education,
}: PersonalStatsCardProps) {
    return (
        <div className='grid grid-cols-2 gap-6 p-6 border border-gray-100 rounded-xl bg-white'>
            <div>
                <div className='text-blue-600 mb-2'>
                    <i className='fa-regular fa-calendar text-xl'></i>
                </div>
                <p className='text-[10px] text-gray-400 uppercase font-bold tracking-wider mb-1'>
                    Date of Birth
                </p>
                <p className='text-sm font-semibold text-gray-900'>
                    {dateOfBirth}
                </p>
            </div>
            <div>
                <div className='text-blue-600 mb-2'>
                    <Globe size={20} />
                </div>
                <p className='text-[10px] text-gray-400 uppercase font-bold tracking-wider mb-1'>
                    Nationality
                </p>
                <p className='text-sm font-semibold text-gray-900'>
                    {nationality}
                </p>
            </div>
            <div>
                <div className='text-blue-600 mb-2'>
                    <i className='fa-solid fa-ring text-xl'></i>
                </div>
                <p className='text-[10px] text-gray-400 uppercase font-bold tracking-wider mb-1'>
                    Marital Status
                </p>
                <p className='text-sm font-semibold text-gray-900'>
                    {maritalStatus}
                </p>
            </div>
            <div>
                <div className='text-blue-600 mb-2'>
                    <i className='fa-solid fa-venus-mars text-xl'></i>
                </div>
                <p className='text-[10px] text-gray-400 uppercase font-bold tracking-wider mb-1'>
                    Gender
                </p>
                <p className='text-sm font-semibold text-gray-900'>{gender}</p>
            </div>
            <div>
                <div className='text-blue-600 mb-2'>
                    <i className='fa-solid fa-briefcase text-xl'></i>
                </div>
                <p className='text-[10px] text-gray-400 uppercase font-bold tracking-wider mb-1'>
                    Experience
                </p>
                <p
                    dangerouslySetInnerHTML={{
                        __html: experience || 'No experience provided',
                    }}
                    className='text-sm font-semibold text-gray-900'
                ></p>
            </div>
            <div>
                <div className='text-blue-600 mb-2'>
                    <i className='fa-solid fa-graduation-cap text-xl'></i>
                </div>
                <p className='text-[10px] text-gray-400 uppercase font-bold tracking-wider mb-1'>
                    Education
                </p>
                <p
                    dangerouslySetInnerHTML={{
                        __html: education || 'No education provided',
                    }}
                    className='text-sm font-semibold text-gray-900'
                ></p>
            </div>
        </div>
    );
}
