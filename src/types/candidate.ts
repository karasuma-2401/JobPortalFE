export interface Candidate {
  id: string;
  columnId: string;

  name: string;
  avatar: string | null;

  role: string;

  experience: string;
  education: string;
  appliedDate: string;

  biography: string;
  coverLetter: string;

  dateOfBirth: string;
  nationality: string;
  maritalStatus: string;
  gender: string;

  website: string;
  location: string;

  phone: string;
  secondaryPhone: string;

  email: string;

  social?: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
  };
}
