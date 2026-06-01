import React, { useState } from "react";
import { Plus, X, Loader2 } from "lucide-react";
import { Facebook, Twitter, Instagram, Youtube, Linkedin } from "lucide-react";
import { toast } from "sonner";

import ComboBox, {
  type OptionType,
} from "../../../../../components/ui/ComboBox";
import Input from "../../../../../components/ui/Input";
import Button from "../../../../../components/ui/Button";

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

export default function SocialLinksTab() {
  const [isLoading, setIsLoading] = useState(false);

  // Khởi tạo danh sách link dựa trên ảnh thiết kế (4 link mặc định)
  const [links, setLinks] = useState<SocialLinkItem[]>([
    { id: "1", network: socialNetworks[0], url: "" },
    { id: "2", network: socialNetworks[1], url: "" },
    { id: "3", network: socialNetworks[2], url: "" },
    { id: "4", network: socialNetworks[3], url: "" },
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

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1200));
      toast.success("Social links updated successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update social links");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full bg-white animate-in fade-in duration-500 text-left">
      <form onSubmit={handleSave} className="flex flex-col gap-6">
        <div className="flex flex-col gap-5">
          {links.map((link, index) => (
            <div key={link.id} className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">
                Social Link {index + 1}
              </label>

              <div className="flex items-center gap-3">
                <div className="w-1/3 min-w-[150px]">
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
                    className="h-[46px]"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleUpdateLink(link.id, "url", e.target.value)
                    }
                  />
                </div>

                <button
                  type="button"
                  onClick={() => handleRemoveLink(link.id)}
                  disabled={links.length === 1}
                  className={`w-[46px] h-[46px] rounded-lg border border-gray-100 transition-all flex items-center justify-center shrink-0
                    ${
                      links.length === 1
                        ? "bg-gray-50 text-gray-200 cursor-not-allowed"
                        : "bg-white text-gray-400 hover:bg-danger-50 hover:text-danger-500 hover:border-danger-100"
                    }`}
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
          className="w-full py-3 flex items-center justify-center gap-2 font-semibold text-gray-700 bg-gray-50 border border-gray-100 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <Plus size={18} className="text-primary-500" />
          Add New Social Link
        </button>

        <div className="pt-4">
          <Button
            variant="primary"
            type="submit"
            className="px-10 h-[50px]"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              "Save Changes"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
