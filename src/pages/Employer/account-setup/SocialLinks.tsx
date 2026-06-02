import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { ArrowRight, Plus, X } from "lucide-react";
import { Facebook, Twitter, Instagram, Youtube, Linkedin } from "lucide-react";

import ComboBox, { type OptionType } from "../../../components/ui/ComboBox";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";

const socialNetworks: OptionType[] = [
  {
    label: "Facebook",
    icon: <Facebook className="text-blue-600" />,
    value: "facebook",
  },
  {
    label: "Twitter",
    icon: <Twitter className="text-sky-500" />,
    value: "twitter",
  },
  {
    label: "Instagram",
    icon: <Instagram className="text-pink-600" />,
    value: "instagram",
  },
  {
    label: "Youtube",
    icon: <Youtube className="text-red-600" />,
    value: "youtube",
  },
  {
    label: "LinkedIn",
    icon: <Linkedin className="text-blue-700" />,
    value: "linkedin",
  },
];

interface SocialLinkItem {
  id: string;
  network: OptionType;
  url: string;
}

interface SocialLinksProps {
  mode?: "setup" | "settings";
}

export default function SocialLinks({ mode = "setup" }: SocialLinksProps) {
  const navigate = useNavigate();

  const [links, setLinks] = useState<SocialLinkItem[]>([
    {
      id: new Date().getTime().toString(),
      network: socialNetworks[0],
      url: "",
    },
  ]);

  const handleAddLink = () => {
    setLinks([
      ...links,
      { id: Date.now().toString(), network: socialNetworks[0], url: "" },
    ]);
  };

  const handleRemoveLink = (idToRemove: string) => {
    if (links.length === 1) return;
    setLinks(links.filter((link) => link.id !== idToRemove));
  };

  const handleUpdateLink = (
    id: string,
    field: "network" | "url",
    value: OptionType | string,
  ) => {
    setLinks(
      links.map((link) =>
        link.id === id ? { ...link, [field]: value } : link,
      ),
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "setup") {
      navigate("/employer/setup/contact");
    } else {
      toast.success("Social links updated successfully!");
    }
  };

  const handlePrevious = () => {
    navigate("/employer/setup/founding");
  };

  return (
    <div className="w-full bg-white animate-in fade-in duration-500">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          {links.map((link, index) => (
            <div key={link.id} className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-900">
                Social Link {index + 1}
              </label>

              <div className="flex items-center gap-3">
                <div className="w-1/3 min-w-37.5">
                  <ComboBox
                    options={socialNetworks}
                    value={link.network}
                    onChange={(option) =>
                      handleUpdateLink(link.id, "network", option)
                    }
                  />
                </div>
                <div className="flex-1">
                  <Input
                    type="url"
                    placeholder="Profile link/url..."
                    value={link.url}
                    className="h-11.5"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleUpdateLink(link.id, "url", e.target.value)
                    }
                  />
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveLink(link.id)}
                  disabled={links.length === 1}
                  className={`font-extrabold w-10 h-10 p-3 rounded-full border border-gray-200 transition-colors flex items-center justify-center
                    ${links.length === 1 ? "bg-gray-50 text-gray-300 cursor-not-allowed" : "bg-gray-50 text-gray-900 hover:bg-red-50 hover:text-red-500 hover:border-red-200"}`}
                >
                  <X size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={handleAddLink}
          className="w-full py-3 mt-2 flex items-center justify-center gap-2 font-medium text-gray-700 bg-gray-50 border border-gray-200 rounded-md hover:bg-gray-100 transition-colors"
        >
          <Plus size={18} /> Add New Social Link
        </button>
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
                Save & Next <ArrowRight size={18} />
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
