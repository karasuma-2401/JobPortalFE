import { Download, MoreVertical, Trash2, Eye } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { toast } from "sonner";
import type { Candidate } from "../../../../types/candidate";

interface ApplicationCardProps {
  applicant: Candidate;
  onDragStart: (e: React.DragEvent, id: string) => void;
  onDeleteApplicant: (id: string) => void;
  onViewProfile: (id: string) => void;
}

export default function ApplicationCard({
  applicant,
  onDragStart,
  onDeleteApplicant,
  onViewProfile,
}: ApplicationCardProps) {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const defaultAvatar =
    "https://ui-avatars.com/api/?name=" +
    applicant.name.replace(" ", "+") +
    "&background=eff6ff&color=2563eb";

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDownloadCV = () => {
    toast.success(`Downloading CV of ${applicant.name}...`);
  };

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, applicant.id)}
      className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow group cursor-grab active:cursor-grabbing"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <img
            src={applicant.avatar || defaultAvatar}
            alt={applicant.name}
            className="w-12 h-12 rounded-full object-cover pointer-events-none"
          />
          <div>
            <h4 className="font-bold text-gray-900 text-sm">
              {applicant.name}
            </h4>
            <p className="text-[11px] text-gray-400 uppercase font-semibold tracking-wider">
              {applicant.experience}
            </p>
          </div>
        </div>
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-1 text-gray-400 hover:bg-gray-100 rounded transition-colors"
          >
            <MoreVertical size={16} />
          </button>

          {showMenu && (
            <div className="absolute right-0 top-6 w-36 bg-white border border-gray-100 rounded-lg shadow-xl py-1 z-20 animate-in fade-in zoom-in-95">
              <button
                onClick={() => {
                  onViewProfile(applicant.id);
                  setShowMenu(false);
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-gray-600 hover:bg-blue-50 hover:text-blue-600"
              >
                <Eye size={14} /> View Profile
              </button>
              <button
                onClick={() => {
                  onDeleteApplicant(applicant.id);
                  setShowMenu(false);
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-red-500 hover:bg-red-50"
              >
                <Trash2 size={14} /> Delete
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-2 mb-5">
        <div className="flex items-start gap-2 text-xs text-gray-600">
          <span className="text-gray-400 font-medium">Education:</span>
          <span className="flex-1 leading-relaxed">{applicant.education}</span>
        </div>
        <div className="flex items-start gap-2 text-xs text-gray-600">
          <span className="text-gray-400 font-medium">Applied:</span>
          <span>{new Date(applicant.appliedDate).toLocaleDateString()}</span>
        </div>
      </div>

      <button
        onClick={handleDownloadCV}
        className="w-full flex items-center justify-center gap-2 py-2.5 bg-blue-50 text-blue-600 rounded-md text-xs font-bold hover:bg-blue-600 hover:text-white transition-all"
      >
        <Download size={14} />
        Download CV
      </button>
    </div>
  );
}
