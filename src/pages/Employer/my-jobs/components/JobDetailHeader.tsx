import {
  ArrowLeft,
  MapPin,
  Clock,
  Share2,
  Edit,
  CheckCircle2,
  XCircle,
} from "lucide-react";

interface JobDetailHeaderProps {
  title: string;
  status: string;
  location: string;
  type: string;
  onBack: () => void;
  onShare: () => void;
  onEdit: () => void;
}

export default function JobDetailHeader({
  title,
  status,
  location,
  type,
  onBack,
  onShare,
  onEdit,
}: JobDetailHeaderProps) {
  return (
    <>
      <button
        onClick={onBack}
        className="group flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors mb-6"
      >
        <ArrowLeft
          size={16}
          className="transition-transform group-hover:-translate-x-1"
        />
        Back to My Jobs
      </button>

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
            {status === "Active" ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md border bg-green-50 border-green-200 text-sm font-medium text-green-700">
                <CheckCircle2 size={16} /> {status}
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md border bg-red-50 border-red-200 text-sm font-medium text-red-700">
                <XCircle size={16} /> {status}
              </span>
            )}
          </div>
          <p className="text-gray-500 flex items-center gap-4 text-sm font-medium">
            <span className="flex items-center gap-1.5">
              <MapPin size={16} /> {location}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={16} /> {type}
            </span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onShare}
            className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 hover:text-blue-600 transition-all shadow-sm"
          >
            <Share2 size={18} /> Share
          </button>
          <button
            onClick={onEdit}
            className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 hover:text-blue-600 transition-all shadow-sm"
          >
            <Edit size={18} /> Edit Job
          </button>
        </div>
      </div>
    </>
  );
}
