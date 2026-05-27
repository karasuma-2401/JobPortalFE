export type ApprovalStatus = "Pending" | "Approved" | "Rejected";
export interface EmployerProfile {
  id: string;
  companyName: string;
  email: string;
  industry: string;
  registrationDate: string;
  status: ApprovalStatus;
  logoUrl: string;
  bannerUrl: string;
  address: string;
  website: string;
  businessLicenseUrl: string | null;
  description: string;
}
