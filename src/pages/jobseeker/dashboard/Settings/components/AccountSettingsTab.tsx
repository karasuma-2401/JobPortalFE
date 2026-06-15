import { useState } from 'react';
import { Mail, Loader2, MapPin, Phone } from 'lucide-react';
import { toast } from 'sonner';
import Input from '../../../../../components/ui/Input';
import Button from '../../../../../components/ui/Button';
import ComboBox, {
    type OptionType,
} from '../../../../../components/ui/ComboBox';

const CountryCodes: OptionType[] = [
    { label: '+84 (VN)', value: '+84' },
    { label: '+1 (US)', value: '+1' },
];

export default function AccountSettingsTab() {
    const [isLoading, setIsLoading] = useState(false);
    const [countryCode, setCountryCode] = useState<OptionType>(CountryCodes[0]);

    const handleSave = async (section: string) => {
        setIsLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        toast.success(`${section} updated successfully!`);
        setIsLoading(false);
    };

    return (
        <div className='space-y-10 text-left animate-in fade-in duration-500 pb-10'>
            {/* Section: Contact Info */}
            <section className='space-y-6'>
                <h3 className='text-base font-bold text-gray-900'>
                    Contact Information
                </h3>

                <div className='grid grid-cols-1 gap-6'>
                    <div className='flex flex-col gap-2'>
                        <label className='text-sm font-bold text-gray-900 flex items-center gap-2'>
                            <MapPin size={16} className='text-primary-500' />
                            Map Location
                        </label>
                        <Input placeholder='Enter your address...' />
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                        <div className='flex flex-col gap-2'>
                            <label className='text-sm font-bold text-gray-900 flex items-center gap-2'>
                                <Phone size={16} className='text-primary-500' />
                                Phone Number
                            </label>
                            <div className='flex gap-3'>
                                <div className='w-32'>
                                    <ComboBox
                                        options={CountryCodes}
                                        value={countryCode}
                                        onChange={setCountryCode}
                                    />
                                </div>
                                <div className='flex-1'>
                                    <Input
                                        type='tel'
                                        placeholder='090 123 4567'
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <label className='text-sm font-bold text-gray-900 flex items-center gap-2'>
                                <Mail size={16} className='text-primary-500' />
                                Email Address
                            </label>
                            <Input
                                type='email'
                                placeholder='email@example.com'
                            />
                        </div>
                    </div>
                </div>
                <Button
                    variant='primary'
                    onClick={() => handleSave('Contact Info')}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <Loader2 className='animate-spin' size={20} />
                    ) : (
                        'Save Changes'
                    )}
                </Button>
            </section>

            {/* Section: Password */}
            <section className='pt-10 border-t border-gray-100 space-y-6'>
                <h3 className='text-base font-bold text-gray-900'>
                    Change Password
                </h3>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                    <Input
                        label='Current Password'
                        type='password'
                        placeholder='••••••••'
                    />
                    <Input
                        label='New Password'
                        type='password'
                        placeholder='••••••••'
                    />
                    <Input
                        label='Confirm Password'
                        type='password'
                        placeholder='••••••••'
                    />
                </div>
                <Button
                    variant='primary'
                    onClick={() => handleSave('Password')}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <Loader2 className='animate-spin' size={20} />
                    ) : (
                        'Change Password'
                    )}
                </Button>
            </section>
        </div>
    );
}
