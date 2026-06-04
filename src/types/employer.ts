export interface SocialLinkPayload {
  network: string;
  url: string;
}

export interface EmployerSetupPayload {
  companyName: string;
  description: string;
  logo: File | null;
  banner: File | null;
  organizationType: string;
  industry: string;
  teamSize: string;
  founded: string;
  companyWebsite: string;
  vision: string;
  address: string;
  phone: string;
  email: string;
  socialLinks: SocialLinkPayload[];
}
