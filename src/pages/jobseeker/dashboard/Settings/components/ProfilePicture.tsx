import { Upload } from 'lucide-react';

export default function ProfilePicture() {
    return (
        <>
            <h3 className='text-sm font-semibold mb-6 text-gray-900 text-left'>
                Basic Information
            </h3>
            <div className='text-xs text-gray-500 mb-3 font-medium uppercase text-left'>
                Profile Picture
            </div>
            <div className='border-2 border-dashed border-gray-100 rounded-xl p-10 flex flex-col items-center justify-center text-center bg-gray-50/20'>
                <div className='w-16 h-16 bg-bg-white rounded-full flex items-center justify-center mb-4 shadow-sm border border-gray-50'>
                    <Upload className='w-6 h-6 text-gray-300' />
                </div>
                <p className='text-sm text-gray-900 font-medium'>
                    Browse photo{' '}
                    <span className='text-gray-400 font-normal'>
                        or drop here
                    </span>
                </p>
                <p className='text-[11px] text-gray-400 mt-2 leading-relaxed max-w-[200px]'>
                    A photo larger than 400 pixels work best. Max photo size 5
                    MB.
                </p>
            </div>
        </>
    );
}
