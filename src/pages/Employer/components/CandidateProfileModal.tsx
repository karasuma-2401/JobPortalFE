import {
  X,
  Bookmark,
  Mail,
  ArrowRight,
  Download,
  Globe,
  MapPin,
  Phone,
  BookmarkMinus,
} from "lucide-react";
import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
} from "react-icons/fa";
import { useState, useEffect } from "react";
import { toast } from "sonner";

export interface Candidate {
  id: string;
  name: string;
  role: string;
  avatar: string | null;
  biography: string;
  coverLetter: string;
  dateOfBirth: string;
  nationality: string;
  maritalStatus: string;
  gender: string;
  experience: string;
  education: string;
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

interface CandidateProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  candidate: Candidate | null;
  onHire: (id: string) => void;
}

export default function CandidateProfileModal({
  isOpen,
  onClose,
  candidate,
  onHire,
}: CandidateProfileModalProps) {
  const [isSaved, setIsSaved] = useState(true);

  // close modal on ESC key press down
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !candidate) return null;

  const defaultAvatar =
    "https://ui-avatars.com/api/?name=" +
    candidate.name.replace(" ", "+") +
    "&background=f3f4f6&color=4b5563";

  const handleToggleSave = () => {
    setIsSaved(!isSaved);
    if (isSaved) {
      toast.info(`${candidate.name} has been removed from saved list.`);
    } else {
      toast.success(`${candidate.name} has been bookmarked!`);
    }
  };

  const handleSendMail = async () => {
    try {
      await navigator.clipboard.writeText(candidate.email);
      const subject = encodeURIComponent(
        `Interview Invitation: ${candidate.role}`,
      );
      const body = encodeURIComponent(
        `Hi ${candidate.name},\n\nWe would like to invite you to an interview for the ${candidate.role} position.\n\nBest regards,\nHR Team`,
      );

      const link = document.createElement("a");
      link.href = `mailto:${candidate.email}?subject=${subject}&body=${body}`;
      link.click();

      toast.success(`Email copied to clipboard! Opening mail app...`);
    } catch (err) {
      toast.error("Failed to copy email to clipboard." + err);
    }
  };

  const handleDownloadCV = () => {
    const dummyContent = `RESUME\n\nName: ${candidate.name}\nRole: ${candidate.role}\nEmail: ${candidate.email}\nPhone: ${candidate.phone}\n\nExperience: ${candidate.experience}\nEducation: ${candidate.education}`;

    const blob = new Blob([dummyContent], { type: "application/pdf" });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute(
      "download",
      `${candidate.name.replace(/\s+/g, "_")}_Resume.pdf`,
    );

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    toast.success(`Downloading ${candidate.name}'s Resume...`);
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl bg-white rounded-2xl shadow-2xl flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute -top-4 -right-4 w-10 h-10 bg-white shadow-md text-gray-500 hover:text-gray-900 rounded-full flex items-center justify-center transition-colors z-10"
        >
          <X size={20} />
        </button>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between p-8 border-b border-gray-100 shrink-0 gap-4">
          <div className="flex items-center gap-4">
            <img
              src={candidate.avatar || defaultAvatar}
              alt={candidate.name}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                {candidate.name}
              </h2>
              <p className="text-sm text-gray-500">{candidate.role}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleToggleSave}
              className={`p-2.5 rounded-md transition-colors ${isSaved ? "text-blue-600 bg-blue-50 hover:bg-red-50 hover:text-red-500" : "text-gray-400 bg-gray-50 hover:bg-blue-50 hover:text-blue-600"}`}
              title={isSaved ? "Unsave Candidate" : "Save Candidate"}
            >
              {isSaved ? (
                <Bookmark size={20} fill="currentColor" />
              ) : (
                <BookmarkMinus size={20} />
              )}
            </button>
            <button
              onClick={handleSendMail}
              className="flex items-center gap-2 px-6 py-2.5 bg-white border border-blue-600 text-blue-600 rounded-md text-sm font-bold hover:bg-blue-50 transition-colors"
            >
              <Mail size={16} /> Send Mail
            </button>
            <button
              onClick={() => {
                onHire(candidate.id);
                onClose();
              }}
              className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-md text-sm font-bold hover:bg-blue-700 transition-colors"
            >
              Hire Candidate <ArrowRight size={16} />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-8">
              <section>
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-4">
                  Biography
                </h3>
                <div className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                  {candidate.biography}
                </div>
              </section>

              <div className="w-full h-px bg-gray-100"></div>

              <section>
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-4">
                  Cover Letter
                </h3>
                <div className="text-sm text-gray-600 leading-relaxed whitespace-pre-line bg-gray-50 p-6 rounded-xl border border-gray-100 italic">
                  "{candidate.coverLetter}"
                </div>
              </section>

              <section>
                <h3 className="text-sm font-bold text-gray-900 mb-4">
                  Social Media
                </h3>
                {!candidate.social?.facebook &&
                !candidate.social?.twitter &&
                !candidate.social?.linkedin ? (
                  <p className="text-sm text-gray-400 italic">
                    No social media links provided.
                  </p>
                ) : (
                  <div className="flex items-center gap-3">
                    {candidate.social?.facebook && (
                      <a
                        href={candidate.social.facebook}
                        target="_blank"
                        rel="noreferrer"
                        className="w-10 h-10 flex items-center justify-center rounded bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-colors"
                      >
                        <FaFacebook size={18} />
                      </a>
                    )}
                    {candidate.social?.twitter && (
                      <a
                        href={candidate.social.twitter}
                        target="_blank"
                        rel="noreferrer"
                        className="w-10 h-10 flex items-center justify-center rounded bg-blue-50 text-blue-400 hover:bg-blue-400 hover:text-white transition-colors"
                      >
                        <FaTwitter size={18} />
                      </a>
                    )}
                    {candidate.social?.linkedin && (
                      <a
                        href={candidate.social.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="w-10 h-10 flex items-center justify-center rounded bg-blue-50 text-blue-700 hover:bg-blue-700 hover:text-white transition-colors"
                      >
                        <FaLinkedin size={18} />
                      </a>
                    )}
                  </div>
                )}
              </section>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6 p-6 border border-gray-100 rounded-xl bg-white">
                <div>
                  <div className="text-blue-600 mb-2">
                    <i className="fa-regular fa-calendar text-xl"></i>
                  </div>
                  <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider mb-1">
                    Date of Birth
                  </p>
                  <p className="text-sm font-semibold text-gray-900">
                    {candidate.dateOfBirth}
                  </p>
                </div>
                <div>
                  <div className="text-blue-600 mb-2">
                    <Globe size={20} />
                  </div>
                  <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider mb-1">
                    Nationality
                  </p>
                  <p className="text-sm font-semibold text-gray-900">
                    {candidate.nationality}
                  </p>
                </div>
                <div>
                  <div className="text-blue-600 mb-2">
                    <i className="fa-solid fa-ring text-xl"></i>
                  </div>
                  <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider mb-1">
                    Marital Status
                  </p>
                  <p className="text-sm font-semibold text-gray-900">
                    {candidate.maritalStatus}
                  </p>
                </div>
                <div>
                  <div className="text-blue-600 mb-2">
                    <i className="fa-solid fa-venus-mars text-xl"></i>
                  </div>
                  <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider mb-1">
                    Gender
                  </p>
                  <p className="text-sm font-semibold text-gray-900">
                    {candidate.gender}
                  </p>
                </div>
                <div>
                  <div className="text-blue-600 mb-2">
                    <i className="fa-solid fa-briefcase text-xl"></i>
                  </div>
                  <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider mb-1">
                    Experience
                  </p>
                  <p className="text-sm font-semibold text-gray-900">
                    {candidate.experience}
                  </p>
                </div>
                <div>
                  <div className="text-blue-600 mb-2">
                    <i className="fa-solid fa-graduation-cap text-xl"></i>
                  </div>
                  <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider mb-1">
                    Education
                  </p>
                  <p className="text-sm font-semibold text-gray-900">
                    {candidate.education}
                  </p>
                </div>
              </div>

              <div className="p-6 border border-gray-100 rounded-xl bg-blue-50/50">
                <h3 className="text-sm font-bold text-gray-900 mb-4">
                  Download Resume
                </h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white flex items-center justify-center rounded text-red-500 shadow-sm">
                      <i className="fa-solid fa-file-pdf text-xl"></i>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-medium">
                        {candidate.name}
                      </p>
                      <p className="text-sm font-bold text-gray-900">
                        PDF Document
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleDownloadCV}
                    className="w-10 h-10 bg-blue-600 text-white hover:bg-blue-700 flex items-center justify-center rounded transition-colors shadow-md"
                  >
                    <Download size={18} />
                  </button>
                </div>
              </div>

              <div className="p-6 border border-gray-100 rounded-xl space-y-6 bg-white">
                <h3 className="text-sm font-bold text-gray-900">
                  Contact Information
                </h3>
                <div className="flex gap-3">
                  <Globe size={20} className="text-blue-600 shrink-0" />
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider mb-0.5">
                      Website
                    </p>
                    <a
                      href={`https://${candidate.website}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm font-semibold text-blue-600 hover:underline"
                    >
                      {candidate.website}
                    </a>
                  </div>
                </div>
                <div className="flex gap-3">
                  <MapPin size={20} className="text-blue-600 shrink-0" />
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider mb-0.5">
                      Location
                    </p>
                    <p className="text-sm font-semibold text-gray-900 leading-relaxed whitespace-pre-line">
                      {candidate.location}
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Phone size={20} className="text-blue-600 shrink-0" />
                  <div className="space-y-3">
                    <div>
                      <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider mb-0.5">
                        Phone
                      </p>
                      <a
                        href={`tel:${candidate.phone}`}
                        className="text-sm font-semibold text-gray-900 hover:text-blue-600 transition-colors"
                      >
                        {candidate.phone}
                      </a>
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider mb-0.5">
                        Secondary Phone
                      </p>
                      <a
                        href={`tel:${candidate.secondaryPhone}`}
                        className="text-sm font-semibold text-gray-900 hover:text-blue-600 transition-colors"
                      >
                        {candidate.secondaryPhone}
                      </a>
                    </div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Mail size={20} className="text-blue-600 shrink-0" />
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider mb-0.5">
                      Email Address
                    </p>
                    <a
                      href={`mailto:${candidate.email}`}
                      className="text-sm font-semibold text-gray-900 break-all hover:text-blue-600 transition-colors"
                    >
                      {candidate.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
