import { useNavigate } from "react-router-dom";
import PricingCard from "./components/PricingCard";
import PricingIllustration from "../../../assets/PricingIllustration.svg";

const pricingPlans = [
  {
    id: "basic",
    title: "BASIC",
    description:
      "Perfect for growing businesses needing essential hiring tools.",
    price: 19,
    isRecommended: false,
    features: [
      "Post 1 Job",
      "Urgents & Featured Jobs",
      "Highlights Job with Colors",
      "Access & Saved 5 Candidates",
      "10 Days Resume Visibility",
      "24/7 Critical Support",
    ],
  },
  {
    id: "standard",
    title: "STANDARD",
    description:
      "Ideal for active recruiters looking for maximum visibility and reach.",
    price: 39,
    isRecommended: true,
    features: [
      "3 Active Jobs",
      "Urgents & Featured Jobs",
      "Highlights Job with Colors",
      "Access & Saved 10 Candidates",
      "20 Days Resume Visibility",
      "24/7 Critical Support",
    ],
  },
  {
    id: "premium",
    title: "PREMIUM",
    description:
      "Top-tier features for enterprises with high-volume hiring needs.",
    price: 59,
    isRecommended: false,
    features: [
      "5 Active Jobs",
      "Urgents & Featured Jobs",
      "Highlights Job with Colors",
      "Access & Saved 20 Candidates",
      "30 Days Resume Visibility",
      "24/7 Critical Support",
    ],
  },
];

export default function PostJobPricing() {
  const navigate = useNavigate();

  const handleChoosePlan = (planId: string) => {
    navigate(`/employer/checkout?plan=${planId}`);
  };

  return (
    <div className="w-full max-w-7xl mx-auto animate-in fade-in duration-500 pb-12 pt-4">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-12 mb-16 px-4 md:px-0">
        <div className="max-w-2xl">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Buy Premium Subscription to Post a Job
          </h1>
          <p className="text-lg text-gray-500 leading-relaxed">
            Upgrade your hiring experience with our premium plans. Gain
            exclusive access to top-tier candidates, highlight your job postings
            to stand out, and enjoy advanced features designed to accelerate
            your recruitment process.
          </p>
        </div>
        <div className="w-full max-w-sm hidden lg:flex justify-end">
          <img
            src={PricingIllustration}
            alt="Pricing Illustration"
            className="w-full h-auto object-contain max-w-[320px]"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = "none";
              target.parentElement?.classList.add(
                "bg-blue-50",
                "aspect-[4/3]",
                "rounded-2xl",
                "border",
                "border-blue-100",
                "flex",
                "items-center",
                "justify-center",
              );
              target.parentElement!.innerHTML =
                '<span class="text-blue-400 font-medium">Illustration Image</span>';
            }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start px-4 md:px-0">
        {pricingPlans.map((plan) => (
          <PricingCard
            key={plan.id}
            title={plan.title}
            description={plan.description}
            price={plan.price}
            isRecommended={plan.isRecommended}
            features={plan.features}
            onChoose={() => handleChoosePlan(plan.id)}
          />
        ))}
      </div>
    </div>
  );
}
