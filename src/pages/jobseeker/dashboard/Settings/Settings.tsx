import { useState } from 'react';
import ProfilePicture from './components/ProfilePicture';
import BasicInfoForm from './components/BasicInfoForm';
import ResumeManager from './components/ResumeManager';
import ProfileTab from './components/ProfileTab';
import SocialLinksTab from './components/SocialLinksTab';
import AccountSettingsTab from './components/AccountSettingsTab';
import { useJobseekerProfile } from '../../../../hooks/useJobseeker';

export default function Settings() {
    const [activeTab, setActiveTab] = useState('Personal');
    const { data: profile, isLoading, refetch } = useJobseekerProfile();

    const tabs = [
        { id: 'Personal', label: 'Personal' },
        { id: 'Profile', label: 'Profile' },
        { id: 'Social Links', label: 'Social Links' },
        { id: 'Account Setting', label: 'Account Setting' },
    ];

    const loadProfile = async () => {
        await refetch();
    };

    return (
        <div className='mx-auto max-w-6xl bg-bg-white p-8 animate-in fade-in duration-500'>
            <h1 className='mb-8 text-left text-2xl font-bold text-gray-900'>
                Settings
            </h1>

            <div className='mb-10 flex gap-8 border-b border-gray-100 overflow-x-auto'>
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        type='button'
                        onClick={() => setActiveTab(tab.id)}
                        className={`whitespace-nowrap border-b-[3px] pb-4 text-sm font-bold transition-all ${
                            activeTab === tab.id
                                ? 'border-primary-500 text-primary-500'
                                : 'border-transparent text-gray-400 hover:text-gray-700'
                        }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {isLoading || !profile ? (
                <div className='flex justify-center py-20'>
                    <div className='h-10 w-10 animate-spin rounded-full border-4 border-primary-200 border-t-primary-500' />
                </div>
            ) : (
                <div className='animate-in fade-in slide-in-from-bottom-4'>
                    {activeTab === 'Personal' && (
                        <>
                            <div className='grid grid-cols-1 gap-12 lg:grid-cols-12'>
                                <div className='lg:col-span-4'>
                                    <ProfilePicture
                                        profile={profile}
                                        onUpdated={loadProfile}
                                    />
                                </div>
                                <div className='pt-2 lg:col-span-8'>
                                    <h3 className='mb-6 text-sm font-bold text-gray-900'>
                                        Basic Information
                                    </h3>
                                    <BasicInfoForm
                                        profile={profile}
                                        onUpdated={loadProfile}
                                    />
                                </div>
                            </div>
                            <ResumeManager />
                        </>
                    )}
                    {activeTab === 'Profile' && (
                        <ProfileTab profile={profile} onUpdated={loadProfile} />
                    )}
                    {activeTab === 'Social Links' && (
                        <SocialLinksTab
                            profile={profile}
                            onUpdated={loadProfile}
                        />
                    )}
                    {activeTab === 'Account Setting' && <AccountSettingsTab />}
                </div>
            )}
        </div>
    );
}
