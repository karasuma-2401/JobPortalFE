import {
  Bookmark,
  MoreVertical,
  Mail,
  Download,
  BookmarkMinus,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { toast } from "sonner";
import type { Candidate } from "../../components/CandidateProfileModal";

interface SavedCandidateItemProps {
  candidate: Candidate;
  onViewProfile: (id: string) => void;
  onRemove: (id: string) => void;
}

export default function SavedCandidateItem({
  candidate,
  onViewProfile,
  onRemove,
}: SavedCandidateItemProps) {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const defaultAvatar =
    "https://ui-avatars.com/api/?name=" +
    candidate.name.replace(" ", "+") +
    "&background=f3f4f6&color=4b5563";

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-xl hover:border-blue-500 hover:shadow-sm transition-all group">
      <div className="flex items-center gap-4">
        <img
          src={candidate.avatar || defaultAvatar}
          alt={candidate.name}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <h3 className="font-bold text-gray-900">{candidate.name}</h3>
          <p className="text-sm text-gray-500">{candidate.role}</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={() => onRemove(candidate.id)}
          className="p-2 text-blue-600 hover:bg-red-50 hover:text-red-500 rounded-full transition-colors group/btn"
          title="Remove from saved"
        >
          <Bookmark size={20} className="fill-current group-hover/btn:hidden" />
          <BookmarkMinus size={20} className="hidden group-hover/btn:block" />
        </button>

        <button
          onClick={() => onViewProfile(candidate.id)}
          className="px-6 py-2.5 bg-blue-50 text-blue-600 font-semibold text-sm rounded-md hover:bg-blue-600 hover:text-white transition-colors border border-blue-100 group-hover:border-blue-600"
        >
          View Profile &rarr;
        </button>

        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-2 text-gray-400 hover:bg-gray-100 rounded-md transition-colors"
          >
            <MoreVertical size={20} />
          </button>

          {showMenu && (
            <div className="absolute right-0 top-10 w-48 bg-white border border-gray-100 rounded-lg shadow-xl py-1 z-10 animate-in fade-in zoom-in-95">
              <button
                onClick={() => {
                  toast.success(`Opening email composer for ${candidate.name}`);
                  setShowMenu(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
              >
                <Mail size={16} /> Send Email
              </button>
              <button
                onClick={() => {
                  toast.success(`Downloading ${candidate.name}'s CV`);
                  setShowMenu(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
              >
                <Download size={16} /> Download Cv
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
