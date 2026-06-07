export interface SavedCandidatesResponse {
    id: number;
    jobSeekerId: number;
    jobSeekerName: string;
    jobSeekerEmail: string;
    savedAt: string;
}

export interface SavedCandidatesApiResult {
    success: boolean;
    message: string;
    data: SavedCandidatesResponse[];
}
