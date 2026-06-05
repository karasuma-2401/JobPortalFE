export type ApplicationStatus =
  | "PENDING"
  | "REVIEWING"
  | "INTERVIEW"
  | "OFFER"
  | "REJECTED"
  | "ACCEPTED";

export interface JobSeekerProfile {
  id: number;
  fullName: string;
  address: string;
  phone: string;
}

export interface JobApplication {
  id: number;
  coverLetter: string;
  status: ApplicationStatus;
  appliedAt?: string;
  jobSeekerProfile: JobSeekerProfile;
}

export interface JobApplicationResponse {
  success: boolean;
  message: string;
  data: JobApplication[];
}
