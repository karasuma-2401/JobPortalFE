import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { ArrowRight, Mail } from "lucide-react";

import ComboBox, { type OptionType } from "../../../components/ui/ComboBox";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";

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

  const [mapLocation, setMapLocation] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [countryCode, setCountryCode] = useState<OptionType>(CountryCodes[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "setup") {
      navigate("/employer/setup/success");
    } else {
      toast.success("Contact information updated successfully!");
    }
  };

  const handlePrevious = () => {
    navigate("/employer/setup/social");
  };

  return (
    <div className="w-full bg-white animate-in fade-in duration-500">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="font-medium text-sm text-gray-900">
              Map Location
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
                  onChange={(option) => {
                    setCountryCode(option);
                  }}
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
              className="px-6 py-3 font-semibold rounded-md bg-gray-100 text-gray-900 hover:bg-gray-200 transition-colors"
            >
              Previous
            </button>
          )}
          <Button
            variant="primary"
            type="submit"
            className={mode === "setup" ? "flex items-center gap-2" : ""}
          >
            {mode === "setup" ? (
              <>
                Finish Editings
                <ArrowRight size={18} />
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
