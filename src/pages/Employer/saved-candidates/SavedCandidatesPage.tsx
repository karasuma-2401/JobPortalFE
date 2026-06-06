import { useState, useMemo } from "react";
import { Info, FolderOpen, Loader2 } from "lucide-react";
import { toast } from "sonner";
import SavedCandidateItem from "./components/SavedCandidateItem";
import CandidateProfileModal, {
  type Candidate,
} from "../components/CandidateProfileModal";
import {
  useSavedCandidates,
  useRemoveSavedCandidate,
} from "../../../hooks/useSavedCandidates";

export default function SavedCandidatesPage() {
  const { data: apiSavedCandidates, isLoading } = useSavedCandidates();
  const { mutate: removeCandidate } = useRemoveSavedCandidate();

  const [selectedCandidateId, setSelectedCandidateId] = useState<string | null>(
    null,
  );

  const candidates: Candidate[] = useMemo(() => {
    if (!apiSavedCandidates) return [];

    return apiSavedCandidates.map((saved) => ({
      id: saved.jobSeekerId.toString(),
      name: saved.jobSeekerName,
      email: saved.jobSeekerEmail,
      role: "Candidate",
      avatar: null,
      biography: "Full profile details will be available soon.",
      coverLetter: "No cover letter provided.",
      dateOfBirth: "Not specified",
      nationality: "Not specified",
      maritalStatus: "Not specified",
      gender: "Not specified",
      experience: "Not specified",
      education: "Not specified",
      website: "",
      location: "Not specified",
      phone: "Not specified",
      secondaryPhone: "",
    }));
  }, [apiSavedCandidates]);

  const selectedCandidate = useMemo(() => {
    return candidates.find((c) => c.id === selectedCandidateId) || null;
  }, [candidates, selectedCandidateId]);

  const handleRemoveCandidate = (id: string) => {
    removeCandidate(Number(id));
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

  if (isLoading) {
    return (
      <div className="w-full h-[70vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

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
