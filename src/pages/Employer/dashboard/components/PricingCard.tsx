import { Check, ArrowRight } from "lucide-react";

interface PricingCardProps {
  title: string;
  description: string;
  price: number;
  isRecommended?: boolean;
  features: string[];
  onChoose: () => void;
}

export default function PricingCard({
  title,
  description,
  price,
  isRecommended,
  features,
  onChoose,
}: PricingCardProps) {
  return (
    <div
      className={`relative flex flex-col p-8 bg-white rounded-xl ${
        isRecommended
          ? "border-2 border-blue-600 shadow-xl z-10 scale-105"
          : "border border-gray-200 mt-4"
      }`}
    >
      {isRecommended && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white px-4 py-1 rounded-md text-sm font-semibold">
          Recommendation
        </div>
      )}
      <h3 className="text-lg font-bold text-gray-900 uppercase tracking-wider mb-2">
        {title}
      </h3>
      <p className="text-sm text-gray-500 mb-6">{description}</p>
      <div className="flex items-baseline gap-1 mb-8">
        <span className="text-4xl font-extrabold text-blue-600">${price}</span>
        <span className="text-gray-500 font-medium">/Monthly</span>
      </div>
      <ul className="flex flex-col gap-4 mb-8 flex-1">
        {features.map((feature, index) => (
          <li
            key={index}
            className="flex items-center gap-3 text-sm text-gray-700"
          >
            <Check size={18} className="text-blue-600 shrink-0" />
            {feature}
          </li>
        ))}
      </ul>
      <button
        onClick={onChoose}
        className={`w-full flex items-center justify-center gap-2 py-3 rounded-md font-semibold transition-colors ${
          isRecommended
            ? "bg-blue-600 text-white hover:bg-blue-700"
            : "bg-blue-50 text-blue-600 hover:bg-blue-100"
        }`}
      >
        Choose Plan <ArrowRight size={18} />
      </button>
    </div>
  );
}
