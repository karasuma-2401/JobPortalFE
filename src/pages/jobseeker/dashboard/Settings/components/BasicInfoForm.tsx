import { useState } from 'react';
import { Globe, Loader2, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';
import type { ApiError } from '../../../../../api/api';
import Input from '../../../../../components/ui/Input';
import Button from '../../../../../components/ui/Button';

export default function BasicInfoForm() {
    const [fullName, setFullName] = useState('');
    const [title, setTitle] = useState('');
    const [experience, setExperience] = useState('');
    const [education, setEducation] = useState('');
    const [website, setWebsite] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSaveChanges = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!fullName || !title) {
            toast.error('Please fill in your full name and headline title.');
            return;
        }

        try {
            setIsLoading(true);
            await new Promise((resolve) => setTimeout(resolve, 1000)); // Giả lập gọi API
            toast.success('Profile updated successfully');
        } catch (error) {
            toast.error((error as ApiError).message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSaveChanges} className='space-y-5'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                <div className='flex flex-col gap-2 text-left'>
                    <label className='text-sm font-medium text-gray-700'>
                        Full name
                    </label>
                    <Input
                        type='text'
                        placeholder='Full name'
                        value={fullName}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setFullName(e.target.value)
                        }
                    />
                </div>
                <div className='flex flex-col gap-2 text-left'>
                    <label className='text-sm font-medium text-gray-700'>
                        Title/headline
                    </label>
                    <Input
                        type='text'
                        placeholder='Title/headline'
                        value={title}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setTitle(e.target.value)
                        }
                    />
                </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                <div className='flex flex-col gap-2 text-left'>
                    <label className='text-sm font-medium text-gray-700'>
                        Experience
                    </label>
                    <select
                        value={experience}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                            setExperience(e.target.value)
                        }
                        className='w-full p-3 border border-gray-100 rounded-lg bg-bg-white outline-none focus:border-primary-400 text-gray-600 cursor-pointer h-[46px]'
                    >
                        <option value=''>Select...</option>
                        <option value='internship'>Internship</option>
                        <option value='junior'>Junior</option>
                        <option value='senior'>Senior</option>
                    </select>
                </div>
                <div className='flex flex-col gap-2 text-left'>
                    <label className='text-sm font-medium text-gray-700'>
                        Educations
                    </label>
                    <select
                        value={education}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                            setEducation(e.target.value)
                        }
                        className='w-full p-3 border border-gray-100 rounded-lg bg-bg-white outline-none focus:border-primary-400 text-gray-600 cursor-pointer h-[46px]'
                    >
                        <option value=''>Select...</option>
                        <option value='bachelor'>Bachelor Degree</option>
                        <option value='master'>Master Degree</option>
                    </select>
                </div>
            </div>

            <div className='flex flex-col gap-2 text-left'>
                <label className='text-sm font-medium text-gray-700'>
                    Personal Website
                </label>
                <div className='relative'>
                    <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-primary-500 z-10'>
                        <Globe size={18} />
                    </div>
                    <Input
                        type='text'
                        placeholder='Website url...'
                        className='pl-10'
                        value={website}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setWebsite(e.target.value)
                        }
                    />
                </div>
            </div>

            <div className='text-left pt-2'>
                <Button variant='primary' className='px-8' disabled={isLoading}>
                    {isLoading ? (
                        <Loader2 className='animate-spin' size={20} />
                    ) : (
                        <>
                            Save Changes <ArrowRight size={20} />
                        </>
                    )}
                </Button>
            </div>
        </form>
    );
}
