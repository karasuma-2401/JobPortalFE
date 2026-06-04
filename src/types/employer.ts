export interface EmployerSetupPayload {
  companyName: string;
  description: string;
  logo: File | null;
  banner: File | null;
  industry: string;
  teamSize: string;
  founded: string;
  companyWebsite: string;
  vision: string;
  address: string;
  phone: string;
  email: string;
  capacity?: number;
}
