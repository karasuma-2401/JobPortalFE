import { Check, X } from "lucide-react";

export default function PlanBenefitsCard() {
  return (
    <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm flex flex-col h-full">
      <h3 className="text-sm font-bold text-gray-900 mb-2">Plan Benefits</h3>
      <p className="text-xs text-gray-500 mb-6">
        Proin porta enim sit amet placerat finibus. Sed eget laoreet lorem
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 mb-8">
        <div className="flex items-center gap-3 text-sm text-gray-700">
          <Check size={16} className="text-blue-600 shrink-0" />
          <span>Urgents & Featured Jobs</span>
        </div>
        <div className="flex items-center gap-3 text-sm text-gray-700">
          <Check size={16} className="text-blue-600 shrink-0" />
          <span>Highlights Job with Colors</span>
        </div>
        <div className="flex items-center gap-3 text-sm text-gray-700">
          <Check size={16} className="text-blue-600 shrink-0" />
          <span>Access & Saved 20 Candidates</span>
        </div>
        <div className="flex items-center gap-3 text-sm text-gray-700">
          <Check size={16} className="text-blue-600 shrink-0" />
          <span>60 Days Resume Visibility</span>
        </div>
        <div className="flex items-center gap-3 text-sm text-gray-700">
          <Check size={16} className="text-blue-600 shrink-0" />
          <span>24/7 Critical Support</span>
        </div>
      </div>
      <div className="pt-6 border-t border-gray-100">
        <p className="text-xs text-gray-400 mb-4">Remaining</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
          <div className="flex items-center gap-3 text-sm text-gray-500">
            <div className="p-0.5 rounded-full border boder-red-200 text-red-500 shrink-0">
              <X size={12} />
            </div>
            <span>9 Resume Access</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-500">
            <div className="p-0.5 rounded-full border border-red-200 text-red-500 shrink-0">
              <X size={12} />
            </div>
            <span>21 Days resume visibility</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-500">
            <div className="p-0.5 rounded-full border border-red-200 text-red-500 shrink-0">
              <X size={12} />
            </div>
            <span>4 Active Jobs</span>
          </div>
        </div>
      </div>
    </div>
  );
}
