import React from 'react';

interface StatCardProps {
    count: string | number;
    label: string;
    icon: React.ReactNode;
    variant: 'blue' | 'orange' | 'green';
    onClick?: () => void;
}

const variants = {
    blue: 'bg-blue-50/70 border-blue-50 text-primary-500',
    orange: 'bg-orange-50 border-orange-50/50 text-warning-500',
    green: 'bg-green-50 border-green-50/50 text-success-500',
};

export default function StatCard({
    count,
    label,
    icon,
    variant,
    onClick,
}: StatCardProps) {
    return (
        <div
            onClick={onClick}
            className={`flex items-center justify-between p-6 rounded-xl border transition-transform hover:-translate-y-1 ${variants[variant]}`}
        >
            <div className='text-left'>
                <div className='text-[28px] font-bold text-gray-900'>
                    {count}
                </div>
                <div className='text-[15px] font-medium text-gray-600 mt-1'>
                    {label}
                </div>
            </div>
            <div className='w-14 h-14 bg-white rounded-lg flex items-center justify-center shadow-sm'>
                {icon}
            </div>
        </div>
    );
}
