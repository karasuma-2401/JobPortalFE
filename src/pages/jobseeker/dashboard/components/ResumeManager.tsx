import { useState } from "react";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import ResumeCard from "./ResumeCard";

export default function ResumeManager() {
  const [resumes, setResumes] = useState([
    { id: "1", name: "Professional Resume", size: "3.5 MB" },
    { id: "2", name: "Product Designer", size: "4.7 MB" },
    { id: "3", name: "Visual Designer", size: "1.3 MB" },
  ]);

  const handleDeleteResume = (id: string) => {
    setResumes(resumes.filter((item) => item.id !== id));
    toast.success("Resume removed successfully");
  };

  return (
    <div className="mt-16 pt-10 border-t border-gray-100 text-left">
      <h3 className="text-lg font-bold mb-8 text-gray-900">Your Cv/Resume</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        {resumes.map((item) => (
          <ResumeCard key={item.id} resume={item} onDelete={handleDeleteResume} />
        ))}

        {/* Horizontal Add Button */}
        <button
          type="button"
          className="flex items-center justify-start p-5 border-2 border-dashed border-primary-100 rounded-lg bg-bg-white hover:bg-primary-50 transition-all h-full group outline-none"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary-100 rounded-full text-primary-500 group-hover:scale-110 transition-transform">
              <Plus size={24} />
            </div>
            <div className="flex flex-col text-left">
              <p className="text-sm font-bold text-primary-500">Add Cv/Resume</p>
              <p className="text-[11px] text-gray-400 mt-1">Browse file or drop here. only pdf</p>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}