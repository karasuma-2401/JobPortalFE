import { useState } from 'react';
import { Bell, KeyRound } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminSettingsPage() {
    const [passwordForm, setPasswordForm] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    const [settings, setSettings] = useState({
        emailNotifications: true,
        pushNotifications: false,
        twoFactorAuth: true,
    });

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value });
    };

    const handlePasswordSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (passwordForm.newPassword !== passwordForm.confirmPassword) {
            toast.error('New passwords do not match!');
            return;
        }
        toast.success('Password updated successfully!');
        setPasswordForm({
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
        });
    };

    const toggleSetting = (key: keyof typeof settings) => {
        setSettings((prev) => {
            const newValue = !prev[key];
            toast.info(`Setting updated successfully.`);
            return { ...prev, [key]: newValue };
        });
    };

    return (
        <div className='w-full max-w-4xl mx-auto animate-in fade-in duration-500 pb-16'>
            <div className='mb-8'>
                <h1 className='text-2xl font-bold text-gray-900'>
                    Account Settings
                </h1>
                <p className='text-gray-500 mt-1'>
                    Manage your security and notification preferences.
                </p>
            </div>

            <div className='flex flex-col gap-8'>
                <div className='bg-white p-8 rounded-2xl border border-gray-200 shadow-sm'>
                    <div className='flex items-center gap-3 mb-6 pb-6 border-b border-gray-100'>
                        <div className='w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600'>
                            <KeyRound size={20} />
                        </div>
                        <div>
                            <h2 className='text-lg font-bold text-gray-900'>
                                Change Password
                            </h2>
                            <p className='text-sm text-gray-500'>
                                Ensure your account is using a long, random
                                password to stay secure.
                            </p>
                        </div>
                    </div>

                    <form
                        onSubmit={handlePasswordSubmit}
                        className='flex flex-col gap-5 max-w-xl'
                    >
                        <div className='flex flex-col gap-2'>
                            <label className='text-sm font-bold text-gray-700'>
                                Current Password
                            </label>
                            <input
                                type='password'
                                name='currentPassword'
                                value={passwordForm.currentPassword}
                                onChange={handlePasswordChange}
                                className='w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all'
                                required
                            />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <label className='text-sm font-bold text-gray-700'>
                                New Password
                            </label>
                            <input
                                type='password'
                                name='newPassword'
                                value={passwordForm.newPassword}
                                onChange={handlePasswordChange}
                                className='w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all'
                                required
                            />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <label className='text-sm font-bold text-gray-700'>
                                Confirm New Password
                            </label>
                            <input
                                type='password'
                                name='confirmPassword'
                                value={passwordForm.confirmPassword}
                                onChange={handlePasswordChange}
                                className='w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all'
                                required
                            />
                        </div>
                        <div className='pt-2'>
                            <button
                                type='submit'
                                className='px-6 py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition-colors'
                            >
                                Update Password
                            </button>
                        </div>
                    </form>
                </div>

                <div className='bg-white p-8 rounded-2xl border border-gray-200 shadow-sm'>
                    <div className='flex items-center gap-3 mb-6 pb-6 border-b border-gray-100'>
                        <div className='w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600'>
                            <Bell size={20} />
                        </div>
                        <div>
                            <h2 className='text-lg font-bold text-gray-900'>
                                Notifications
                            </h2>
                            <p className='text-sm text-gray-500'>
                                Choose what updates you want to receive.
                            </p>
                        </div>
                    </div>

                    <div className='flex flex-col gap-6'>
                        <div className='flex items-center justify-between'>
                            <div>
                                <p className='font-bold text-gray-900'>
                                    Email Notifications
                                </p>
                                <p className='text-sm text-gray-500 mt-1'>
                                    Receive daily reports and system alerts via
                                    email.
                                </p>
                            </div>
                            <button
                                onClick={() =>
                                    toggleSetting('emailNotifications')
                                }
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                    settings.emailNotifications
                                        ? 'bg-blue-600'
                                        : 'bg-gray-200'
                                }`}
                            >
                                <span
                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                        settings.emailNotifications
                                            ? 'translate-x-6'
                                            : 'translate-x-1'
                                    }`}
                                />
                            </button>
                        </div>

                        <div className='w-full h-px bg-gray-100'></div>

                        <div className='flex items-center justify-between'>
                            <div>
                                <p className='font-bold text-gray-900'>
                                    Push Notifications
                                </p>
                                <p className='text-sm text-gray-500 mt-1'>
                                    Get real-time alerts on your browser.
                                </p>
                            </div>
                            <button
                                onClick={() =>
                                    toggleSetting('pushNotifications')
                                }
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                    settings.pushNotifications
                                        ? 'bg-blue-600'
                                        : 'bg-gray-200'
                                }`}
                            >
                                <span
                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                        settings.pushNotifications
                                            ? 'translate-x-6'
                                            : 'translate-x-1'
                                    }`}
                                />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
