export interface JobDetailType {
  id: string;
  title: string;
  companyName: string;
  logo: string;
  type: string;
  isFeatured: boolean;
  website: string;
  phone: string;
  email: string;
  expireDate: string;
  description: string[];
  responsibilities: string[];
  overview: {
    postedDate: string;
    expireIn: string;
    education: string;
    salary: string;
    location: string;
    jobType: string;
    experience: string;
  };
  companyProfile: {
    industry: string;
    foundedIn: string;
    orgType: string;
    companySize: string;
  };
}

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
      "You will collaborate closely with product management, design, and analytics teams to craft compelling narratives that resonate with developer and business audiences worldwide."
    ],
    responsibilities: [
      "Develop and scale end-to-end inbound and outbound marketing campaigns.",
      "Analyze campaign performance metrics and optimize conversion funnels.",
      "Oversee creation of high-quality content assets, including landing pages, case studies, and email copies."
    ],
    overview: {
      postedDate: "05 June, 2026",
      expireIn: "25 June, 2026",
      education: "Bachelor's Degree",
      salary: "$50k-$80k/month",
      location: "New Mexico, USA",
      jobType: "Remote",
      experience: "3-5 Years"
    },
    companyProfile: {
      industry: "Financial Services & SaaS",
      foundedIn: "September 2010",
      orgType: "Private Company",
      companySize: "5000+ Employees"
    }
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
      "The ideal candidate is excellent at resolving cross-team dependencies, maintaining agile methodologies, and fostering clear technical communications."
    ],
    responsibilities: [
      "Facilitate sprint planning, daily stand-ups, and retrospective meetings.",
      "Track milestones and deliverables using internal management frameworks (Jira/Linear).",
      "Manage client-facing project transparency and adjust resources as requirements evolve."
    ],
    overview: {
      postedDate: "01 June, 2026",
      expireIn: "12 July, 2026",
      education: "Graduation",
      salary: "$50k-$80k/month",
      location: "Dhaka, Bangladesh",
      jobType: "Full Time",
      experience: "5+ Years"
    },
    companyProfile: {
      industry: "E-Commerce Platform",
      foundedIn: "September 2004",
      orgType: "Public Company",
      companySize: "10,000+ Employees"
    }
  }
};