import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";
import { ArrowRight, Plus, X } from "lucide-react";
import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";

import ComboBox, { type OptionType } from "../../../components/ui/ComboBox";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";

const socialNetworks: OptionType[] = [
  {
    label: "LinkedIn",
    icon: <FaLinkedin className="text-blue-700" />,
    value: "linkedin",
  },
  {
    label: "Facebook",
    icon: <FaFacebook className="text-blue-600" />,
    value: "facebook",
  },
  {
    label: "Twitter",
    icon: <FaTwitter className="text-sky-500" />,
    value: "twitter",
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
  const location = useLocation();
  const previousState = location.state || {};

  const initialLinks = previousState.socialLinks
    ? previousState.socialLinks.map(
        (link: { id: string; networkValue: string; url: string }) => ({
          id: link.id,
          network:
            socialNetworks.find((n) => n.value === link.networkValue) ||
            socialNetworks[0],
          url: link.url,
        }),
      )
    : [
        {
          id: new Date().getTime().toString(),
          network: socialNetworks[0],
          url: "",
        },
      ];

  const [links, setLinks] = useState<SocialLinkItem[]>(initialLinks);

  const getAvailableNetworks = (currentLinkId: string) => {
    const selectedValues = links
      .filter((link) => link.id !== currentLinkId)
      .map((link) => link.network.value);
    return socialNetworks.filter(
      (network) => !selectedValues.includes(network.value),
    );
  };

  const handleAddLink = () => {
    if (links.length >= 3) return;

    const selectedValues = links.map((link) => link.network.value);
    const availableNetworks = socialNetworks.filter(
      (network) => !selectedValues.includes(network.value),
    );

    if (availableNetworks.length > 0) {
      setLinks([
        ...links,
        { id: Date.now().toString(), network: availableNetworks[0], url: "" },
      ]);
    }
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

    const hasEmptyLink = links.some((link) => !link.url.trim());
    if (hasEmptyLink) {
      toast.error(
        "Please enter a URL for all selected social networks, or remove the empty ones!",
      );
      return;
    }
    const cleanLinks = links.map((link) => ({
      id: link.id,
      networkValue: link.network.value,
      url: link.url,
    }));

    const currentData = {
      ...previousState,
      socialLinks: cleanLinks,
    };

    if (mode === "setup") {
      navigate("/employer/setup/contact", { state: currentData });
    } else {
      toast.success("Social links updated successfully!");
    }
  };

  const handlePrevious = () => {
    navigate("/employer/setup/founding", { state: previousState });
  };

  return (
    <div className="w-full bg-white animate-in fade-in duration-500">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          {links.map((link, index) => {
            const availableOptions = getAvailableNetworks(link.id);

            return (
              <div key={link.id} className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-900">
                  Social Link {index + 1}
                </label>

                <div className="flex items-center gap-3">
                  <div className="w-1/3 min-w-37.5">
                    <ComboBox
                      options={availableOptions}
                      value={link.network}
                      onChange={(option) =>
                        handleUpdateLink(link.id, "network", option)
                      }
                    />
                  </div>
                  <div className="flex-1">
                    <Input
                      type="text"
                      placeholder="Profile link (e.g., https://linkedin.com/...)"
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
                      ${
                        links.length === 1
                          ? "bg-gray-50 text-gray-300 cursor-not-allowed"
                          : "bg-gray-50 text-gray-900 hover:bg-red-50 hover:text-red-500 hover:border-red-200"
                      }`}
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {links.length < 3 && (
          <button
            type="button"
            onClick={handleAddLink}
            className="w-full py-3 mt-2 flex items-center justify-center gap-2 font-medium text-gray-700 bg-gray-50 border border-gray-200 rounded-md hover:bg-gray-100 transition-colors"
          >
            <Plus size={18} /> Add New Social Link
          </button>
        )}

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
