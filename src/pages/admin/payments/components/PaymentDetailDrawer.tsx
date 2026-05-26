import {
  X,
  Receipt,
  User,
  CreditCard,
  Calendar,
  CheckCircle2,
} from "lucide-react";
import StatusBadge, { type PaymentStatus } from "./StatusBadge";

export interface Payment {
  id: string;
  user: string;
  email: string;
  plan: string;
  amount: number;
  date: string;
  status: PaymentStatus;
  paymentMethod: string;
  transactionRef: string;
}
interface PaymentDetailDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  payment: Payment | null;
  onUpdateStatus: (id: string, newStatus: PaymentStatus) => void;
}
export default function PaymentDetailDrawer({
  isOpen,
  onClose,
  payment,
  onUpdateStatus,
}: PaymentDetailDrawerProps) {
  if (!isOpen || !payment) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div
        className="absolute inset-0 bg-gray-900/20 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      ></div>

      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <Receipt size={20} className="text-blue-600" />
            Payment Details
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-8">
          <div className="flex flex-col items-center justify-center text-center pb-6 border-b border-gray-100">
            <p className="text-sm text-gray-500 mb-2">Total Amount</p>
            <h3 className="text-4xl font-black text-gray-900 mb-4">
              ${payment.amount.toFixed(2) ?? "0.00"}
            </h3>
            <StatusBadge status={payment.status} />
          </div>

          <div className="flex flex-col gap-6">
            <div>
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                <User size={14} /> Customer Information
              </h4>
              <div className="bg-gray-50 rounded-lg p-4 space-y-3 border border-gray-100">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Name</span>
                  <span className="text-sm font-semibold text-gray-900">
                    {payment.user}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Email</span>
                  <span className="text-sm font-semibold text-gray-900">
                    {payment.email}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                <CreditCard size={14} /> Transaction Details
              </h4>
              <div className="bg-gray-50 rounded-lg p-4 space-y-3 border border-gray-100">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Transaction ID</span>
                  <span className="text-sm font-mono font-semibold text-gray-900">
                    {payment.id}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Reference Ref</span>
                  <span className="text-sm font-mono text-gray-600">
                    {payment.transactionRef}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Plan</span>
                  <span className="text-sm font-semibold text-blue-600">
                    {payment.plan}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Method</span>
                  <span className="text-sm font-semibold text-gray-900">
                    {payment.paymentMethod}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                <Calendar size={14} /> Timeline
              </h4>
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Created At</span>
                  <span className="text-sm font-semibold text-gray-900">
                    {payment.date}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-100 bg-gray-50 flex flex-col gap-3">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider text-center mb-2">
            Update Status
          </p>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => onUpdateStatus(payment.id, "Completed")}
              disabled={payment.status === "Completed"}
              className="flex items-center justify-center gap-2 px-4 py-2.5 bg-green-600 text-white text-sm font-semibold rounded-md hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <CheckCircle2 size={16} /> Mark Completed
            </button>
            <button
              onClick={() => onUpdateStatus(payment.id, "Failed")}
              disabled={payment.status === "Failed"}
              className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-red-200 text-red-600 text-sm font-semibold rounded-md hover:bg-red-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Mark Failed
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
