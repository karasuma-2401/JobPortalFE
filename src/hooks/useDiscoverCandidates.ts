import { useQuery } from '@tanstack/react-query';
import { EmployerService } from '../services/employerService';
import type { JobSeekerData } from '../types/employer';
import type { Candidate } from '../types/candidate';

interface DiscoverCandidatesResponse {
    success?: boolean;
    message?: string;
    data?: {
        items?: JobSeekerData[];
    };
    items?: JobSeekerData[];
}

export const useDiscoverCandidates = (filters: {
    search?: string;
    jobLevel?: string;
    limit?: number;
    offset?: number;
}) => {
    return useQuery({
        queryKey: ['discoverCandidates', filters],
        queryFn: async () => {
            const response = await EmployerService.discoverCandidates(filters);
            const payload = response as unknown as DiscoverCandidatesResponse;
            return payload.data ?? payload;
        },
        select: (data) => {
            if (!data?.items) return [];
            return data.items.map((seeker) => ({
                id: seeker.id.toString(),
                columnId: 'discover',
                name: seeker.fullName || 'Anonymous',
                avatar: seeker.avatar || null,
                role: seeker.professionalTitle || 'Candidate',
                experience: seeker.experienceSummary || 'Not specified',
                education: seeker.educationSummary || 'Not specified',
                appliedDate: '',
                biography: seeker.biography || 'No biography provided.',
                coverLetter: '',
                dateOfBirth: seeker.dateOfBirth ? new Date(seeker.dateOfBirth).toLocaleDateString() : 'Not specified',
                nationality: seeker.nationality || 'Not specified',
                maritalStatus: seeker.maritalStatus || 'Not specified',
                gender: seeker.gender || 'Not specified',
                website: seeker.website || '',
                location: seeker.address || 'Not specified',
                phone: seeker.phone || 'Not specified',
                secondaryPhone: seeker.secondaryPhone || '',
                email: seeker.email || '',
                social: {
                    facebook: seeker.facebookUrl || '',
                    twitter: seeker.twitterUrl || '',
                    linkedin: seeker.linkedlnUrl || '',
                },
            })) as Candidate[];
        }
    });
};
