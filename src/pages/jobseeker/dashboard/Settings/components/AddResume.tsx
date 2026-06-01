import { useState, useEffect } from "react";
import { X, Upload, Loader2 } from "lucide-react";
import { toast } from "sonner";

import Input from "../../../../../components/ui/Input";
import Button from "../../../../../components/ui/Button";

interface AddResumeProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (name: string) => Promise<void>;
  editData?: { name: string } | null;
}

export default function AddResume({ isOpen, onClose, onSave, editData }: AddResumeProps) {
  const [resumeName, setResumeName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (editData) {
      setResumeName(editData.name);
    } else {
      setResumeName("");
    }
  }, [editData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resumeName.trim()) {
      toast.error("Please enter your Cv/Resume Name.");
      return;
    }

    try {
      setIsLoading(true);
      await onSave(resumeName);
      onClose();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message || "An error occurred, please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fade-in">
      <div className="bg-bg-white w-full max-w-[640px] rounded-xl p-8 shadow-[0_20px_50px_rgba(0,0,0,0.15)] relative mx-4 text-left">
        
        <button
          type="button"
          onClick={onClose}
          className="absolute -top-4 -right-4 w-10 h-10 bg-bg-white border border-gray-100 text-gray-500 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors shadow-md z-10"
        >
          <X size={20} />
        </button>

        <h2 className="text-lg font-bold text-gray-900 mb-6">
          {editData ? "Edit Cv/Resume" : "Add Cv/Resume"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">Cv/Resume Name</label>
            <Input
              type="text"
              placeholder="Your resume name..."
              value={resumeName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setResumeName(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">Upload your Cv/Resume</label>
            <div className="border-2 border-dashed border-gray-100 rounded-xl p-8 flex flex-col items-center justify-center text-center bg-gray-50/10 hover:bg-primary-50/10 transition-colors cursor-pointer group">
              <div className="w-14 h-14 bg-gray-50 group-hover:bg-bg-white rounded-full flex items-center justify-center mb-3 shadow-sm border border-gray-50 transition-colors">
                <Upload className="w-6 h-6 text-gray-400 group-hover:text-primary-500 transition-colors" />
              </div>
              <p className="text-sm text-gray-900 font-medium">
                Browse File <span className="text-gray-400 font-normal">or drop here</span>
              </p>
              <p className="text-xs text-gray-400 mt-1.5 font-normal">
                Only PDF format available. Max file size 12 MB.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 gap-4">
            <Button
              type="button"
              variant="social"
              className="px-6 !bg-primary-50/40 hover:!bg-primary-50 text-primary-500 border-none font-semibold"
              onClick={onClose}
            >
              Cancel
            </Button>

            <Button variant="primary" className="px-6 min-w-[160px]" disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="animate-spin mx-auto" size={20} />
              ) : (
                <>{editData ? "Update Cv/Resume" : "Add Cv/Resume"}</>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}