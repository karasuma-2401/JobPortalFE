import { useState, useMemo, useRef, useEffect } from "react";
import { Search, ChevronDown, Plus } from "lucide-react";
import { toast } from "sonner";

import KanbanColumn, { type ColumnData } from "./components/KanbanColumn";
import AddColumnModal from "./components/AddColumnModal";
import CandidateProfileModal from "../components/CandidateProfileModal";

import type { Candidate } from "../../../types/candidate";

const initialColumns: ColumnData[] = [
  { id: "col-1", title: "All Application" },
  { id: "col-2", title: "Reviewed" },
];

const initialCandidates: Candidate[] = [
  {
    id: "1",
    columnId: "col-1",

    name: "Ronald Richards",
    avatar: null,

    role: "Senior UI/UX Designer",

    experience: "7 Years Experience",
    education: "Master Degree",

    appliedDate: "Jan 23, 2022",

    biography:
      "Senior UI/UX Designer with 7 years experience building enterprise products.",

    coverLetter:
      "I am excited to contribute my design expertise to your organization.",

    dateOfBirth: "12 May 1994",
    nationality: "American",
    maritalStatus: "Single",
    gender: "Male",

    website: "ronaldrichards.com",
    location: "New York, USA",

    phone: "+1 123 456 789",
    secondaryPhone: "+1 987 654 321",

    email: "ronald@example.com",

    social: {
      linkedin: "https://linkedin.com",
    },
  },

  {
    id: "2",
    columnId: "col-2",

    name: "Theresa Webb",
    avatar: null,

    role: "Product Designer",

    experience: "5 Years Experience",
    education: "Product Design",

    appliedDate: "Feb 10, 2022",

    biography:
      "Product Designer specialized in user-centered design and research.",

    coverLetter:
      "I am passionate about crafting intuitive digital experiences.",

    dateOfBirth: "15 Aug 1993",
    nationality: "Canadian",
    maritalStatus: "Married",
    gender: "Female",

    website: "theresawebb.com",
    location: "Toronto, Canada",

    phone: "+1 555 111 222",
    secondaryPhone: "+1 555 333 444",

    email: "theresa@example.com",

    social: {
      linkedin: "https://linkedin.com",
    },
  },
];

export default function ApplicationsPage() {
  const [columns, setColumns] = useState<ColumnData[]>(initialColumns);
  const [candidates, setCandidates] = useState<Candidate[]>(initialCandidates);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

  const [showSortMenu, setShowSortMenu] = useState(false);

  const [selectedCandidateId, setSelectedCandidateId] = useState<string | null>(
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

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const filteredAndSortedCandidates = useMemo(() => {
    let result = [...candidates];

    if (searchQuery.trim()) {
      result = result.filter((candidate) =>
        candidate.name.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    return result.sort((a, b) => {
      const dateA = new Date(a.appliedDate).getTime();
      const dateB = new Date(b.appliedDate).getTime();

      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });
  }, [candidates, searchQuery, sortOrder]);

  const selectedCandidate = useMemo(() => {
    return (
      candidates.find((candidate) => candidate.id === selectedCandidateId) ??
      null
    );
  }, [candidates, selectedCandidateId]);

  const handleDragStart = (e: React.DragEvent, candidateId: string) => {
    e.dataTransfer.setData("candidateId", candidateId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetColumnId: string) => {
    const candidateId = e.dataTransfer.getData("candidateId");

    setCandidates((prev) =>
      prev.map((candidate) =>
        candidate.id === candidateId
          ? {
              ...candidate,
              columnId: targetColumnId,
            }
          : candidate,
      ),
    );
  };

  const handleAddColumn = (name: string) => {
    if (!name.trim()) return;

    const newColumn: ColumnData = {
      id: `col-${Date.now()}`,
      title: name.trim(),
    };

    setColumns((prev) => [...prev, newColumn]);

    toast.success("Column added successfully!");
  };

  const handleDeleteColumn = (columnId: string) => {
    const hasCandidates = candidates.some(
      (candidate) => candidate.columnId === columnId,
    );

    if (hasCandidates) {
      toast.error("Cannot delete a column that contains candidates!");
      return;
    }

    setColumns((prev) => prev.filter((column) => column.id !== columnId));

    toast.success("Column deleted.");
  };

  const handleEditColumn = (columnId: string, newTitle: string) => {
    setColumns((prev) =>
      prev.map((column) =>
        column.id === columnId
          ? {
              ...column,
              title: newTitle,
            }
          : column,
      ),
    );
  };

  const handleDeleteCandidate = (candidateId: string) => {
    setCandidates((prev) =>
      prev.filter((candidate) => candidate.id !== candidateId),
    );

    toast.success("Candidate deleted.");
  };

  return (
    <div className="w-full h-[calc(100vh-100px)] flex flex-col animate-in fade-in duration-500">
      <div className="flex items-center justify-between mb-8 shrink-0">
        <div>


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
              className="pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 w-48 sm:w-64 transition-all text-gray-900"
            />
          </div>

          <div className="relative" ref={sortMenuRef}>
            <button
              onClick={() => setShowSortMenu(!showSortMenu)}
              className={`flex items-center gap-2 px-4 py-2.5 text-white rounded-xl text-sm font-semibold transition-colors shadow-sm ${
                showSortMenu ? "bg-blue-700" : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              Sort <ChevronDown size={16} />
            </button>

            {showSortMenu && (
              <div className="absolute right-0 top-12 w-56 bg-white border border-gray-100 rounded-xl p-5 shadow-xl z-30 animate-in fade-in zoom-in-95 duration-100">
                <div className="space-y-4">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="radio"
                      checked={sortOrder === "newest"}
                      onChange={() => setSortOrder("newest")}
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors">
                      Newest
                    </span>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="radio"
                      checked={sortOrder === "oldest"}
                      onChange={() => setSortOrder("oldest")}
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors">
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
        <div className="flex-1 flex gap-6 overflow-x-auto pb-4">
          {columns.map((column) => (
            <KanbanColumn
              key={column.id}
              column={column}
              applicants={filteredAndSortedCandidates.filter(
                (candidate) => candidate.columnId === column.id,
              )}
              onDragStart={handleDragStart}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onDelete={handleDeleteColumn}
              onEdit={handleEditColumn}
              onDeleteApplicant={handleDeleteCandidate}
              onViewProfile={setSelectedCandidateId}
            />
          ))}

          <div className="w-[320px] shrink-0 pt-2">
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center justify-center gap-2 w-full py-4 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 font-bold hover:bg-gray-50 hover:border-gray-400 hover:text-gray-900 transition-colors"
            >
              <Plus size={20} />
              <span>Add New Column</span>
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
        isOpen={!!selectedCandidate}
        onClose={() => setSelectedCandidateId(null)}
        candidate={selectedCandidate}
        onHire={(candidateId) => {
          toast.success(`Candidate ${candidateId} hired successfully`);
        }}
      />
    </div>
  );
}
