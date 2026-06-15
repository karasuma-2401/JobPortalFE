interface JobMainContentProps {
    description: string;
    requirements: string[];
}

export default function JobMainContent({
    description,
    requirements,
}: JobMainContentProps) {
    return (
        <div className='bg-white rounded-2xl border border-gray-100 shadow-sm p-8'>
            <h3 className='text-lg font-bold text-gray-900 mb-4'>
                Job Description
            </h3>
            <p
                className='text-gray-600 leading-relaxed mb-8'
                dangerouslySetInnerHTML={{
                    __html: description || 'No description provided',
                }}
            />

            <h3 className='text-lg font-bold text-gray-900 mb-4'>
                Requirements
            </h3>
            <ul className='flex flex-col gap-3 mb-8'>
                {requirements.map((req, index) => (
                    <li
                        key={index}
                        className='flex items-start gap-3 text-gray-600'
                    >
                        <div className='w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 shrink-0' />
                        <div
                            className='leading-relaxed flex-1'
                            dangerouslySetInnerHTML={{ __html: req }}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
}
