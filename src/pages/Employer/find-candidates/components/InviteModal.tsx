import { X, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

interface InviteModalProps {
  isOpen: boolean;
  onClose: () => void;
  candidateName: string;
}

export default function InviteModal({
  isOpen,
  onClose,
  candidateName,
}: InviteModalProps) {
  if (!isOpen) return null;

  const mockActiveJobs = [
    "Senior UI/UX Designer",
    "Frontend Developer",
    "Product Manager",
  ];

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <h3 className="font-bold text-gray-900">Invite {candidateName}</h3>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:bg-gray-100 rounded-full"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-5">
          <p className="text-sm text-gray-600 mb-4">
            Select an active job to invite this candidate to apply:
          </p>
          <div className="space-y-3">
            {mockActiveJobs.map((job) => (
              <button
                key={job}
                onClick={() => {
                  toast.success(
                    `Invitation sent to ${candidateName} for ${job}!`,
                  );
                  onClose();
                }}
                className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all group text-left"
              >
                <span className="font-medium text-gray-700 group-hover:text-blue-700">
                  {job}
                </span>
                <CheckCircle2
                  size={18}
                  className="text-gray-300 group-hover:text-blue-500"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
