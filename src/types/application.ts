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

export interface JobApplicationDetail {
  id: number;

  coverLetter: string;

  approve: boolean;

  jobSeekerProfile: {
    id: number;
    fullName: string;
    address: string;
    phone: string;
    secondaryPhone: string;
    email: string;
    biography?: string;
    dateOfBirth?: string;
    nationality?: string;
    maritalStatus?: string;
    gender?: string;
    experience?: string;
    education?: string;
    website?: string;
    social?: {
      facebook?: string;
      twitter?: string;
      linkedin?: string;
    };
  };
  jobPost: {
    id: number;
    title: string;
  };
  resume: {
    id: number;
    fileUrl: string;
  };
}
