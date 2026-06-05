import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";
import { ArrowRight, Mail, Loader2 } from "lucide-react";

import ComboBox, { type OptionType } from "../../../components/ui/ComboBox";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";
import { useSetupEmployer } from "../../../hooks/useEmployer";

const CountryCodes = [
  {
    label: "+84 (VN)",
    value: "+84",
    icon: <span className="text-sm">VN</span>,
  },
  { label: "+1 (US)", value: "+1", icon: <span className="text-sm">US</span> },
];

interface ContactProps {
  mode?: "setup" | "settings";
}

export default function Contact({ mode = "setup" }: ContactProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const previousState = location.state || {};

  const { mutate: setupEmployer, isPending } = useSetupEmployer();

  const [mapLocation, setMapLocation] = useState(previousState.address || "");
  const [phone, setPhone] = useState(previousState.phone || "");
  const [email, setEmail] = useState(previousState.email || "");
  const [countryCode, setCountryCode] = useState<OptionType>(CountryCodes[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!mapLocation || !phone || !email) {
      toast.error("Please fill in all required contact fields!");
      return;
    }

    if (mode === "setup") {
      const fullPhoneNumber = `${countryCode.value}${phone}`;
      const formData = new FormData();

      formData.append("companyName", previousState.companyName || "");
      formData.append("description", previousState.description || "");
      formData.append("organizationType", previousState.organizationType || "");
      formData.append("industry", previousState.industry || "");
      formData.append("teamSize", previousState.teamSize || "");
      formData.append("founded", previousState.founded || "");
      formData.append("companyWebsite", previousState.companyWebsite || "");
      formData.append("vision", previousState.vision || "");

      formData.append("address", mapLocation);
      formData.append("phone", fullPhoneNumber);
      formData.append("email", email);

      if (
        previousState.socialLinks &&
        Array.isArray(previousState.socialLinks)
      ) {
        previousState.socialLinks.forEach(
          (link: { networkValue: string; url: string }) => {
            if (link.networkValue === "facebook")
              formData.append("facebookUrl", link.url);
            if (link.networkValue === "youtube")
              formData.append("youtubeUrl", link.url);
            if (link.networkValue === "linkedin")
              formData.append("linkedinUrl", link.url);
          },
        );
      }

      if (previousState.logo) formData.append("logo", previousState.logo);
      if (previousState.banner) formData.append("banner", previousState.banner);

      setupEmployer(formData);
    } else {
      toast.success("Contact information updated successfully!");
    }
  };

  const handlePrevious = () => {
    const currentData = {
      ...previousState,
      address: mapLocation,
      phone,
      email,
    };
    navigate("/employer/setup/social", { state: currentData });
  };

  return (
    <div className="w-full bg-white animate-in fade-in duration-500">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="font-medium text-sm text-gray-900">
              Map Location / Address
            </label>
            <Input
              type="text"
              placeholder="Enter your location"
              value={mapLocation}
              onChange={(e) => setMapLocation(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-medium text-sm text-gray-900">Phone</label>
            <div className="flex gap-3">
              <div className="w-45">
                <ComboBox
                  options={CountryCodes}
                  value={countryCode}
                  onChange={(option) => setCountryCode(option)}
                />
              </div>
              <Input
                type="tel"
                placeholder="Phone number..."
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-medium text-sm text-gray-900">Email</label>
            <div className="flex gap-3">
              <div className="w-12 flex items-center justify-center border border-gray-200 rounded-md">
                <Mail size={20} className="text-gray-400" />
              </div>
              <Input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 mt-6">
          {mode === "setup" && (
            <button
              type="button"
              onClick={handlePrevious}
              disabled={isPending}
              className="px-6 py-3 font-semibold rounded-md bg-gray-100 text-gray-900 hover:bg-gray-200 transition-colors disabled:opacity-50"
            >
              Previous
            </button>
          )}
          <Button
            variant="primary"
            type="submit"
            disabled={isPending}
            className={mode === "setup" ? "flex items-center gap-2" : ""}
          >
            {isPending ? (
              <Loader2 className="animate-spin mx-auto" size={20} />
            ) : mode === "setup" ? (
              <>
                Finish Editings <ArrowRight size={18} />
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
