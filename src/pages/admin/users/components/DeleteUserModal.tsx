import { useState, type JSX } from "react";
import { AlertTriangle, X } from "lucide-react";
import { type UserProfile } from "./types";

interface DeleteUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (userId: string) => void;
  user: UserProfile | null;
}

export default function DeleteUserModal({
  isOpen,
  onClose,
  onConfirm,
  user,
}: DeleteUserModalProps): JSX.Element | null {
  const [verifyText, setVerifyText] = useState("");

  if (!isOpen || !user) return null;

  const isVerified = verifyText === user.email;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isVerified) {
      onConfirm(user.id);
    }
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={onClose}
      ></div>
      <div className="relative w-full max-w-md bg-white rounded-xl shadow-2xl p-6 animate-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 transition-colors"
        >
          <X size={20} />
        </button>
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-full shrink-0 bg-red-100 text-red-600">
            <AlertTriangle size={24} />
          </div>
          <div className="flex-1 mt-1">
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Delete User Account
            </h3>
            <p className="text-sm text-gray-500 leading-relaxed mb-4">
              This action cannot be undone. This will permanently delete{" "}
              <strong>{user.fullName}</strong>'s account and remove all
              associated data.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Please type <strong>{user.email}</strong> to confirm.
                </label>
                <input
                  type="text"
                  value={verifyText}
                  onChange={(e) => setVerifyText(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all"
                  placeholder={user.email}
                  autoComplete="off"
                />
              </div>

              <div className="flex items-center gap-3 justify-end">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!isVerified}
                  className="px-4 py-2 text-sm font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Delete Account
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
