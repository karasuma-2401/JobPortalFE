import { useNavigate } from 'react-router-dom';
import PricingCard from './components/PricingCard';
import PricingIllustration from '../../../assets/PricingIllustration.svg';
import PricingCardsSkeleton from './components/PricingCardsSkeleton';
import { usePlans } from '../../../hooks/usePayment';

export default function PostJobPricing() {
    const navigate = useNavigate();
    const { data: plans, isLoading, isError } = usePlans();

    const handleChoosePlan = (planId: string | number) => {
        navigate(`/employer/checkout?plan=${planId}`);
    };

    return (
        <div className='w-full max-w-7xl mx-auto animate-in fade-in duration-500 pb-12 pt-4'>
            <div className='flex flex-col lg:flex-row items-center justify-between gap-12 mb-16 px-4 md:px-0'>
                <div className='max-w-2xl'>
                    <h1 className='text-3xl font-bold text-gray-900 mb-4'>
                        Buy Premium Subscription to Post a Job
                    </h1>
                    <p className='text-lg text-gray-500 leading-relaxed'>
                        Upgrade your hiring experience with our premium plans.
                        Gain exclusive access to top-tier candidates, highlight
                        your job postings to stand out, and enjoy advanced
                        features designed to accelerate your recruitment
                        process.
                    </p>
                </div>
                <div className='w-full max-w-sm hidden lg:flex justify-end'>
                    <img
                        src={PricingIllustration}
                        alt='Pricing Illustration'
                        className='w-full h-auto object-contain max-w-[320px]'
                        onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            target.parentElement?.classList.add(
                                'bg-blue-50',
                                'aspect-[4/3]',
                                'rounded-2xl',
                                'border',
                                'border-blue-100',
                                'flex',
                                'items-center',
                                'justify-center'
                            );
                            target.parentElement!.innerHTML =
                                '<span class="text-blue-400 font-medium">Illustration Image</span>';
                        }}
                    />
                </div>
            </div>
            {isLoading ? (
                <PricingCardsSkeleton />
            ) : isError || !plans ? (
                <div className='flex flex-col items-center justify-center min-h-75'>
                    <p className='text-red-500 font-medium'>
                        Failed to load pricing plans.
                    </p>
                </div>
            ) : (
                <div className='grid grid-cols-1 md:grid-cols-3 gap-8 items-start px-4 md:px-0'>
                    {plans.map((plan) => (
                        <PricingCard
                            key={plan.id}
                            title={plan.name}
                            description={`Valid for ${plan.duration} days. Post up to ${plan.maxJobPostsPerMonth} jobs.`}
                            price={plan.price}
                            isRecommended={plan.priority === 1}
                            features={[
                                `Post up to ${plan.maxJobPostsPerMonth} Jobs`,
                                `Access up to ${plan.maxResumeAccess} Resumes`,
                                plan.allowHighlight
                                    ? 'Highlights Job with Colors'
                                    : 'Standard Job Display',
                                plan.featureDurationDays > 0
                                    ? `Featured on Top for ${plan.featureDurationDays} Days`
                                    : 'No Featured Status',
                                `${plan.duration} Days Plan Duration`,
                                '24/7 Critical Support',
                            ]}
                            onChoose={() => handleChoosePlan(plan.id)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
