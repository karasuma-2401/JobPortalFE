import { FileText, MoreVertical, Trash2, Edit3 } from 'lucide-react';

interface ResumeCardProps {
  resume: { name: string; size: string };
  onDelete?: () => void;
}

export const ResumeCard = ({ resume, onDelete }: ResumeCardProps) => {
  return (
    <div className="flex items-center justify-between p-4 border border-gray-100 rounded-lg bg-bg-white hover:border-primary-200 transition-colors">
      <div className="flex items-center gap-3">
        <div className="p-3 bg-primary-50 rounded-lg">
          <FileText className="w-6 h-6 text-primary-500" />
        </div>
        <div>
          <h4 className="text-sm font-medium text-gray-900">{resume.name}</h4>
          <p className="text-xs text-gray-500">{resume.size}</p>
        </div>
      </div>
      
      <div className="relative group cursor-pointer">
        <button className="p-1 hover:bg-gray-50 rounded-full transition-colors">
          <MoreVertical className="w-5 h-5 text-gray-400" />
        </button>
        
        {/* Dropdown Menu */}
        <div className="absolute right-0 hidden group-hover:block w-36 bg-bg-white shadow-lg border border-gray-100 rounded-md py-1 z-20">
          <button className="flex items-center gap-2 px-4 py-2 text-sm w-full hover:bg-primary-50 text-gray-700">
            <Edit3 className="w-4 h-4 text-primary-500" /> Edit
          </button>
          <button onClick={onDelete} className="flex items-center gap-2 px-4 py-2 text-sm w-full hover:bg-danger-50 text-danger-500">
            <Trash2 className="w-4 h-4" /> Delete
          </button>
        </div>
      </div>
    </div>
  );
};