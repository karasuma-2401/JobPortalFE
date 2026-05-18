import {
  X,
  Bookmark,
  Mail,
  ArrowRight,
  Download,
  Globe,
  MapPin,
  Phone,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Youtube,
} from "lucide-react";

interface CandidateProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  candidateName: string;
  candidateRole: string;
}

export default function CandidateProfileModal({
  isOpen,
  onClose,
  candidateName,
  candidateRole,
}: CandidateProfileModalProps) {
  if (!isOpen) return null;

  const defaultAvatar =
    "https://ui-avatars.com/api/?name=" +
    candidateName.replace(" ", "+") +
    "&background=f3f4f6&color=4b5563";

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
              src={defaultAvatar}
              alt={candidateName}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                {candidateName}
              </h2>
              <p className="text-sm text-gray-500">{candidateRole}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2.5 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-md transition-colors">
              <Bookmark size={20} fill="currentColor" />
            </button>
            <button className="flex items-center gap-2 px-6 py-2.5 bg-white border border-blue-600 text-blue-600 rounded-md text-sm font-bold hover:bg-blue-50 transition-colors">
              <Mail size={16} /> Send Mail
            </button>
            <button className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-md text-sm font-bold hover:bg-blue-700 transition-colors">
              Hire Candidates <ArrowRight size={16} />
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
                <div className="text-sm text-gray-600 leading-relaxed space-y-4">
                  <p>
                    I've been passionate about graphic design and digital art
                    from an early age with a keen interest in Website and Mobile
                    Application User Interfaces. I can create high-quality and
                    aesthetically pleasing designs in a quick turnaround time.
                    Check out the portfolio section of my profile to see samples
                    of my work and feel free to discuss your designing needs.
                  </p>
                  <p>
                    I mostly use Adobe Photoshop, Illustrator, XD and Figma.
                    *Website User Experience and Interface (UI/UX) Design - for
                    all kinds of Professional and Personal websites. *Mobile
                    Application User Experience and Interface Design - for all
                    kinds of iOS/Android and Hybrid Mobile Applications.
                    *Wireframe Designs.
                  </p>
                </div>
              </section>

              <div className="w-full h-px bg-gray-100"></div>

              <section>
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-4">
                  Cover Letter
                </h3>
                <div className="text-sm text-gray-600 leading-relaxed space-y-4">
                  <p>Dear Sir,</p>
                  <p>
                    I am writing to express my interest in the fourth grade
                    instructional position that is currently available in the
                    Fort Wayne Community School System. I learned of the opening
                    through a notice posted on JobZone, IPFW's job database. I
                    am confident that my academic background and curriculum
                    development skills would be successfully utilized in this
                    teaching position.
                  </p>
                  <p>
                    I have just completed my Bachelor of Science degree in
                    Elementary Education and have successfully completed Praxis
                    I and Praxis II. During my student teaching experience, I
                    developed and initiated a three-week curriculum sequence on
                    animal species and earth resources.
                  </p>
                  <p>
                    Sincerely,
                    <br />
                    {candidateName}
                  </p>
                </div>
              </section>

              <section>
                <h3 className="text-sm font-bold text-gray-900 mb-4">
                  Follow me Social Media
                </h3>
                <div className="flex items-center gap-3">
                  <button className="w-10 h-10 flex items-center justify-center rounded bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-colors">
                    <Facebook size={18} />
                  </button>
                  <button className="w-10 h-10 flex items-center justify-center rounded bg-blue-50 text-blue-400 hover:bg-blue-400 hover:text-white transition-colors">
                    <Twitter size={18} />
                  </button>
                  <button className="w-10 h-10 flex items-center justify-center rounded bg-blue-50 text-blue-700 hover:bg-blue-700 hover:text-white transition-colors">
                    <Linkedin size={18} />
                  </button>
                  <button className="w-10 h-10 flex items-center justify-center rounded bg-orange-50 text-orange-600 hover:bg-orange-600 hover:text-white transition-colors">
                    <Instagram size={18} />
                  </button>
                  <button className="w-10 h-10 flex items-center justify-center rounded bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-colors">
                    <Youtube size={18} />
                  </button>
                </div>
              </section>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6 p-6 border border-gray-100 rounded-xl">
                <div>
                  <div className="text-blue-600 mb-2">
                    <i className="fa-regular fa-calendar text-xl"></i>
                  </div>
                  <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider mb-1">
                    Date of Birth
                  </p>
                  <p className="text-sm font-semibold text-gray-900">
                    14 June, 2021
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
                    Bangladesh
                  </p>
                </div>
                <div>
                  <div className="text-blue-600 mb-2">
                    <i className="fa-solid fa-ring text-xl"></i>
                  </div>
                  <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider mb-1">
                    Marital Status
                  </p>
                  <p className="text-sm font-semibold text-gray-900">Single</p>
                </div>
                <div>
                  <div className="text-blue-600 mb-2">
                    <i className="fa-solid fa-venus-mars text-xl"></i>
                  </div>
                  <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider mb-1">
                    Gender
                  </p>
                  <p className="text-sm font-semibold text-gray-900">Male</p>
                </div>
                <div>
                  <div className="text-blue-600 mb-2">
                    <i className="fa-solid fa-briefcase text-xl"></i>
                  </div>
                  <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider mb-1">
                    Experience
                  </p>
                  <p className="text-sm font-semibold text-gray-900">7 Years</p>
                </div>
                <div>
                  <div className="text-blue-600 mb-2">
                    <i className="fa-solid fa-graduation-cap text-xl"></i>
                  </div>
                  <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider mb-1">
                    Educations
                  </p>
                  <p className="text-sm font-semibold text-gray-900">
                    Master Degree
                  </p>
                </div>
              </div>

              <div className="p-6 border border-gray-100 rounded-xl">
                <h3 className="text-sm font-bold text-gray-900 mb-4">
                  Download My Resume
                </h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-50 flex items-center justify-center rounded text-gray-400">
                      <i className="fa-regular fa-file-pdf text-xl"></i>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-medium">
                        {candidateName}
                      </p>
                      <p className="text-sm font-bold text-gray-900">PDF</p>
                    </div>
                  </div>
                  <button className="w-10 h-10 bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white flex items-center justify-center rounded transition-colors">
                    <Download size={18} />
                  </button>
                </div>
              </div>

              <div className="p-6 border border-gray-100 rounded-xl space-y-6">
                <h3 className="text-sm font-bold text-gray-900">
                  Contact Information
                </h3>
                <div className="flex gap-3">
                  <Globe size={20} className="text-blue-600 shrink-0" />
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider mb-0.5">
                      Website
                    </p>
                    <p className="text-sm font-semibold text-gray-900">
                      www.{candidateName.toLowerCase().replace(" ", "")}.com
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <MapPin size={20} className="text-blue-600 shrink-0" />
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider mb-0.5">
                      Location
                    </p>
                    <p className="text-sm font-semibold text-gray-900 mb-1">
                      Beverly Hills, California 90202
                    </p>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      Zone/Block Basement 1 Unit B2, 1372 Spring Avenue,
                      Portland.
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
                      <p className="text-sm font-semibold text-gray-900">
                        +1-202-555-0141
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider mb-0.5">
                        Secondary Phone
                      </p>
                      <p className="text-sm font-semibold text-gray-900">
                        +1-202-555-0189
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Mail size={20} className="text-blue-600 shrink-0" />
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider mb-0.5">
                      Email Address
                    </p>
                    <p className="text-sm font-semibold text-gray-900">
                      {candidateName.toLowerCase().replace(" ", "")}@gmail.com
                    </p>
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
