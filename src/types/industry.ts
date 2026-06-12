export interface Industry {
    id: number;
    name: string;
    jobCount: number;
    createdAt: string;
}

export interface IndustryResponse {
    success: boolean;
    message: string;
    data: Industry[];
}
