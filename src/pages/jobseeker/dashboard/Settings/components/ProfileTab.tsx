import { useState } from "react";
import { Calendar, Loader2 } from "lucide-react";
import { toast } from "sonner";
import Button from "../../../../../components/ui/Button";

export default function ProfileTab() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    toast.success("Profile information updated!");
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSave} className="space-y-8 text-left">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Nationality</label>
          <select className="w-full p-3 border border-gray-100 rounded-lg bg-bg-white outline-none focus:border-primary-400 text-gray-600 h-[46px]">
            <option value="">Select...</option>
            <option value="vietnam">Vietnam</option>
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Date of Birth</label>
          <div className="relative">
            <input 
              type="text" 
              placeholder="dd/mm/yyyy" 
              className="w-full p-3 pl-3 pr-10 border border-gray-100 rounded-lg outline-none focus:border-primary-400"
            />
            <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Gender</label>
          <select className="w-full p-3 border border-gray-100 rounded-lg bg-bg-white h-[46px]">
            <option value="">Select...</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Marital Status</label>
          <select className="w-full p-3 border border-gray-100 rounded-lg bg-bg-white h-[46px]">
            <option value="">Select...</option>
            <option value="single">Single</option>
            <option value="married">Married</option>
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Education</label>
          <select className="w-full p-3 border border-gray-100 rounded-lg bg-bg-white h-[46px]">
            <option value="">Select...</option>
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Experience</label>
          <select className="w-full p-3 border border-gray-100 rounded-lg bg-bg-white h-[46px]">
            <option value="">Select...</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700">Biography</label>
        <div className="border border-gray-100 rounded-lg overflow-hidden focus-within:border-primary-400 transition-all">
          <textarea 
            placeholder="Write down your biography here. Let the employers know who you are..."
            className="w-full p-4 min-h-[200px] outline-none resize-none text-gray-600"
          />
          <div className="flex items-center gap-4 px-4 py-3 border-t border-gray-50 bg-gray-50/30">
            <span className="text-gray-400 font-bold hover:text-gray-600 cursor-pointer">B</span>
            <span className="text-gray-400 italic hover:text-gray-600 cursor-pointer">I</span>
            <span className="text-gray-400 underline hover:text-gray-600 cursor-pointer">U</span>
            <span className="text-gray-400 line-through hover:text-gray-600 cursor-pointer">S</span>
            <div className="w-[1px] h-4 bg-gray-200 mx-1" />
            <span className="text-gray-400 hover:text-primary-500 cursor-pointer text-lg">🔗</span>
            <div className="w-[1px] h-4 bg-gray-200 mx-1" />
            <span className="text-gray-400 hover:text-gray-600 cursor-pointer">≡</span>
            <span className="text-gray-400 hover:text-gray-600 cursor-pointer">⦀</span>
          </div>
        </div>
      </div>

      <div className="pt-4">
        <Button variant="primary" className="px-10" disabled={isLoading}>
          {isLoading ? <Loader2 className="animate-spin" size={22} /> : "Save Changes"}
        </Button>
      </div>
    </form>
  );
}