import { useState, useMemo } from "react";
import { Info } from "lucide-react";
import SavedCandidateItem, {
  type SavedCandidate,
} from "./components/SavedCandidateItem";
import CandidateProfileModal from "../components/CandidateProfileModal";

const mockCandidates: SavedCandidate[] = [
  {
    id: "1",
    name: "Guy Hawkins",
    role: "Technical Support Specialist",
    avatar: null,
  },
  { id: "2", name: "Jacob Jones", role: "Product Designer", avatar: null },
  {
    id: "3",
    name: "Cameron Williamson",
    role: "Marketing Officer",
    avatar: null,
  },
  { id: "4", name: "Robert Fox", role: "Marketing Manager", avatar: null },
  {
    id: "5",
    name: "Kathryn Murphy",
    role: "Junior Graphic Designer",
    avatar: null,
  },
  { id: "6", name: "Darlene Robertson", role: "Visual Designer", avatar: null },
  { id: "7", name: "Kristin Watson", role: "Senior UX Designer", avatar: null },
  { id: "8", name: "Jenny Wilson", role: "Interaction Designer", avatar: null },
  {
    id: "9",
    name: "Marvin McKinney",
    role: "Networking Engineer",
    avatar: null,
  },
  { id: "10", name: "Theresa Webb", role: "Software Engineer", avatar: null },
];

export default function SavedCandidatesPage() {
  const [candidates] = useState<SavedCandidate[]>(mockCandidates);
  const [selectedCandidateId, setSelectedCandidateId] = useState<string | null>(
    null,
  );

  const selectedCandidate = useMemo(() => {
    return candidates.find((c) => c.id === selectedCandidateId);
  }, [candidates, selectedCandidateId]);

  return (
    <div className="w-full max-w-5xl mx-auto animate-in fade-in duration-500 pb-16">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4 border-b border-gray-100 pb-4">
        <h1 className="text-xl font-bold text-gray-900">Saved Candidates</h1>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Info size={16} className="text-gray-400" />
          <span>All of the candidates are visible until 24 march, 2024</span>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {candidates.map((candidate) => (
          <SavedCandidateItem
            key={candidate.id}
            candidate={candidate}
            onViewProfile={setSelectedCandidateId}
          />
        ))}
      </div>

      <CandidateProfileModal
        isOpen={!!selectedCandidateId}
        onClose={() => setSelectedCandidateId(null)}
        candidateName={selectedCandidate?.name || ""}
        candidateRole={selectedCandidate?.role || ""}
      />
    </div>
  );
}
