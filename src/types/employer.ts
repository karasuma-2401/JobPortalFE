export interface Employer {
  id: string;
  name: string;
  logo: string;
  location: string;
  openJobsCount: number;
}

export interface EmployerListProps {
  employers: Employer[];
}
