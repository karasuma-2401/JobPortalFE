import React, { useState } from "react";
import { X, Bold, Italic, Underline, Strikethrough, Link, List, ListOrdered, ArrowRight } from "lucide-react";

interface ApplyJobModalProps {
  isOpen: boolean;
  onClose: () => void;
  jobTitle: string; 
  onSubmit: (data: { resumeId: string; coverLetter: string }) => void;
}

export default function ApplyJobModal({ isOpen, onClose, jobTitle, onSubmit }: ApplyJobModalProps) {
  const [selectedResume, setSelectedResume] = useState("");
  const [coverLetter, setCoverLetter] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ resumeId: selectedResume, coverLetter });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="relative bg-white w-full max-w-xl rounded-2xl shadow-xl border border-gray-100 p-6 z-10 animate-in fade-in zoom-in-95 duration-200">

        <button 
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
        >
          <X size={18} />
        </button>

        <h2 className="text-xl font-bold text-gray-900 pr-8 mb-6">
          Apply Job: {jobTitle}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700">
              Choose Resume
            </label>
            <div className="relative">
              <select
                value={selectedResume}
                onChange={(e) => setSelectedResume(e.target.value)}
                required
                className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-[15px] text-gray-800 outline-none focus:border-blue-500 appearance-none cursor-pointer"
              >
                <option value="" disabled>Select...</option>
                <option value="resume_01">Nguyen_Van_A_CV_SRE.pdf</option>
                <option value="resume_02">Nguyen_Van_A_Portfolio.pdf</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-gray-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700">
              Cover Letter
            </label>
            <div className="border border-gray-200 rounded-lg overflow-hidden focus-within:border-blue-500 transition-colors">
              <textarea
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
                placeholder="Write down your biography here. Let the employers know who you are..."
                rows={6}
                required
                className="w-full p-4 text-[15px] text-gray-800 outline-none resize-none placeholder-gray-400"
              />

              <div className="flex items-center gap-1 px-3 py-2 bg-gray-50/50 border-t border-gray-100 text-gray-400">
                <button type="button" className="p-1.5 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors"><Bold size={16} /></button>
                <button type="button" className="p-1.5 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors"><Italic size={16} /></button>
                <button type="button" className="p-1.5 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors"><Underline size={16} /></button>
                <button type="button" className="p-1.5 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors"><Strikethrough size={16} /></button>
                <div className="w-px h-4 bg-gray-200 mx-1" />
                <button type="button" className="p-1.5 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors"><Link size={16} /></button>
                <button type="button" className="p-1.5 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors"><List size={16} /></button>
                <button type="button" className="p-1.5 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors"><ListOrdered size={16} /></button>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-3 rounded-lg text-[15px] font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 transition-all active:scale-[0.98]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-3 rounded-lg text-[15px] font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-600/10 transition-all active:scale-[0.98]"
            >
              <span>Apply Now</span>
              <ArrowRight size={16} />
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}