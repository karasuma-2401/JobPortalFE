import { Download, ArrowLeft, ArrowRight } from "lucide-react";

export interface Invoice {
  id: string;
  date: string;
  plan: string;
  amount: string;
}

interface InvoicesTableProps {
  invoices: Invoice[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onDownload: (id: string) => void;
}

export default function InvoicesTable({
  invoices,
  currentPage,
  totalPages,
  onPageChange,
  onDownload,
}: InvoicesTableProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="bg-white border border-gray-100 rounded-xl shadow-sm flex flex-col h-full">
      <div className="p-6 border-b border-gray-100">
        <h3 className="text-sm font-bold text-gray-900">Latest Invoices</h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 text-[10px] font-bold text-gray-500 uppercase tracking-widest border-b border-gray-100">
              <th className="px-6 py-4">#ID</th>
              <th className="px-6 py-4">DATE</th>
              <th className="px-6 py-4">PLAN</th>
              <th className="px-6 py-4">AMOUNT</th>
              <th className="px-6 py-4 text-right"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {invoices.map((invoice) => (
              <tr
                key={invoice.id}
                className="hover:bg-blue-50/30 transition-colors group"
              >
                <td className="px-6 py-4 text-sm font-bold text-gray-900">
                  {invoice.id}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {invoice.date}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {invoice.plan}
                </td>
                <td className="px-6 py-4 text-sm font-bold text-gray-900">
                  {invoice.amount}
                </td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => onDownload(invoice.id)}
                    className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors inline-flex"
                  >
                    <Download size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-6 border-t border-gray-100 flex items-center justify-center gap-2 mt-auto">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="w-8 h-8 flex items-center justify-center rounded-full text-blue-600 hover:bg-blue-50 disabled:text-gray-300 disabled:hover:bg-transparent transition-colors"
        >
          <ArrowLeft size={16} />
        </button>

        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-8 h-8 flex items-center justify-center rounded-full text-xs font-semibold transition-colors ${
              currentPage === page
                ? "bg-blue-600 text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            {page.toString().padStart(2, "0")}
          </button>
        ))}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="w-8 h-8 flex items-center justify-center rounded-full text-blue-600 hover:bg-blue-50 disabled:text-gray-300 disabled:hover:bg-transparent transition-colors"
        >
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
