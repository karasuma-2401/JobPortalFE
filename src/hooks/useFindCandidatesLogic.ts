import { useState, useMemo } from 'react';
import { toast } from 'sonner';
import { useDiscoverCandidates } from './useDiscoverCandidates';
import {
    useSavedCandidates,
    useSaveCandidate,
    useRemoveSavedCandidate,
} from './useSavedCandidates';
import type { Candidate } from '../types/candidate';

export function useFindCandidatesLogic() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedExperience, setSelectedExperience] = useState('All');
    const [selectedCandidate, setSelectedCandidate] =
        useState<Candidate | null>(null);

    const [inviteModalData, setInviteModalData] = useState({
        isOpen: false,
        candidateId: '',
        candidateName: '',
    });

    const filters = useMemo(
        () => ({
            search: searchQuery || undefined,
            jobLevel: selectedCategory !== 'All' ? selectedCategory : undefined,
            limit: 100,
            offset: 0,
        }),
        [searchQuery, selectedCategory]
    );

    const { data: candidates = [], isLoading: isDiscoverLoading } =
        useDiscoverCandidates(filters);
    const { data: savedCandidates, isLoading: isSavedLoading } =
        useSavedCandidates();
    const { mutate: saveCandidate } = useSaveCandidate();
    const { mutate: removeSavedCandidate } = useRemoveSavedCandidate();
    const [prevSavedCandidates, setPrevSavedCandidates] =
        useState(savedCandidates);
    const [savedIds, setSavedIds] = useState<Set<string>>(() => {
        return new Set(
            (savedCandidates || []).map((s) => s.jobSeekerId.toString())
        );
    });
    if (savedCandidates !== prevSavedCandidates) {
        setPrevSavedCandidates(savedCandidates);
        setSavedIds(
            new Set(
                (savedCandidates || []).map((s) => s.jobSeekerId.toString())
            )
        );
    }
    const getExperienceYears = (expText: string): number => {
        const match = expText.match(/(\d+)/);
        return match ? parseInt(match[1], 10) : 0;
    };

    const filteredCandidates = useMemo(() => {
        return candidates.filter((candidate) => {
            if (selectedExperience === 'All') return true;
            const years = getExperienceYears(candidate.experience);
            if (selectedExperience === '0-2 Years') return years <= 2;
            if (selectedExperience === '3-5 Years')
                return years >= 3 && years <= 5;
            if (selectedExperience === '5+ Years') return years >= 5;
            return true;
        });
    }, [candidates, selectedExperience]);
    const toggleSaveCandidate = (id: string, name: string) => {
        const seekerId = Number(id);
        const isCurrentlySaved = savedIds.has(id);
        setSavedIds((prev) => {
            const next = new Set(prev);
            if (isCurrentlySaved) next.delete(id);
            else next.add(id);
            return next;
        });
        if (isCurrentlySaved) {
            removeSavedCandidate(seekerId, {
                onError: () => {
                    setSavedIds((prev) => {
                        const next = new Set(prev);
                        next.add(id);
                        return next;
                    });
                    toast.error(`Failed to remove ${name} from saved list.`);
                },
            });
        } else {
            saveCandidate(seekerId, {
                onError: () => {
                    setSavedIds((prev) => {
                        const next = new Set(prev);
                        next.delete(id);
                        return next;
                    });
                    toast.error(`Failed to save ${name}.`);
                },
            });
        }
    };

    const handleHireCandidate = () => {
        toast.success(
            `🎉 Successfully sent an offer to ${selectedCandidate?.name}!`
        );
        setSelectedCandidate(null);
    };

    const clearAllFilters = () => {
        setSearchQuery('');
        setSelectedCategory('All');
        setSelectedExperience('All');
    };

    return {
        state: {
            searchQuery,
            selectedCategory,
            selectedExperience,
            selectedCandidate,
            inviteModalData,
            filteredCandidates,
        },
        actions: {
            setSearchQuery,
            setSelectedCategory,
            setSelectedExperience,
            setSelectedCandidate,
            setInviteModalData,
            toggleSaveCandidate,
            handleHireCandidate,
            clearAllFilters,
        },
        isLoading: isDiscoverLoading || isSavedLoading,
        savedIds,
    };
}
