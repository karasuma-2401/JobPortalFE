import { LocalStorageService } from "../services/local-storage";
import type {
  Job,
  JobDetailType,
  Employer,
  EmployerDetail,
  JobFilterParams,
  EmployerFilterParams,
  AppliedJobType,
  FavoriteJobType,
  JobAlertItemType,
  DashboardOverviewType,
} from "../types/jobseeker";

// ============================================================================
// MOCK DATA CONSTANTS
// ============================================================================
export const MOCK_JOBS: Job[] = [
  {
    id: "1",
    title: "Marketing Manager",
    companyName: "Stripe",
    type: "Remote",
    isFeatured: true,
    logo: "https://logo.clearbit.com/stripe.com",
    location: "New Mexico, USA",
    salary: "$50k-$80k/month",
    daysRemaining: "4 Days Remaining",
    experience: "4 - 6 Years",
    education: "Bachelor's Degree",
    jobLevel: "Mid Level",
  },
  {
    id: "2",
    title: "Project Manager",
    companyName: "Shopify",
    type: "Full Time",
    isFeatured: true,
    logo: "https://logo.clearbit.com/shopify.com",
    location: "Dhaka, Bangladesh",
    salary: "$50k-$80k/month",
    daysRemaining: "4 Days Remaining",
    experience: "5+ Years",
    education: "Graduation",
    jobLevel: "Expert Level",
  },
  {
    id: "3",
    title: "React JS Developer",
    companyName: "Facebook",
    type: "Full Time",
    isFeatured: false,
    logo: "https://logo.clearbit.com/facebook.com",
    location: "California, USA",
    salary: "$6000 - $8000",
    daysRemaining: "10 Days Remaining",
    experience: "2 - 4 Years",
    education: "Bachelor's Degree",
    jobLevel: "Mid Level",
  },
  {
    id: "4",
    title: "Junior UI Designer",
    companyName: "Figma",
    type: "Internship",
    isFeatured: false,
    logo: "https://logo.clearbit.com/figma.com",
    location: "San Francisco, USA",
    salary: "$1000 - $2000",
    daysRemaining: "2 Weeks Remaining",
    experience: "Freshers",
    education: "Intermediate",
    jobLevel: "Entry Level",
  },
];

export const MOCK_JOB_DETAILS: Record<string, JobDetailType> = {
  "1": {
    id: "1",
    title: "Marketing Manager",
    companyName: "Stripe",
    logo: "https://logo.clearbit.com/stripe.com",
    type: "Remote",
    isFeatured: true,
    website: "https://stripe.com",
    phone: "+1 (800) 555-0199",
    email: "careers@stripe.com",
    expireDate: "June 25, 2026",
    description: [
      "We are looking for a Marketing Manager to join our growth team. In this role, you will design, execute, and iterate on multi-channel marketing campaigns to drive user acquisition and engagement.",
      "You will collaborate closely with product management, design, and analytics teams to craft compelling narratives that resonate with developer and business audiences worldwide.",
    ],
    responsibilities: [
      "Develop and scale end-to-end inbound and outbound marketing campaigns.",
      "Analyze campaign performance metrics and optimize conversion funnels.",
      "Oversee creation of high-quality content assets, including landing pages, case studies, and email copies.",
    ],
    overview: {
      postedDate: "05 June, 2026",
      expireIn: "25 June, 2026",
      education: "Bachelor's Degree",
      salary: "$50k-$80k/month",
      location: "New Mexico, USA",
      jobType: "Remote",
      experience: "3-5 Years",
    },
    companyProfile: {
      industry: "Financial Services & SaaS",
      foundedIn: "September 2010",
      orgType: "Private Company",
      companySize: "5000+ Employees",
    },
  },
  "2": {
    id: "2",
    title: "Project Manager",
    companyName: "Shopify",
    logo: "https://logo.clearbit.com/shopify.com",
    type: "Full Time",
    isFeatured: true,
    website: "https://shopify.com",
    phone: "+1 (888) 746-7439",
    email: "jobs@shopify.com",
    expireDate: "July 12, 2026",
    description: [
      "Shopify is looking for an experienced Project Manager to organize and streamline development workflows. You will be core to building out next-generation e-commerce pipelines.",
      "The ideal candidate is excellent at resolving cross-team dependencies, maintaining agile methodologies, and fostering clear technical communications.",
    ],
    responsibilities: [
      "Facilitate sprint planning, daily stand-ups, and retrospective meetings.",
      "Track milestones and deliverables using internal management frameworks (Jira/Linear).",
      "Manage client-facing project transparency and adjust resources as requirements evolve.",
    ],
    overview: {
      postedDate: "01 June, 2026",
      expireIn: "12 July, 2026",
      education: "Graduation",
      salary: "$50k-$80k/month",
      location: "Dhaka, Bangladesh",
      jobType: "Full Time",
      experience: "5+ Years",
    },
    companyProfile: {
      industry: "E-Commerce Platform",
      foundedIn: "September 2004",
      orgType: "Public Company",
      companySize: "10,000+ Employees",
    },
  },
};

export const MOCK_EMPLOYERS: Employer[] = [
  {
    id: "1",
    name: "Dribbble",
    logo: "https://logo.clearbit.com/dribbble.com",
    location: "United States",
    openJobsCount: 3,
    category: "design",
  },
  {
    id: "2",
    name: "Udemy",
    logo: "https://logo.clearbit.com/udemy.com",
    location: "China",
    openJobsCount: 3,
    category: "tech",
  },
  {
    id: "3",
    name: "Figma",
    logo: "https://logo.clearbit.com/figma.com",
    location: "United States",
    openJobsCount: 3,
    category: "design",
  },
  {
    id: "4",
    name: "Google",
    logo: "https://logo.clearbit.com/google.com",
    location: "Australia",
    openJobsCount: 3,
    category: "tech",
  },
  {
    id: "5",
    name: "Microsoft",
    logo: "https://logo.clearbit.com/microsoft.com",
    location: "Australia",
    openJobsCount: 3,
    category: "tech",
  },
];

export const MOCK_EMPLOYER_DETAILS: Record<string, EmployerDetail> = {
  "1": {
    id: "1",
    name: "Dribbble",
    logo: "https://logo.clearbit.com/dribbble.com",
    category: "Design Community",
    description:
      "Dribbble is the go-to resource for discovering and connecting with designers and creative talent globally. Fusce et erat at nibh maximus fermentum. Mauris ac justo nibh.",
    benefits: [
      "In hac habitasse platea dictumst.",
      "Sed aliquet, arcu eget pretium bibendum.",
    ],
    vision:
      "To build the world's best platform for creatives to share their work and find opportunities.",
    overview: {
      founded: "01 January, 2009",
      orgType: "Private Company",
      teamSize: "50-100 Candidates",
      industry: "Technology & Creative",
    },
    contact: {
      website: "www.dribbble.com",
      phone: "+1-202-555-0101",
      email: "careers@dribbble.com",
    },
  },
  "4": {
    id: "4",
    name: "Google",
    logo: "https://logo.clearbit.com/google.com",
    category: "Information Technology (IT)",
    description:
      "Google's mission is to organize the world's information and make it universally accessible and useful. Fusce et erat at nibh maximus fermentum. Mauris ac justo nibh.",
    benefits: [
      "Flexible working hours and remote options.",
      "Comprehensive healthcare and wellness packages.",
    ],
    vision:
      "To provide access to the world's information in one click.",
    overview: {
      founded: "04 September, 1998",
      orgType: "Public Company",
      teamSize: "10,000+ Candidates",
      industry: "Technology",
    },
    contact: {
      website: "www.google.com",
      phone: "+1-650-253-0000",
      email: "jobs@google.com",
    },
  },
};

export const MOCK_JOB_ALERTS: JobAlertItemType[] = [
  { id: "1", keyword: "Technical Support Specialist", location: "Idaho, USA", category: "Full Time", createdAt: new Date().toISOString() },
  { id: "2", keyword: "UI/UX Designer", location: "Minnesota, USA", category: "Full Time", createdAt: new Date().toISOString() },
];

const LS_APPLIED_JOBS_KEY = "job_portal_applied_jobs";
const LS_FAVORITE_JOBS_KEY = "job_portal_favorite_jobs";
type StoredAppliedJobs = AppliedJobType[];
type StoredFavoriteJobs = FavoriteJobType[];

function ensureStoredArrays() {
  if (!localStorage.getItem(LS_APPLIED_JOBS_KEY)) {
    LocalStorageService.saveValue<StoredAppliedJobs>(LS_APPLIED_JOBS_KEY, []);
  }
  if (!localStorage.getItem(LS_FAVORITE_JOBS_KEY)) {
    LocalStorageService.saveValue<StoredFavoriteJobs>(LS_FAVORITE_JOBS_KEY, []);
  }
}

export function readAppliedJobs(): StoredAppliedJobs {
  ensureStoredArrays();
  return (LocalStorageService.getValue(LS_APPLIED_JOBS_KEY) as StoredAppliedJobs) ?? [];
}

export function readFavoriteJobs(): StoredFavoriteJobs {
  ensureStoredArrays();
  return (LocalStorageService.getValue(LS_FAVORITE_JOBS_KEY) as StoredFavoriteJobs) ?? [];
}

export function saveAppliedJobs(jobs: StoredAppliedJobs) {
  LocalStorageService.saveValue<StoredAppliedJobs>(LS_APPLIED_JOBS_KEY, jobs);
}

export function saveFavoriteJobs(jobs: StoredFavoriteJobs) {
  LocalStorageService.saveValue<StoredFavoriteJobs>(LS_FAVORITE_JOBS_KEY, jobs);
}

// ============================================================================
// SIMULATION HELPERS FOR HOOK FALLBACKS
// ============================================================================
export function toggleFavoriteJobLocal(jobId: string) {
  const favs = readFavoriteJobs();
  const exists = favs.some((j) => j.id === jobId);
  const job = MOCK_JOBS.find((j) => j.id === jobId) || (MOCK_JOB_DETAILS[jobId] ? {
    logo: MOCK_JOB_DETAILS[jobId].logo,
    title: MOCK_JOB_DETAILS[jobId].title,
    type: MOCK_JOB_DETAILS[jobId].type,
    location: MOCK_JOB_DETAILS[jobId].overview.location,
    salary: MOCK_JOB_DETAILS[jobId].overview.salary,
    daysRemaining: MOCK_JOB_DETAILS[jobId].overview.expireIn || "Saved",
  } : null);

  const placeholder: FavoriteJobType = {
    id: jobId,
    logo: job?.logo || "https://logo.clearbit.com/placeholder.com",
    role: job?.title || "Favorite Job",
    type: job?.type || "Favorite",
    location: job?.location || "",
    salary: job?.salary || "",
    timeStatus: job?.daysRemaining || "Saved",
    isExpired: false,
  };

  const updated = exists ? favs.filter((j) => j.id !== jobId) : [...favs, placeholder];
  saveFavoriteJobs(updated);
}

export function saveAppliedJobLocal(jobId: string) {
  const applied = readAppliedJobs();
  const job = MOCK_JOBS.find((j) => j.id === jobId) || (MOCK_JOB_DETAILS[jobId] ? {
    logo: MOCK_JOB_DETAILS[jobId].logo,
    title: MOCK_JOB_DETAILS[jobId].title,
    type: MOCK_JOB_DETAILS[jobId].type,
    location: MOCK_JOB_DETAILS[jobId].overview.location,
    salary: MOCK_JOB_DETAILS[jobId].overview.salary,
  } : null);

  const newApplied: AppliedJobType = {
    id: jobId,
    logo: job?.logo || "https://logo.clearbit.com/placeholder.com",
    role: job?.title || "Applied Job",
    type: job?.type || "Applied",
    location: job?.location || "",
    salary: job?.salary || "",
    dateApplied: new Date().toLocaleString(),
    status: "Active",
  };

  const updated = applied.some((j) => j.id === newApplied.id)
    ? applied.map((j) => (j.id === newApplied.id ? newApplied : j))
    : [...applied, newApplied];
  saveAppliedJobs(updated);
}

export function getFilteredJobsLocal(params: JobFilterParams): { items: Job[]; totalCount: number } {
  let filtered = [...MOCK_JOBS];
  if (params.keyword) {
    filtered = filtered.filter(
      (j) =>
        j.title.toLowerCase().includes(params.keyword!.toLowerCase()) ||
        j.companyName.toLowerCase().includes(params.keyword!.toLowerCase())
    );
  }
  if (params.location) {
    filtered = filtered.filter((j) =>
      j.location.toLowerCase().includes(params.location!.toLowerCase())
    );
  }

  if (params.jobTypes && params.jobTypes.length > 0 && !params.jobTypes.includes("All")) {
    filtered = filtered.filter((j) => params.jobTypes!.includes(j.type));
  }

  if (params.experience) {
    filtered = filtered.filter((j) => j.experience === params.experience);
  }

  if (params.education && params.education.length > 0 && !params.education.includes("All")) {
    filtered = filtered.filter((j) => j.education && params.education!.includes(j.education));
  }

  if (params.jobLevel) {
    filtered = filtered.filter((j) => j.jobLevel === params.jobLevel);
  }

  if (params.salaryRange) {
    filtered = filtered.filter((j) => j.salary.includes(params.salaryRange!) || params.salaryRange!.includes(j.salary));
  }

  const start = (params.page - 1) * params.limit;
  return {
    items: filtered.slice(start, start + params.limit),
    totalCount: filtered.length,
  };
}

export function getFilteredEmployersLocal(params: EmployerFilterParams): { items: Employer[]; totalCount: number } {
  let filtered = [...MOCK_EMPLOYERS];
  if (params.keyword) {
    filtered = filtered.filter((e) =>
      e.name.toLowerCase().includes(params.keyword!.toLowerCase())
    );
  }
  if (params.location) {
    filtered = filtered.filter((e) =>
      e.location.toLowerCase().includes(params.location!.toLowerCase())
    );
  }
  if (params.category) {
    filtered = filtered.filter((e) => e.category === params.category);
  }

  const start = (params.page - 1) * params.limit;
  return {
    items: filtered.slice(start, start + params.limit),
    totalCount: filtered.length,
  };
}

export function getDashboardOverviewLocal(): DashboardOverviewType {
  const appliedJobs = readAppliedJobs();
  const favoriteJobs = readFavoriteJobs();
  return {
    appliedCount: appliedJobs.length,
    favoriteCount: favoriteJobs.length,
    alertCount: MOCK_JOB_ALERTS.length,
    recentApplied: [...appliedJobs].slice(-4).reverse(),
    isProfileCompleted: false,
  };
}
