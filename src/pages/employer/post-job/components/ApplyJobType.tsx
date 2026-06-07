interface ApplyJobTypeProps {
    value: string;
    onChange: (value: string) => void;
}

export default function ApplyJobType({ value, onChange }: ApplyJobTypeProps) {
    const options = [
        {
            id: 'myjob',
            title: 'On MyJob',
            description:
                'Candidate will apply job using MyJob & all application will show on your dashboard.',
        },
        {
            id: 'external',
            title: 'External Platform',
            description:
                'Candidate apply job on your website, all application on your own website.',
        },
        {
            id: 'email',
            title: 'On Your Email',
            description:
                'Candidate apply job on your email address, and all application in your email.',
        },
    ];

    return (
        <div className='bg-gray-50 p-6 rounded-xl border border-gray-100 mt-6'>
            <h3 className='text-sm font-bold text-gray-900 mb-4'>
                Apply Job on:
            </h3>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                {options.map((option) => (
                    <div
                        key={option.id}
                        onClick={() => onChange(option.id)}
                        className={`flex gap-3 p-4 rounded-lg border cursor-pointer transition-colors bg-white ${
                            value === option.id
                                ? 'border-blue-600 ring-1 ring-blue-600'
                                : 'border-gray-200 hover:border-blue-300'
                        }`}
                    >
                        <div className='shrink-0 mt-0.5'>
                            <div
                                className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                                    value === option.id
                                        ? 'border-blue-600'
                                        : 'border-gray-300'
                                }`}
                            >
                                {value === option.id && (
                                    <div className='w-2 h-2 rounded-full bg-blue-600' />
                                )}
                            </div>
                        </div>
                        <div>
                            <h4 className='text-sm font-semibold text-gray-900 mb-1'>
                                {option.title}
                            </h4>
                            <p className='text-xs text-gray-500 leading-relaxed'>
                                {option.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
