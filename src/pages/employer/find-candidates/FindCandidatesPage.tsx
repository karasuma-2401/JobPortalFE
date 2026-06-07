import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { toast } from 'sonner';
import FilterSidebar from './components/FilterSidebar';
import CandidateCard from './components/CandidateCard';
import InviteModal from './components/InviteModal';
import { MOCK_CANDIDATES } from './mockData';

export default function FindCandidatesPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedExperience, setSelectedExperience] = useState('All');
    const [savedCandidateIds, setSavedCandidateIds] = useState<Set<string>>(
        new Set()
    );

    const [inviteModalData, setInviteModalData] = useState<{
        isOpen: boolean;
        candidateName: string;
    }>({
        isOpen: false,
        candidateName: '',
    });

    const toggleSaveCandidate = (id: string, name: string) => {
        setSavedCandidateIds((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(id)) {
                newSet.delete(id);
                toast.info(`Removed ${name} from saved list.`);
            } else {
                newSet.add(id);
                toast.success(`Saved ${name} successfully!`);
            }
            return newSet;
        });
    };

    const filteredCandidates = useMemo(() => {
        return MOCK_CANDIDATES.filter((candidate) => {
            const matchSearch =
                candidate.name
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                candidate.role
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase());

            const matchCategory =
                selectedCategory === 'All' ||
                candidate.role.includes(selectedCategory);

            const matchExperience = selectedExperience === 'All' ? true : true;

            return matchSearch && matchCategory && matchExperience;
        });
    }, [searchQuery, selectedCategory, selectedExperience]);

    return (
        <div className='w-full max-w-7xl mx-auto animate-in fade-in duration-500 pb-16 flex flex-col lg:flex-row gap-8'>
            <FilterSidebar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                selectedExperience={selectedExperience}
                setSelectedExperience={setSelectedExperience}
            />

            <div className='flex-1'>
                <div className='flex items-center justify-between mb-6'>
                    <h1 className='text-2xl font-bold text-gray-900'>
                        Find Candidates
                        <span className='text-gray-400 font-medium text-lg ml-2'>
                            ({filteredCandidates.length})
                        </span>
                    </h1>
                </div>

                {filteredCandidates.length === 0 ? (
                    <div className='bg-white border-2 border-dashed border-gray-200 rounded-2xl p-12 text-center flex flex-col items-center justify-center'>
                        <Search size={48} className='text-gray-300 mb-4' />
                        <h3 className='text-lg font-bold text-gray-900 mb-1'>
                            No candidates found
                        </h3>
                        <p className='text-gray-500'>
                            Try adjusting your filters or search keywords.
                        </p>
                        <button
                            onClick={() => {
                                setSearchQuery('');
                                setSelectedCategory('All');
                                setSelectedExperience('All');
                            }}
                            className='mt-4 text-blue-600 font-bold hover:underline'
                        >
                            Clear all filters
                        </button>
                    </div>
                ) : (
                    <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6'>
                        {filteredCandidates.map((candidate) => (
                            <CandidateCard
                                key={candidate.id}
                                candidate={candidate}
                                isSaved={savedCandidateIds.has(candidate.id)}
                                onToggleSave={toggleSaveCandidate}
                                onInvite={(name) =>
                                    setInviteModalData({
                                        isOpen: true,
                                        candidateName: name,
                                    })
                                }
                            />
                        ))}
                    </div>
                )}
            </div>

            <InviteModal
                isOpen={inviteModalData.isOpen}
                onClose={() =>
                    setInviteModalData({ isOpen: false, candidateName: '' })
                }
                candidateName={inviteModalData.candidateName}
            />
        </div>
    );
}
