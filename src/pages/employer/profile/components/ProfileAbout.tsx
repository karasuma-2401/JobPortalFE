interface ProfileAboutProps {
    aboutUs: string;
    vision: string;
}

export default function ProfileAbout({ aboutUs, vision }: ProfileAboutProps) {
    return (
        <div className='bg-white rounded-xl shadow-sm border border-gray-100 p-8 flex flex-col gap-8'>
            <section>
                <h2 className='text-lg font-bold text-gray-900 mb-4'>
                    About Us
                </h2>
                <div
                    className='text-sm text-gray-700 leading-relaxed max-w-none prose prose-sm'
                    dangerouslySetInnerHTML={{
                        __html: aboutUs || 'No description provided.',
                    }}
                />
            </section>

            <div className='w-full h-px bg-gray-100'></div>

            <section>
                <h2 className='text-lg font-bold text-gray-900 mb-4'>
                    Company Vision
                </h2>
                <div
                    className='text-sm text-gray-700 leading-relaxed whitespace-pre-line p-6 bg-blue-50/50 rounded-lg border border-blue-100 italic'
                    dangerouslySetInnerHTML={{
                        __html: vision || 'No vision provided',
                    }}
                ></div>
            </section>
        </div>
    );
}
