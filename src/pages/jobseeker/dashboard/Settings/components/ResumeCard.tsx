import { useState, useEffect, useRef } from "react";
import { FileText, MoreVertical, Trash2, Edit3 } from "lucide-react";

interface ResumeCardProps {
  resume: { id: string; name: string; size: string };
  onDelete?: (id: string) => void;
  onEdit?: () => void;
}

export default function ResumeCard({ resume, onDelete, onEdit }: ResumeCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex items-center justify-between p-5 border border-gray-100 rounded-lg bg-bg-white hover:border-primary-200 transition-all h-full relative">
      <div className="flex items-center gap-4 min-w-0">
        <div className="p-3 bg-primary-50 rounded-lg shrink-0">
          <FileText className="w-6 h-6 text-primary-500" />
        </div>
        <div className="flex flex-col min-w-0 text-left">
          <h4 className="text-sm font-semibold text-gray-900 truncate pr-2">
            {resume.name}
          </h4>
          <p className="text-xs text-gray-500 mt-1">{resume.size}</p>
        </div>
      </div>

      <div className="relative shrink-0 ml-2" ref={menuRef}>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`p-1.5 rounded-full transition-colors ${
            isOpen ? "bg-primary-50 text-primary-500" : "hover:bg-gray-50 text-gray-400"
          }`}
        >
          <MoreVertical size={20} />
        </button>

        {isOpen && (
          <div className="absolute right-0 w-40 bg-bg-white shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 rounded-lg py-1.5 z-30 mt-2">
            <button
              type="button"
              className="flex items-center gap-2 px-4 py-2.5 text-sm w-full hover:bg-gray-50 text-gray-700 transition-colors"
              onClick={() => {
                setIsOpen(false);
                if (onEdit) onEdit();
              }}
            >
              <Edit3 size={16} className="text-primary-500" />
              <span>Edit Resume</span>
            </button>
            <div className="h-px bg-gray-100 my-1" />
            <button
              type="button"
              className="flex items-center gap-2 px-4 py-2.5 text-sm w-full hover:bg-danger-50 text-danger-500 transition-colors"
              onClick={() => {
                if (onDelete) onDelete(resume.id);
                setIsOpen(false);
              }}
            >
              <Trash2 size={16} />
              <span>Delete</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}