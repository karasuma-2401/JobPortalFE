import { useNavigate } from "react-router-dom";
import ProfileHeader from "./components/ProfileHeader";
import ProfileAbout from "./components/ProfileAbout";
import ProfileSidebar from "./components/ProfileSidebar";
import OpenJobsList from "./components/OpenJobsList";

const MOCK_COMPANY_DATA = {
  name: "TechVision Inc.",
  location: "San Francisco, California",
  website: "www.techvision.com",
  logoUrl:
    "https://ui-avatars.com/api/?name=Tech+Vision&background=2563eb&color=fff&size=200",
  bannerUrl:
    "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2000&auto=format&fit=crop",
  aboutUs:
    "TechVision is a leading software development company dedicated to building innovative products that solve real-world problems. With a strong focus on artificial intelligence and cloud computing, we empower businesses to scale globally.\n\nOur team consists of passionate engineers, designers, and product managers who thrive in a collaborative and fast-paced environment.",
  vision:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce dignissim, magna sit amet sollicitudin luctus, purus quam viverra erat, ut venenatis felis nisi non libero. Sed in risus orci. Aenean sodales consequat lectus non lobortis. Suspendisse ullamcorper interdum nisl in dictum. Fusce varius enim eget tellus egestas porta. Vivamus ac elit nec libero dapibus tempor et vitae mauris. Donec cursus, nisl sed facilisis facilisis, est odio volutpat libero, in auctor odio nisl vel est. Nulla facilisi. Ut rhoncus erat non lectus lacinia imperdiet. Pellentesque laoreet volutpat odio, dictum hendrerit nunc. Donec ac varius nisi. Nulla fringilla augue vitae eros fringilla viverra. Nulla eu lacus elit. Curabitur metus mi, ornare bibendum urna non, egestas ornare augue.",
  founded: "14 June, 2010",
  teamSize: "201 - 500 Employees",
  industry: "Information Technology",
  email: "hello@techvision.com",
  phone: "+1-202-555-0178",
  socials: {
    facebook: "https://facebook.com",
    twitter: "https://twitter.com",
    linkedin: "https://linkedin.com",
  },
};

const MOCK_JOBS = [
  {
    id: "j1",
    title: "Senior React Developer",
    type: "Full-time",
    location: "Remote",
    salary: "$120k - $150k",
  },
  {
    id: "j2",
    title: "UX/UI Product Designer",
    type: "Full-time",
    location: "San Francisco",
    salary: "$90k - $120k",
  },
  {
    id: "j3",
    title: "Backend Node.js Engineer",
    type: "Contract",
    location: "Remote",
    salary: "$80k - $100k",
  },
];

export default function EmployerProfilePage() {
  const navigate = useNavigate();

  const handleEditProfile = () => {
    navigate("/employer/settings");
  };

  const handleViewAllJobs = () => {
    navigate("/employer/my-jobs");
  };

  return (
    <div className="w-full mx-auto animate-in fade-in duration-500 pb-16">
      <ProfileHeader
        companyName={MOCK_COMPANY_DATA.name}
        location={MOCK_COMPANY_DATA.location}
        website={MOCK_COMPANY_DATA.website}
        logoUrl={MOCK_COMPANY_DATA.logoUrl}
        bannerUrl={MOCK_COMPANY_DATA.bannerUrl}
        onEdit={handleEditProfile}
      />

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 mt-8">
        <div className="xl:col-span-8 flex flex-col gap-8">
          <ProfileAbout
            aboutUs={MOCK_COMPANY_DATA.aboutUs}
            vision={MOCK_COMPANY_DATA.vision}
          />
          <OpenJobsList jobs={MOCK_JOBS} onViewAll={handleViewAllJobs} />
        </div>

        <div className="xl:col-span-4">
          <ProfileSidebar
            founded={MOCK_COMPANY_DATA.founded}
            teamSize={MOCK_COMPANY_DATA.teamSize}
            industry={MOCK_COMPANY_DATA.industry}
            email={MOCK_COMPANY_DATA.email}
            phone={MOCK_COMPANY_DATA.phone}
            socials={MOCK_COMPANY_DATA.socials}
          />
        </div>
      </div>
    </div>
  );
}
