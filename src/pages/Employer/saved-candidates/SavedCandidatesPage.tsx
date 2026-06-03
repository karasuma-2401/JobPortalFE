import { useState, useMemo } from "react";
import { Info, FolderOpen } from "lucide-react";
import { toast } from "sonner";
import SavedCandidateItem from "./components/SavedCandidateItem";
import CandidateProfileModal, {
  type Candidate,
} from "../components/CandidateProfileModal";

const MOCK_BIO =
  "I've been passionate about graphic design and digital art from an early age. I can create high-quality and aesthetically pleasing designs in a quick turnaround time.\n\nI mostly use Adobe Photoshop, Illustrator, XD and Figma.";
const MOCK_COVER_LETTER =
  "Dear Hiring Manager,\n\nI am writing to express my strong interest in the open position. I am confident that my academic background and skills would be successfully utilized in this role.\n\nSincerely,\nCandidate";

const generateMockCandidates = (): Candidate[] => {
  const names = [
    "Guy Hawkins",
    "Jacob Jones",
    "Cameron Williamson",
    "Robert Fox",
    "Kathryn Murphy",
    "Darlene Robertson",
    "Kristin Watson",
    "Jenny Wilson",
  ];

  return names.map((name, index) => ({
    id: `c-${index + 1}`,
    name,
    role: "Senior UI/UX Designer",
    avatar: null,
    biography: MOCK_BIO,
    coverLetter: MOCK_COVER_LETTER,
    dateOfBirth: "14 June, 1995",
    nationality: "United States",
    maritalStatus: "Single",
    gender: "Male",
    experience: "7 Years",
    education: "Master Degree",
    website: `www.${name.toLowerCase().replace(" ", "")}.com`,
    location: "Beverly Hills, California 90202\n1372 Spring Avenue",
    phone: "+1-202-555-0141",
    secondaryPhone: "+1-202-555-0189",
    email: `${name.toLowerCase().replace(" ", "")}@company.com`,
  }));
};

export default function SavedCandidatesPage() {
  const [candidates, setCandidates] = useState<Candidate[]>(
    generateMockCandidates(),
  );
  const [selectedCandidateId, setSelectedCandidateId] = useState<string | null>(
    null,
  );

  const selectedCandidate = useMemo(() => {
    return candidates.find((c) => c.id === selectedCandidateId) || null;
  }, [candidates, selectedCandidateId]);

  const handleRemoveCandidate = (id: string) => {
    setCandidates((prev) => prev.filter((c) => c.id !== id));
    toast.success("Removed candidate from saved list.");
  };

  const handleHireCandidate = (id: string) => {
    const candidate = candidates.find((c) => c.id === id);
    toast.success(`🎉 Successfully sent an offer to ${candidate?.name}!`);
    setSelectedCandidateId(null);
  };

  const formattedExpirationDate = useMemo(() => {
    const date = new Date();
    date.setDate(date.getDate() + 30);
    return new Intl.DateTimeFormat("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);
  }, []);

  return (
    <div className="w-full max-w-5xl mx-auto animate-in fade-in duration-500 pb-16 min-h-[70vh] flex flex-col">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4 border-b border-gray-100 pb-4 shrink-0">
        <h1 className="text-xl font-bold text-gray-900">
          Saved Candidates{" "}
          <span className="text-gray-400 font-medium">
            ({candidates.length})
          </span>
        </h1>
        <div className="flex items-center gap-2 text-sm text-gray-500 bg-gray-50 px-4 py-2 rounded-lg border border-gray-100">
          <Info size={16} className="text-blue-500" />
          <span>
            All of the candidates are visible until {formattedExpirationDate}
          </span>
        </div>
      </div>

      {candidates.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center p-10 bg-gray-50/50 rounded-2xl border-2 border-dashed border-gray-200">
          <div className="w-20 h-20 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mb-4">
            <FolderOpen size={40} strokeWidth={1.5} />
          </div>
          <h2 className="text-lg font-bold text-gray-900 mb-2">
            No saved candidates found
          </h2>
          <p className="text-sm text-gray-500 max-w-sm">
            You haven't saved any candidates yet. Browse applications and
            bookmark top talents to see them here.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {candidates.map((candidate) => (
            <SavedCandidateItem
              key={candidate.id}
              candidate={candidate}
              onViewProfile={setSelectedCandidateId}
              onRemove={handleRemoveCandidate}
            />
          ))}
        </div>
      )}

      <CandidateProfileModal
        isOpen={!!selectedCandidateId}
        onClose={() => setSelectedCandidateId(null)}
        candidate={selectedCandidate}
        onHire={handleHireCandidate}
      />
    </div>
  );
}
