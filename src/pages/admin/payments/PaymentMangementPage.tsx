import { useState, useMemo } from "react";
import { toast } from "sonner";
import { type PaymentStatus } from "./components/StatusBadge";
import PaymentDetailDrawer, {
  type Payment,
} from "./components/PaymentDetailDrawer";
import PaymentFilterBar from "./components/PaymentFilterBar";
import PaymentTable from "./components/PaymentTable";
import PaymentPagination from "./components/PaymentPagination";
import ConfirmModal from "../../../components/ui/ConfirmModal";

const MOCK_PAYMENTS: Payment[] = [
  {
    id: "TXN-80912",
    user: "TechVision Inc.",
    email: "billing@techvision.com",
    plan: "Premium Plan",
    amount: 299.0,
    date: "2024-03-15 14:30",
    status: "Completed",
    paymentMethod: "Credit Card",
    transactionRef: "ch_3N12AbCdEfGhIjKlMnOpQrSt",
  },
  {
    id: "TXN-80913",
    user: "Global Solutions",
    email: "finance@global.com",
    plan: "Standard Plan",
    amount: 149.0,
    date: "2024-03-15 15:45",
    status: "Pending",
    paymentMethod: "Bank Transfer",
    transactionRef: "bt_987654321",
  },
  {
    id: "TXN-80914",
    user: "Alpha Startups",
    email: "hello@alpha.co",
    plan: "Basic Plan",
    amount: 49.0,
    date: "2024-03-16 09:15",
    status: "Failed",
    paymentMethod: "Paypal",
    transactionRef: "pp_123456789",
  },
  {
    id: "TXN-80915",
    user: "Omega Corp",
    email: "admin@omega.net",
    plan: "Premium Plan",
    amount: 299.0,
    date: "2024-03-16 11:20",
    status: "Completed",
    paymentMethod: "Credit Card",
    transactionRef: "ch_3N45AbCdEfGhIjKlMnOpQrSt",
  },
  {
    id: "TXN-80916",
    user: "Creative Minds",
    email: "contact@creative.io",
    plan: "Standard Plan",
    amount: 149.0,
    date: "2024-03-17 16:00",
    status: "Canceled",
    paymentMethod: "Credit Card",
    transactionRef: "ch_3N67AbCdEfGhIjKlMnOpQrSt",
  },
  {
    id: "TXN-80917",
    user: "TechVision Inc.",
    email: "billing@techvision.com",
    plan: "Standard Plan",
    amount: 149.0,
    date: "2024-02-15 14:30",
    status: "Completed",
    paymentMethod: "Credit Card",
    transactionRef: "ch_3N89AbCdEfGhIjKlMnOpQrSt",
  },
];

export default function PaymentManagementPage() {
  const [payments, setPayments] = useState<Payment[]>(MOCK_PAYMENTS);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<PaymentStatus | "All">(
    "All",
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [selectedPaymentId, setSelectedPaymentId] = useState<string | null>(
    null,
  );
  const [activeDropdownId, setActiveDropdownId] = useState<string | null>(null);

  const [confirmConfig, setConfirmConfig] = useState<{
    isOpen: boolean;
    id: string | null;
    newStatus: PaymentStatus | null;
  }>({ isOpen: false, id: null, newStatus: null });

  const filterPayments = useMemo(() => {
    return payments.filter((payment) => {
      const resultSearch =
        payment.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        payment.user.toLowerCase().includes(searchQuery.toLowerCase());
      const resultStatus =
        statusFilter === "All" || payment.status === statusFilter;
      return resultSearch && resultStatus;
    });
  }, [payments, searchQuery, statusFilter]);

  const totalPages = Math.ceil(filterPayments.length / itemsPerPage);

  const currentItems = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filterPayments.slice(start, start + itemsPerPage);
  }, [filterPayments, currentPage, itemsPerPage]);

  const selectedPayment = useMemo(() => {
    return payments.find((p) => p.id === selectedPaymentId) || null;
  }, [payments, selectedPaymentId]);

  const handleUpdateStatus = (id: string, newStatus: PaymentStatus) => {
    setConfirmConfig({ isOpen: true, id, newStatus });
    setActiveDropdownId(null);
  };

  const executeStatusUpdate = () => {
    const { id, newStatus } = confirmConfig;
    if (id && newStatus) {
      setPayments((prev) =>
        prev.map((p) => (p.id === id ? { ...p, status: newStatus } : p)),
      );
      toast.success(`Transaction ${id} marked as ${newStatus}`);
    }
    setConfirmConfig({ isOpen: false, id: null, newStatus: null });
  };

  const handleItemsPerPageChange = (items: number) => {
    setItemsPerPage(items);
    setCurrentPage(1);
  };

  return (
    <div className="animate-in fade-in duration-500 h-full flex flex-col">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Payment Management
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Review and manage employer transactions
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col flex-1 overflow-hidden">
        <PaymentFilterBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
        />

        <PaymentTable
          payments={currentItems}
          onViewDetail={setSelectedPaymentId}
          activeDropdownId={activeDropdownId}
          onToggleDropdown={setActiveDropdownId}
          onUpdateStatus={handleUpdateStatus}
        />

        <PaymentPagination
          currentPage={currentPage}
          totalPages={totalPages}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={handleItemsPerPageChange}
        />
      </div>

      <PaymentDetailDrawer
        isOpen={!!selectedPaymentId}
        onClose={() => setSelectedPaymentId(null)}
        payment={selectedPayment}
        onUpdateStatus={handleUpdateStatus}
      />

      <ConfirmModal
        isOpen={confirmConfig.isOpen}
        title="Update Payment Status"
        message={`Are you sure you want to mark transaction ${confirmConfig.id} as ${confirmConfig.newStatus}?`}
        onConfirm={executeStatusUpdate}
        onCancel={() =>
          setConfirmConfig({ isOpen: false, id: null, newStatus: null })
        }
        confirmText={`Mark as ${confirmConfig.newStatus}`}
        isDanger={confirmConfig.newStatus === "Failed"}
      />
    </div>
  );
}
