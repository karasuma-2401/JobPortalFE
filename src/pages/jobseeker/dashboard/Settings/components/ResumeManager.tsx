import { useState } from "react";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import ResumeCard from "./ResumeCard";
import AddResume from "./AddResume";
interface ResumeItem {
  id: string;
  name: string;
  size: string;
}
export default function ResumeManager() {
  const [resumes, setResumes] = useState([
    { id: "1", name: "Professional Resume", size: "3.5 MB" },
    { id: "2", name: "Product Designer", size: "4.7 MB" },
    { id: "3", name: "Visual Designer", size: "1.3 MB" },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedResume, setSelectedResume] = useState<ResumeItem | null>(null);

  const handleOpenAddModal = () => {
    setSelectedResume(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (id: string) => {
    const target = resumes.find((r) => r.id === id);
    if (target) {
      setSelectedResume(target);
      setIsModalOpen(true);
    }
  };

  const handleSaveResume = async (newName: string) => {
    await new Promise((resolve) => setTimeout(resolve, 1200));

    if (selectedResume) {
      setResumes(resumes.map((r) => (r.id === selectedResume.id ? { ...r, name: newName } : r)));
      toast.success("Resume updated successfully");
    } else {
      const newResume: ResumeItem = {
        id: crypto.randomUUID(),
        name: newName,
        size: "0.0 MB (New)",
      };
      setResumes([...resumes, newResume]);
      toast.success("New resume added successfully");
    }
  };

  const handleDeleteResume = (id: string) => {
    setResumes(resumes.filter((item) => item.id !== id));
    toast.success("Resume removed successfully");
  };

  return (
    <div className="mt-16 pt-10 border-t border-gray-100 text-left">
      <h3 className="text-lg font-bold mb-8 text-gray-900">Your Cv/Resume</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        {resumes.map((item) => (
          <ResumeCard key={item.id} resume={item} onDelete={handleDeleteResume}
          onEdit={() => handleOpenEditModal(item.id)} />
        ))}

        <button
          type="button"
          onClick={handleOpenAddModal}
          className="flex items-center justify-start p-5 border-2 border-dashed border-primary-100 rounded-lg bg-bg-white hover:bg-primary-50 transition-all h-full group outline-none"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary-100 rounded-full text-primary-500 group-hover:scale-110 transition-transform">
              <Plus size={24} />
            </div>
            <div className="flex flex-col text-left">
              <p className="text-sm font-bold text-primary-500">Add Cv/Resume</p>
              <p className="text-[11px] text-gray-400 mt-1">Browse file or drop here. only pdf</p>
            </div>
          </div>
        </button>
      </div>
      <AddResume
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveResume}
        editData={selectedResume}
      />
    </div>
  );
}