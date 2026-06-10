import { useState } from 'react';
import { MapPin, Mail } from 'lucide-react';
import { toast } from 'sonner';
import Button from '../../../../../components/ui/Button';
import Input from '../../../../../components/ui/Input';
import useAuth from '../../../../../contexts/auth/useAuth';
import { useNavigate } from 'react-router';
export default function AccountSettingsTab() {
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState('example@gmail.com');
    const navigate = useNavigate() 
    const {logout} = useAuth() 
    const handleSave = async (section: string) => {
        setIsLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        toast.success(`${section} updated successfully!`);
        setIsLoading(false);
    };
    const handleLogout = () => {
        logout() 
        navigate('/') 
    }
    return (
        <div className='space-y-12 text-left animate-fade-in pb-10'>
            {/* SECTION 1: CONTACT INFO */}
            <section className='space-y-6'>
                <h3 className='text-lg font-bold text-gray-900'>
                    Contact Info
                </h3>
                <div className='grid grid-cols-1 gap-5'>
                    <div className='flex flex-col gap-2'>
                        <label className='text-sm font-medium text-gray-700'>
                            Map Location
                        </label>
                        <div className='relative'>
                            <Input
                                placeholder='Enter your location...'
                                className='pl-10'
                            />
                            <MapPin
                                className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400'
                                size={18}
                            />
                        </div>
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                        <div className='flex flex-col gap-2'>
                            <label className='text-sm font-medium text-gray-700'>
                                Phone
                            </label>
                            <div className='flex gap-2'>
                                <div className='w-24 shrink-0'>
                                    <select className='w-full h-[46px] px-2 border border-gray-100 rounded-lg bg-gray-50 text-sm outline-none'>
                                        <option>+84</option>
                                    </select>
                                </div>
                                <Input
                                    type='tel'
                                    placeholder='Phone number...'
                                />
                            </div>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <label className='text-sm font-medium text-gray-700'>
                                Email
                            </label>
                            <div className='relative'>
                                <Input
                                    type='email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className='pl-10 pr-10 border-green-100 bg-green-50/20'
                                />
                                <Mail
                                    className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400'
                                    size={18}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <Button
                    variant='primary'
                    onClick={() => handleSave('Contact Info')}
                    disabled={isLoading}
                    className='px-8'
                >
                    Save Changes
                </Button>
            </section>

            {/* SECTION 2: NOTIFICATION */}
            <section className='pt-10 border-t border-gray-100 space-y-6'>
                <h3 className='text-lg font-bold text-gray-900'>
                    Notification
                </h3>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-10'>
                    {[
                        'Notify me when employers shortlisted me',
                        'Notify me when employers saved my profile',
                        'Notify me when my applied jobs are expire',
                        'Notify me when employers rejected me',
                        'Notify me when I have up to 5 job alerts',
                    ].map((item, idx) => (
                        <label
                            key={idx}
                            className='flex items-center gap-3 cursor-pointer group'
                        >
                            <input
                                type='checkbox'
                                defaultChecked={
                                    idx === 0 || idx === 2 || idx === 4
                                }
                                className='w-5 h-5 rounded border-gray-300 text-primary-500 focus:ring-primary-500'
                            />
                            <span className='text-sm text-gray-600 group-hover:text-gray-900 transition-colors'>
                                {item}
                            </span>
                        </label>
                    ))}
                </div>
            </section>

            {/* SECTION 3: JOB ALERTS */}
            <section className='pt-10 border-t border-gray-100 space-y-6'>
                <h3 className='text-lg font-bold text-gray-900'>Job Alerts</h3>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                    <div className='flex flex-col gap-2'>
                        <label className='text-sm font-medium text-gray-700'>
                            Role
                        </label>
                        <Input placeholder='Your job roles' />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label className='text-sm font-medium text-gray-700'>
                            Location
                        </label>
                        <Input placeholder='City, state, country name' />
                    </div>
                </div>
                <Button
                    variant='primary'
                    onClick={() => handleSave('Job Alerts')}
                    className='px-8'
                >
                    Save Changes
                </Button>
            </section>

            {/* SECTION 4: PRIVACY */}
            <section className='pt-10 border-t border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-10'>
                <div className='space-y-4'>
                    <h3 className='text-sm font-bold text-gray-900'>
                        Profile Privacy
                    </h3>
                    <div className='flex items-center gap-3 p-1 bg-gray-50 rounded-lg w-fit'>
                        <button className='px-4 py-2 bg-primary-500 text-white rounded-md text-xs font-bold shadow-sm'>
                            YES
                        </button>
                        <span className='text-xs text-gray-400 px-2 font-medium'>
                            Your profile is public now
                        </span>
                        <button className='px-4 py-2 text-gray-400 text-xs font-bold'>
                            NO
                        </button>
                    </div>
                </div>
                <div className='space-y-4'>
                    <h3 className='text-sm font-bold text-gray-900'>
                        Resume Privacy
                    </h3>
                    <div className='flex items-center gap-3 p-1 bg-gray-50 rounded-lg w-fit'>
                        <button className='px-4 py-2 text-gray-400 text-xs font-bold'>
                            YES
                        </button>
                        <button className='px-4 py-2 bg-white text-gray-900 rounded-md text-xs font-bold shadow-sm border border-gray-100'>
                            NO
                        </button>
                        <span className='text-xs text-gray-400 px-2 font-medium italic'>
                            Your resume is private now
                        </span>
                    </div>
                </div>
            </section>

            {/* SECTION 5: CHANGE PASSWORD */}
            <section className='pt-10 border-t border-gray-100 space-y-6'>
                <h3 className='text-lg font-bold text-gray-900'>
                    Change Password
                </h3>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
                    {['current', 'new', 'confirm'].map((field) => (
                        <div key={field} className='flex flex-col gap-2'>
                            <label className='text-sm font-medium text-gray-700 capitalize'>
                                {field} Password
                            </label>

                            <Input type='password' placeholder='Password' />
                        </div>
                    ))}
                </div>
                <Button
                    variant='primary'
                    onClick={() => handleSave('Password')}
                    className='px-8'
                >
                    Change Password
                </Button>
            </section>

            {/* SECTION 6: DELETE ACCOUNT */}
            <section className='pt-10 border-t border-gray-100 space-y-4'>
                {/* <h3 className='text-lg font-bold text-gray-900'>
                    Delete Your Account
                </h3>
                <p className='text-sm text-gray-500 leading-relaxed max-w-2xl'>
                    If you delete your jobseeker account, you will no longer be
                    able to get information about the matched jobs, following
                    employers, and job alerts, shortlisted jobs and applications
                    received from the services of jobpilot.com.
                </p> */}
                <button 
                    onClick={handleLogout}
                    className='border-danger-500 rounded-lg border-2 text-danger-500 font-bold text-base cursor-pointer px-6 py-4'>
                    {/* <Trash2 size={18} /> Close Account */}
                    Logout
                </button>
            </section>
        </div>
    );
}
