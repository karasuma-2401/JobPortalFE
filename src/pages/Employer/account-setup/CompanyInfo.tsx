import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { toast } from "sonner";

import ImageUpload from "../../../components/ui/ImageUpload";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";
import RichTextEditor from "../../../components/ui/RichTextEditor";

interface CompanyInfoProps {
  mode?: "setup" | "settings";
}

export default function CompanyInfo({ mode = "setup" }: CompanyInfoProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const previousState = location.state || {};

  const [companyName, setCompanyName] = useState(
    previousState.companyName || "",
  );
  const [aboutUs, setAboutUs] = useState(previousState.description || "");
  const [logoFile, setLogoFile] = useState<File | null>(
    previousState.logo || null,
  );
  const [bannerFile, setBannerfile] = useState<File | null>(
    previousState.banner || null,
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!companyName) {
      toast.error("Company name is required!");
      return;
    }

    const currentData = {
      ...previousState,
      companyName,
      description: aboutUs,
      logo: logoFile,
      banner: bannerFile,
    };

    if (mode === "setup") {
      // Pass data to the next step via state
      navigate("/employer/setup/founding", { state: currentData });
    } else {
      toast.success("Company information updated successfully!");
    }
  };

  return (
    <div className="w-full bg-white animate-in fade-in duration-500">
      {mode === "setup" && (
        <h2 className="text-lg font-bold text-gray-900 mb-6">
          Logo & Banner Image
        </h2>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-8">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <span className="block text-sm font-medium text-gray-900 mb-2">
              Upload document
            </span>
            <ImageUpload
              label="Browse photo"
              subLabel="A photo larger than 400 pixels work best. Max photo size 5 MB."
              className="aspect-square max-w-70"
              onChange={(file) => setLogoFile(file)}
            />
          </div>

          <div className="flex-2">
            <span className="block text-sm font-medium text-gray-900 mb-2">
              Banner Image
            </span>
            <ImageUpload
              label="Browse photo"
              subLabel="Banner images optimal dimension 1520x400. Supported format JPEG, PNG. Max photo size 5 MB."
              className="h-70"
              onChange={(file) => setBannerfile(file)}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-900">
            Company name
          </label>
          <Input
            type="text"
            placeholder="Enter company name"
            value={companyName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setCompanyName(e.target.value)
            }
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-900">About Us</label>
          <RichTextEditor
            value={aboutUs}
            onChange={setAboutUs}
            placeholder="Write down about your company here. Let the candidate know who we are..."
          />
        </div>
        <div>
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
