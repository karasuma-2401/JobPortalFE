import { useState, useEffect, useRef } from 'react';
import { FileText, MoreVertical, Trash2, Edit3 } from 'lucide-react';

interface ResumeCardProps {
  resume: { name: string; size: string };
  onDelete?: () => void;
}

export const ResumeCard = ({ resume, onDelete }: ResumeCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
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
      
      {/* Container của nút ba chấm và menu */}
      <div className="relative shrink-0 ml-2" ref={menuRef}>
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className={`p-1.5 rounded-full transition-colors ${
            isOpen ? 'bg-primary-50 text-primary-500' : 'hover:bg-gray-50 text-gray-400'
          }`}
        >
          <MoreVertical className="w-5 h-5" />
        </button>
        
        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute right-0 w-40 bg-bg-white shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 rounded-lg py-1.5 z-30 mt-2 animate-in fade-in zoom-in duration-150">
            <button 
              className="flex items-center gap-2 px-4 py-2.5 text-sm w-full hover:bg-gray-50 text-gray-700 transition-colors"
              onClick={() => { /* Xử lý edit */ setIsOpen(false); }}
            >
              <Edit3 className="w-4 h-4 text-primary-500" />
              <span>Edit Resume</span>
            </button>
            <div className="h-[1px] bg-gray-50 my-1" />
            <button 
              className="flex items-center gap-2 px-4 py-2.5 text-sm w-full hover:bg-danger-50 text-danger-500 transition-colors"
              onClick={() => { onDelete?.(); setIsOpen(false); }}
            >
              <Trash2 className="w-4 h-4" />
              <span>Delete</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};