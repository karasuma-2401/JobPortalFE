import { Globe, MapPin, Phone, Mail } from "lucide-react";

interface ContactInfoCardProps {
  website?: string;
  location: string;
  phone: string;
  secondaryPhone: string;
  email: string;
}

export default function ContactInfoCard({
  website,
  location,
  phone,
  secondaryPhone,
  email,
}: ContactInfoCardProps) {
  return (
    <div className="p-6 border border-gray-100 rounded-xl space-y-6 bg-white">
      <h3 className="text-sm font-bold text-gray-900">Contact Information</h3>
      {website && (
        <div className="flex gap-3">
          <Globe size={20} className="text-blue-600 shrink-0" />
          <div>
            <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider mb-0.5">Website</p>
            <a
              href={website.startsWith("http") ? website : `https://${website}`}
              target="_blank"
              rel="noreferrer"
              className="text-sm font-semibold text-blue-600 hover:underline"
            >
              {website}
            </a>
          </div>
        </div>
      )}
      <div className="flex gap-3">
        <MapPin size={20} className="text-blue-600 shrink-0" />
        <div>
          <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider mb-0.5">Location</p>
          <p className="text-sm font-semibold text-gray-900 leading-relaxed whitespace-pre-line">{location}</p>
        </div>
      </div>
      <div className="flex gap-3">
        <Phone size={20} className="text-blue-600 shrink-0" />
        <div className="space-y-3">
          <div>
            <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider mb-0.5">Phone</p>
            <a href={`tel:${phone}`} className="text-sm font-semibold text-gray-900 hover:text-blue-600 transition-colors">
              {phone}
            </a>
          </div>
          {secondaryPhone !== "Not specified" && (
            <div>
              <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider mb-0.5">Secondary Phone</p>
              <a href={`tel:${secondaryPhone}`} className="text-sm font-semibold text-gray-900 hover:text-blue-600 transition-colors">
                {secondaryPhone}
              </a>
            </div>
          )}
        </div>
      </div>
      <div className="flex gap-3">
        <Mail size={20} className="text-blue-600 shrink-0" />
        <div>
          <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider mb-0.5">Email Address</p>
          <a href={`mailto:${email}`} className="text-sm font-semibold text-gray-900 break-all hover:text-blue-600 transition-colors">
            {email}
          </a>
        </div>
      </div>
    </div>
  );
}