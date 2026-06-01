import { useState, useMemo } from "react";
import { Plus, Search } from "lucide-react";
import { toast } from "sonner";
import { type Industry } from "./components/types";
import IndustryTable from "./components/IndustryTable";
import IndustryModal from "./components/IndustryModal";
import TablePagination from "../../../components/ui/TablePagination";
import ConfirmModal from "../../../components/ui/ConfirmModal";

const MOCK_INDUSTRIES: Industry[] = [
  {
    id: "IND-001",
    name: "Information Technology",
    jobCount: 145,
    createdAt: "2024-01-15",
  },
  {
    id: "IND-002",
    name: "Finance & Banking",
    jobCount: 89,
    createdAt: "2024-01-18",
  },
  {
    id: "IND-003",
    name: "Healthcare & Medicine",
    jobCount: 0,
    createdAt: "2024-02-10",
  },
  {
    id: "IND-004",
    name: "Education & Training",
    jobCount: 34,
    createdAt: "2024-03-05",
  },
  {
    id: "IND-005",
    name: "Marketing & Advertising",
    jobCount: 56,
    createdAt: "2024-03-12",
  },
];

export default function IndustryManagementPage() {
  const [industries, setIndustries] = useState<Industry[]>(MOCK_INDUSTRIES);
  const [searchQuery, setSearchQuery] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingIndustry, setEditingIndustry] = useState<Industry | null>(null);
  const [deletingIndustry, setDeletingIndustry] = useState<Industry | null>(
    null,
  );

  const filteredIndustries = useMemo(() => {
    return industries.filter((industry) =>
      industry.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [industries, searchQuery]);

  const totalPages = Math.ceil(filteredIndustries.length / itemsPerPage);
  const currentItems = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredIndustries.slice(start, start + itemsPerPage);
  }, [filteredIndustries, currentPage, itemsPerPage]);

  const handleOpenAddModal = () => {
    setEditingIndustry(null);
    setIsModalOpen(true);
  };
  const handleOpenEditModal = (industry: Industry) => {
    setEditingIndustry(industry);
    setIsModalOpen(true);
  };

  const handleSubmitForm = (name: string) => {
    if (editingIndustry) {
      setIndustries((prev) =>
        prev.map((industry) =>
          industry.id === editingIndustry.id ? { ...industry, name } : industry,
        ),
      );
      toast.success("Industry updated successfully");
    } else {
      const newIndustry: Industry = {
        id: `IND-00${industries.length + 1}`,
        name,
        jobCount: 0,
        createdAt: new Date().toISOString().split("T")[0],
      };
      setIndustries([newIndustry, ...industries]);
      toast.success("New industry created successfully");
    }
  };

  const handleDeleteConfirm = () => {
    if (!deletingIndustry) return;

    if (deletingIndustry.jobCount > 0) {
      toast.error(
        `Cannot delete "${deletingIndustry.name}". It is currently linked to ${deletingIndustry.jobCount} jobs.`,
      );
    } else {
      setIndustries((prev) =>
        prev.filter((industry) => industry.id !== deletingIndustry.id),
      );
      toast.success("Industry delete successfully");
    }
  };
  return (
    <div className="animate-in fade-in duration-500 h-full flex flex-col">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Industry Management
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage job categories and industries
          </p>
        </div>
        <button
          onClick={handleOpenAddModal}
          className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white text-sm font-bold rounded-lg hover:bg-blue-700 transition-colors shadow-sm shadow-blue-200"
        >
          <Plus size={18} /> Add New Industry
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col flex-1 overflow-hidden">
        <div className="p-5 border-b border-gray-200 bg-gray-50/50 shrink-0">
          <div className="relative w-full sm:max-w-md">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search industries..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white shadow-sm"
            />
          </div>
        </div>

        <IndustryTable
          industries={currentItems}
          onEdit={handleOpenEditModal}
          onDelete={setDeletingIndustry}
        />

        <TablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={(items) => {
            setItemsPerPage(items);
            setCurrentPage(1);
          }}
        />
      </div>
      <IndustryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmitForm}
        initialData={editingIndustry}
      />

      <ConfirmModal
        isOpen={!!deletingIndustry}
        title="Delete Industry"
        message={
          deletingIndustry?.jobCount && deletingIndustry.jobCount > 0
            ? `Warning: "${deletingIndustry.name}" is currently linked to ${deletingIndustry.jobCount} jobs. Deleting it may cause data inconsistency. Are you sure you want to proceed? (Note: The system might hide it instead of deleting).`
            : `Are you sure you want to delete "${deletingIndustry?.name}"? This action cannot be undone.`
        }
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeletingIndustry(null)}
        confirmText="Delete Industry"
        isDanger={true}
      />
    </div>
  );
}
