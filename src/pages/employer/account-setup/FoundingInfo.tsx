import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowRight, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

import Input from '../../../components/ui/Input';
import ComboBox, { type OptionType } from '../../../components/ui/ComboBox';
import Button from '../../../components/ui/Button';
import RichTextEditor from '../../../components/ui/RichTextEditor';
import CustomDatePicker from '../../../components/ui/DatePicker';
import {
    useEmployerProfile,
    useUpdateEmployerProfile,
} from '../../../hooks/useEmployer';
import { useIndustries } from '../../../hooks/useIndustries';

const orgTypes = [
    { label: 'Private Company', value: 'PRIVATE_COMPANY' },
    { label: 'Public Company', value: 'PUBLIC_COMPANY' },
    { label: 'Non-profit', value: 'NON_PROFIT' },
];

const teamSizes = [
    { label: '1 - 50 Employees', value: '1-50' },
    { label: '51 - 200 Employees', value: '51-200' },
    { label: '201 - 500 Employees', value: '201-500' },
];

interface FoundingInfoProps {
    mode?: 'setup' | 'settings';
}

export default function FoundingInfo({ mode = 'setup' }: FoundingInfoProps) {
    const navigate = useNavigate();
    const location = useLocation();
    const previousState = location.state || {};

    const { data: profile } = useEmployerProfile();
    const { mutate: updateProfile, isPending: isUpdating } =
        useUpdateEmployerProfile();

    const { data: industriesData = [] } = useIndustries();

    const dynamicIndustryTypes = useMemo(() => {
        return industriesData.map((ind) => ({
            label: ind.name,
            value: ind.name,
        }));
    }, [industriesData]);

    const parseDate = (dStr: string) => (dStr ? new Date(dStr) : null);
    const formatDate = (date: Date | null) => {
        if (!date) return '';
        const y = date.getFullYear();
        const m = String(date.getMonth() + 1).padStart(2, '0');
        const d = String(date.getDate()).padStart(2, '0');
        return `${y}-${m}-${d}`;
    };
    const [orgType, setOrgType] = useState<OptionType | null>(
        mode === 'setup'
            ? orgTypes.find(
                  (o) => o.value === previousState.organizationType
              ) || null
            : null
    );

    const [industry, setIndustry] = useState<OptionType | null>(
        mode === 'setup' && previousState.industry
            ? { label: previousState.industry, value: previousState.industry }
            : null
    );

    const [teamSize, setTeamSize] = useState<OptionType | null>(
        mode === 'setup'
            ? teamSizes.find((t) => t.value === previousState.teamSize) || null
            : null
    );

    const [establishedYear, setEstablishedYear] = useState(
        mode === 'setup' ? previousState.founded || '' : ''
    );

    const [website, setWebsite] = useState(
        mode === 'setup' ? previousState.companyWebsite || '' : ''
    );

    const [vision, setVision] = useState(
        mode === 'setup' ? previousState.vision || '' : ''
    );

    useEffect(() => {
        if (mode === 'settings' && profile) {
            const timer = setTimeout(() => {
                setOrgType(
                    orgTypes.find(
                        (o) => o.value === profile.organizationType
                    ) || null
                );
                setTeamSize(
                    teamSizes.find((t) => t.value === profile.teamSize) || null
                );
                setEstablishedYear(profile.founded || '');
                setWebsite(profile.companyWebsite || '');
                setVision(profile.vision || '');

                if (dynamicIndustryTypes.length > 0) {
                    setIndustry(
                        dynamicIndustryTypes.find(
                            (i) => i.value === profile.industry
                        ) || null
                    );
                }
            }, 0);
            return () => clearTimeout(timer);
        }
    }, [mode, profile, dynamicIndustryTypes]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!website) {
            toast.error('Company website is required!');
            return;
        }

        if (mode === 'setup') {
            const currentData = {
                ...previousState,
                organizationType: orgType?.value || '',
                industry: industry?.value || '',
                teamSize: teamSize?.value || '',
                founded: establishedYear,
                companyWebsite: website,
                vision,
            };
            navigate('/employer/setup/social', { state: currentData });
        } else {
            const formData = new FormData();
            if (orgType) formData.append('organizationType', orgType.value);
            if (industry) formData.append('industry', industry.value);
            if (teamSize) formData.append('teamSize', teamSize.value);
            formData.append('founded', establishedYear);
            formData.append('companyWebsite', website);
            formData.append('vision', vision);

            updateProfile(formData);
        }
    };

    const handlePrevious = () =>
        navigate('/employer/setup/company', { state: previousState });

    return (
        <div className='w-full bg-white animate-in fade-in duration-500'>
            <form onSubmit={handleSubmit} className='flex flex-col gap-6'>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                    <div className='flex flex-col gap-2 relative'>
                        <label className='text-sm font-medium text-gray-900'>
                            Organization Type
                        </label>
                        <ComboBox
                            options={orgTypes}
                            value={orgType}
                            placeholder='Select...'
                            onChange={setOrgType}
                        />
                    </div>
                    <div className='flex flex-col gap-2 relative'>
                        <label className='text-sm font-medium text-gray-900'>
                            Industry Types
                        </label>
                        <ComboBox
                            options={dynamicIndustryTypes}
                            value={industry}
                            placeholder='Select...'
                            onChange={setIndustry}
                        />
                    </div>
                    <div className='flex flex-col gap-2 relative'>
                        <label className='text-sm font-medium text-gray-900'>
                            Team Size
                        </label>
                        <ComboBox
                            options={teamSizes}
                            value={teamSize}
                            placeholder='Select...'
                            onChange={setTeamSize}
                        />
                    </div>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <div className='flex flex-col gap-2'>
                        <label className='text-sm font-medium text-gray-900'>
                            Year of Establishment
                        </label>
                        <CustomDatePicker
                            placeholder='dd/mm/yyyy'
                            onChange={(date) =>
                                setEstablishedYear(formatDate(date))
                            }
                            selected={parseDate(establishedYear)}
                        />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label className='text-sm font-medium text-gray-900'>
                            Company Website
                        </label>
                        <Input
                            type='url'
                            placeholder='Website url...'
                            value={website}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => setWebsite(e.target.value)}
                        />
                    </div>
                </div>
                <div className='flex flex-col gap-2'>
                    <label className='text-sm font-medium text-gray-900'>
                        Company Vision
                    </label>
                    <RichTextEditor
                        value={vision}
                        onChange={setVision}
                        placeholder='Tell us about your company vision...'
                    />
                </div>
                <div className='flex items-center gap-4 mt-2'>
                    {mode === 'setup' && (
                        <button
                            type='button'
                            onClick={handlePrevious}
                            className='px-6 py-3 font-semibold rounded-md bg-gray-100 text-gray-900 hover:bg-gray-200 transition-colors'
                        >
                            Previous
                        </button>
                    )}
                    <Button
                        variant='primary'
                        type='submit'
                        disabled={isUpdating}
                        className={
                            mode === 'setup' ? 'flex items-center gap-2' : ''
                        }
                    >
                        {isUpdating ? (
                            <Loader2
                                className='animate-spin mx-auto'
                                size={20}
                            />
                        ) : mode === 'setup' ? (
                            <>
                                Save & Next <ArrowRight size={18} />
                            </>
                        ) : (
                            'Save Changes'
                        )}
                    </Button>
                </div>
            </form>
        </div>
    );
}
