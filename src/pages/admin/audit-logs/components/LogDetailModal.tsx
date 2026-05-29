import { X, Terminal } from "lucide-react";
import { type AuditLog } from "./types";

interface LogDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  log: AuditLog | null;
}

export default function LogDetailModal({
  isOpen,
  onClose,
  log,
}: LogDetailModalProps) {
  if (!isOpen || !log) return null;

  // function parse to JSON
  const formatDescription = (des: string) => {
    try {
      const obj = JSON.parse(des);
      // 2 symbol for numbers of space tab to format JSON return
      return JSON.stringify(obj, null, 2);
    } catch {
      return des;
    }
  };

  return (
    <div className="fixed inset-0 z-100 items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={onClose}
      ></div>
      <div className="relative w-full max-w-2xl bg-white h-[80vh] flex flex-col rounded-xl shadow-2xl animate-in zoom-in-95 duration-200 overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b border-gray-100 bg-gray-50 shrink-0">
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <Terminal size={20} className="text-blue-600" />
            Log Details: {log.id}
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-200 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">
                Time & IP
              </p>
              <p className="text-sm font-semibold text-gray-900">
                {log.createdAt}
              </p>
              <p className="text-xs text-gray-500">{log.ipAddress}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">
                Actor
              </p>
              <p className="text-sm font-semibold text-gray-900">{log.email}</p>
              <p className="text-xs text-gray-500">{log.userId}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">
                Target Entity
              </p>
              <p className="text-sm font-semibold text-gray-900">
                {log.entityType}
              </p>
              <p className="text-xs text-gray-500">{log.entityId}</p>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-bold text-gray-900 mb-3">
              Payload / Description
            </h3>
            <div className="bg-[#1e1e1e] rounded-xl p-4 overflow-auto border border-gray-800 shadow-inner">
              <pre className="text-sm font-mono text-green-400 leading-relaxed">
                <code>{formatDescription(log.description)}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
