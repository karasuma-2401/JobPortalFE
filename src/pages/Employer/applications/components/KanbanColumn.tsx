import { MoreVertical, Edit2, Trash2, Check, X } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import ApplicationCard from "./ApplicationCard";
import type { Applicant } from "./ApplicationCard";

export interface ColumnData {
  id: string;
  title: string;
}

interface KanbanColumnProps {
  column: ColumnData;
  applicants: Applicant[];
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent, columnId: string) => void;
  onDragStart: (e: React.DragEvent, id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newTitle: string) => void;
  onDeleteApplicant: (id: string) => void;
  onViewProfile: (id: string) => void;
}

export default function KanbanColumn({
  column,
  applicants,
  onDragOver,
  onDrop,
  onDragStart,
  onDelete,
  onEdit,
  onDeleteApplicant,
  onViewProfile,
}: KanbanColumnProps) {
  const [showMenu, setShowMenu] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(column.title);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSaveEdit = () => {
    if (editTitle.trim()) {
      onEdit(column.id, editTitle);
    } else {
      setEditTitle(column.title);
    }
    setIsEditing(false);
    setShowMenu(false);
  };

  return (
    <div
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, column.id)}
      className="flex flex-col w-[320px] shrink-0 h-full bg-gray-50/50 rounded-xl p-2 transition-colors hover:bg-gray-50 border border-transparent hover:border-gray-100"
    >
      <div className="flex items-center justify-between mb-4 px-2 pt-2">
        {isEditing ? (
          <div className="flex items-center gap-2 w-full">
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="flex-1 px-2 py-1 text-sm font-bold text-gray-900 border border-blue-500 rounded outline-none"
              autoFocus
            />
            <button
              onClick={handleSaveEdit}
              className="p-1 text-green-600 hover:bg-green-50 rounded"
            >
              <Check size={16} />
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="p-1 text-red-500 hover:bg-red-50 rounded"
            >
              <X size={16} />
            </button>
          </div>
        ) : (
          <>
            <h3 className="font-bold text-gray-900 flex items-center gap-2">
              {column.title}{" "}
              <span className="text-gray-400 font-medium">
                ({applicants.length})
              </span>
            </h3>
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="p-1.5 text-gray-400 hover:bg-white rounded-md transition-colors"
              >
                <MoreVertical size={18} />
              </button>

              {showMenu && (
                <div className="absolute right-0 top-8 w-40 bg-white border border-gray-100 rounded-lg shadow-xl py-1 z-10 animate-in fade-in zoom-in-95">
                  <button
                    onClick={() => setIsEditing(true)}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                  >
                    <Edit2 size={14} /> Edit Column
                  </button>
                  <button
                    onClick={() => {
                      onDelete(column.id);
                      setShowMenu(false);
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-red-500 hover:bg-red-50"
                  >
                    <Trash2 size={14} /> Delete
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      <div className="flex-1 overflow-y-auto px-2 pb-2 space-y-4 scrollbar-hide">
        {applicants.map((applicant) => (
          <ApplicationCard
            key={applicant.id}
            applicant={applicant}
            onDragStart={onDragStart}
            onDeleteApplicant={onDeleteApplicant}
            onViewProfile={onViewProfile}
          />
        ))}
      </div>
    </div>
  );
}
