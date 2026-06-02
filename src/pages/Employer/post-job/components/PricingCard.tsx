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
      className={`relative flex flex-col p-8 bg-white rounded-2xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${
        isRecommended
          ? "border-2 border-blue-600 shadow-xl z-10 md:scale-105"
          : "border border-gray-100 shadow-sm mt-4 md:mt-0"
      }`}
    >
      {isRecommended && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-linear-to-r from-blue-600 to-blue-500 text-white px-4 py-1.5 rounded-full text-[10px] uppercase tracking-widest shadow-md whitespace-nowrap">
          Most Popular
        </div>
      )}
      <div className="pb-6 border-b border-gray-100 mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-sm text-gray-500 min-h-10">{description}</p>
        <div className="flex items-end gap-1 mt-4">
          <span className="text-2xl font-bold text-gray-900 mb-1">$</span>
          <span className="text-5xl font-extrabold text-gray-900 tracking-tight">
            {price}
          </span>
          <span className="text-sm text-gray-500 font-medium mb-2">/month</span>
        </div>
      </div>
      <ul className="flex flex-col gap-4 mb-8 flex-1">
        {features.map((feature, index) => (
          <li
            key={index}
            className="flex items-start gap-3 text-sm text-gray-700 font-medium"
          >
            <div className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-50 text-blue-600 shrink-0 mt-0.5">
              <Check size={14} strokeWidth={3} />
            </div>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <button
        onClick={onChoose}
        className={`group w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold transition-all duration-300 ${
          isRecommended
            ? "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/20"
            : "bg-gray-50 text-gray-900 border border-gray-200 hover:bg-blue-500 hover:border-blue-700 hover:text-white"
        }`}
      >
        Choose Plan
        <ArrowRight
          size={18}
          className="transition-transform group-hover:translate-x-1"
        />
      </button>
    </div>
  );
}
