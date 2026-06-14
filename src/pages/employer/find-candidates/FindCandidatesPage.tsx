import { Search, Loader2 } from 'lucide-react';
import FilterSidebar from './components/FilterSidebar';
import CandidateCard from './components/CandidateCard';
import InviteModal from './components/InviteModal';
import CandidateProfileModal from '../components/CandidateProfileModal';
import { useFindCandidatesLogic } from '../../../hooks/useFindCandidatesLogic'; 

export default function FindCandidatesPage() {
    const { state, actions, isLoading, savedIds } = useFindCandidatesLogic();

    return (
        <div className='w-full max-w-7xl mx-auto animate-in fade-in duration-500 pb-16 flex flex-col lg:flex-row gap-8'>
            <FilterSidebar
                searchQuery={state.searchQuery}
                setSearchQuery={actions.setSearchQuery}
                selectedCategory={state.selectedCategory}
                setSelectedCategory={actions.setSelectedCategory}
                selectedExperience={state.selectedExperience}
                setSelectedExperience={actions.setSelectedExperience}
            />

            <div className='flex-1'>
                <div className='flex items-center justify-between mb-6'>
                    <h1 className='text-2xl font-bold text-gray-900'>
                        Find Candidates
                        {!isLoading && (
                            <span className='text-gray-400 font-medium text-lg ml-2'>
                                ({state.filteredCandidates.length})
                            </span>
                        )}
                    </h1>
                </div>

                {isLoading ? (
                    <div className='flex flex-col items-center justify-center py-20 bg-white border border-gray-150 rounded-2xl'>
                        <Loader2 className='w-10 h-10 animate-spin text-blue-600 mb-3' />
                        <p className='text-sm text-gray-500 font-medium'>Loading candidates list...</p>
                    </div>
                ) : state.filteredCandidates.length === 0 ? (
                    <div className='bg-white border-2 border-dashed border-gray-200 rounded-2xl p-12 text-center flex flex-col items-center justify-center'>
                        <Search size={48} className='text-gray-300 mb-4' />
                        <h3 className='text-lg font-bold text-gray-900 mb-1'>No candidates found</h3>
                        <p className='text-gray-500'>Try adjusting your filters or search keywords.</p>
                        <button onClick={actions.clearAllFilters} className='mt-4 text-blue-600 font-bold hover:underline'>
                            Clear all filters
                        </button>
                    </div>
                ) : (
                    <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6'>
                        {state.filteredCandidates.map((candidate) => (
                            <CandidateCard
                                key={candidate.id}
                                candidate={candidate}
                                isSaved={savedIds.has(candidate.id)}
                                onToggleSave={actions.toggleSaveCandidate}
                                onViewProfile={actions.setSelectedCandidate}
                                onInvite={(candidate) =>
                                    actions.setInviteModalData({
                                        isOpen: true,
                                        candidateId: candidate.id,
                                        candidateName: candidate.name,
                                    })
                                }
                            />
                        ))}
                    </div>
                )}
            </div>

            <InviteModal
                isOpen={state.inviteModalData.isOpen}
                onClose={() =>
                    actions.setInviteModalData({
                        isOpen: false,
                        candidateId: '',
                        candidateName: '',
                    })
                }
                candidateId={state.inviteModalData.candidateId}
                candidateName={state.inviteModalData.candidateName}
            />

            <CandidateProfileModal
                isOpen={!!state.selectedCandidate}
                onClose={() => actions.setSelectedCandidate(null)}
                candidate={state.selectedCandidate}
                isGeneralSeeker={true}
                onHire={actions.handleHireCandidate}
                onInviteCandidate={(candidate) => {
                    actions.setSelectedCandidate(null);
                    actions.setInviteModalData({
                        isOpen: true,
                        candidateId: candidate.id,
                        candidateName: candidate.name,
                    });
                }}
            />
        </div>
    );
}
