import { useState, useMemo, useRef, useEffect } from "react";
import { Search, ChevronDown, Plus } from "lucide-react";
import { toast } from "sonner";
import KanbanColumn, { type ColumnData } from "./components/KanbanColumn";
import AddColumnModal from "./components/AddColumnModal";
import CandidateProfileModal from "../components/CandidateProfileModal";
import type { Applicant } from "./components/ApplicationCard";

const initialColumns: ColumnData[] = [
  { id: "col-1", title: "All Application" },
  { id: "col-2", title: "Shortlisted" },
];

const initialApplicants: Applicant[] = [
  {
    id: "1",
    columnId: "col-1",
    name: "Ronald Richards",
    avatar: null,
    experience: "7 Years Experience",
    education: "Master Degree",
    appliedDate: "Jan 23, 2022",
  },
  {
    id: "2",
    columnId: "col-2",
    name: "Theresa Webb",
    avatar: null,
    experience: "5 Years Experience",
    education: "Product Designer",
    appliedDate: "Feb 10, 2022",
  },
  {
    id: "3",
    columnId: "col-1",
    name: "Devon Lane",
    avatar: null,
    experience: "2 Years Experience",
    education: "High School",
    appliedDate: "Mar 15, 2022",
  },
];

export default function ApplicationsPage() {
  const [columns, setColumns] = useState<ColumnData[]>(initialColumns);
  const [applicants, setApplicants] = useState<Applicant[]>(initialApplicants);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [selectedApplicantId, setSelectedApplicantId] = useState<string | null>(
    null,
  );

  const sortMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        sortMenuRef.current &&
        !sortMenuRef.current.contains(event.target as Node)
      ) {
        setShowSortMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredAndSortedApplicants = useMemo(() => {
    let result = [...applicants];

    if (searchQuery) {
      result = result.filter((app) =>
        app.name.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    return result.sort((a, b) => {
      const dateA = new Date(a.appliedDate).getTime();
      const dateB = new Date(b.appliedDate).getTime();
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });
  }, [applicants, sortOrder, searchQuery]);

  const selectedApplicant = useMemo(() => {
    return applicants.find((app) => app.id === selectedApplicantId);
  }, [applicants, selectedApplicantId]);

  const handleDragStart = (e: React.DragEvent, id: string) => {
    e.dataTransfer.setData("applicantId", id);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetColumnId: string) => {
    const applicantId = e.dataTransfer.getData("applicantId");
    setApplicants((prev) =>
      prev.map((app) =>
        app.id === applicantId ? { ...app, columnId: targetColumnId } : app,
      ),
    );
  };

  const handleAddColumn = (name: string) => {
    if (!name.trim()) return;
    const newCol: ColumnData = { id: `col-${Date.now()}`, title: name };
    setColumns([...columns, newCol]);
    toast.success("Column added successfully!");
  };

  const handleDeleteColumn = (id: string) => {
    const hasApplicants = applicants.some((app) => app.columnId === id);
    if (hasApplicants) {
      toast.error("Cannot delete a column that contains applicants!");
      return;
    }
    setColumns(columns.filter((col) => col.id !== id));
    toast.success("Column deleted.");
  };

  const handleEditColumn = (id: string, newTitle: string) => {
    setColumns((prev) =>
      prev.map((col) => (col.id === id ? { ...col, title: newTitle } : col)),
    );
  };

  const handleDeleteApplicant = (id: string) => {
    setApplicants(applicants.filter((app) => app.id !== id));
    toast.success("Applicant deleted.");
  };

  return (
    <div className="w-full h-[calc(100vh-100px)] flex flex-col animate-in fade-in duration-500">
      <div className="flex items-center justify-between mb-8 shrink-0">
        <div>
          <p className="text-xs text-gray-400 font-medium mb-1">
            Home / Job / Senior UI/UX Designer /{" "}
            <span className="text-gray-900">Applications</span>
          </p>
          <h1 className="text-xl font-bold text-gray-900">Job Applications</h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search applicant..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-md text-sm focus:outline-none focus:border-blue-500 w-48 sm:w-64 transition-all"
            />
          </div>

          <div className="relative" ref={sortMenuRef}>
            <button
              onClick={() => setShowSortMenu(!showSortMenu)}
              className={`flex items-center gap-2 px-4 py-2 text-white rounded-md text-sm font-semibold transition-colors shadow-lg shadow-blue-100 ${showSortMenu ? "bg-blue-700" : "bg-blue-600 hover:bg-blue-700"}`}
            >
              Sort <ChevronDown size={16} />
            </button>

            {showSortMenu && (
              <div className="absolute right-0 top-12 w-56 bg-white border border-gray-100 rounded-xl p-5 shadow-xl z-30 animate-in fade-in zoom-in-95">
                <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">
                  Sort Application
                </h4>
                <div className="space-y-4">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="radio"
                      name="sort"
                      checked={sortOrder === "newest"}
                      onChange={() => setSortOrder("newest")}
                      className="w-4 h-4 text-blue-600 accent-blue-600"
                    />
                    <span
                      className={`text-sm font-bold ${sortOrder === "newest" ? "text-gray-900" : "text-gray-500"}`}
                    >
                      Newest
                    </span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="radio"
                      name="sort"
                      checked={sortOrder === "oldest"}
                      onChange={() => setSortOrder("oldest")}
                      className="w-4 h-4 text-blue-600 accent-blue-600"
                    />
                    <span
                      className={`text-sm font-bold ${sortOrder === "oldest" ? "text-gray-900" : "text-gray-500"}`}
                    >
                      Oldest
                    </span>
                  </label>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex gap-8 flex-1 min-h-0 relative">
        <div className="flex-1 flex gap-6 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-gray-200">
          {columns.map((column) => (
            <KanbanColumn
              key={column.id}
              column={column}
              applicants={filteredAndSortedApplicants.filter(
                (app) => app.columnId === column.id,
              )}
              onDragStart={handleDragStart}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onDelete={handleDeleteColumn}
              onEdit={handleEditColumn}
              onDeleteApplicant={handleDeleteApplicant}
              onViewProfile={setSelectedApplicantId}
            />
          ))}

          <div className="w-[320px] shrink-0 pt-2">
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full py-4 border-2 border-dashed border-gray-200 rounded-xl text-gray-400 font-bold text-sm hover:border-blue-400 hover:text-blue-500 hover:bg-blue-50/30 transition-all flex items-center justify-center gap-2"
            >
              <Plus size={18} /> Add New Column
            </button>
          </div>
        </div>
      </div>

      <AddColumnModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddColumn}
      />

      <CandidateProfileModal
        isOpen={!!selectedApplicantId}
        onClose={() => setSelectedApplicantId(null)}
        candidateName={selectedApplicant?.name || ""}
        candidateRole="UI/UX Designer"
      />
    </div>
  );
}
