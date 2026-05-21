import { useState } from "react";
import { User, Building, Globe, Settings as SettingsIcon } from "lucide-react";

import CompanyInfo from "../account-setup/CompanyInfo";
import FoundingInfo from "../account-setup/FoundingInfo";
import SocialLinks from "../account-setup/SocialLinks";
import AccountSettingTab from "./components/AccountSettingTab";

type TabType = "company" | "founding" | "social" | "account";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<TabType>("company");

  const renderTabContent = () => {
    switch (activeTab) {
      case "company":
        return <CompanyInfo mode="settings" />;
      case "founding":
        return <FoundingInfo mode="settings" />;
      case "social":
        return <SocialLinks mode="settings" />;
      case "account":
        return <AccountSettingTab />;
      default:
        return <CompanyInfo mode="settings" />;
    }
  };

  return (
    <div className="w-full mx-auto animate-in fade-in duration-500 pb-16">
      <h1 className="text-xl font-bold text-gray-900 mb-6">Settings</h1>

      <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
        <div className="border-b border-gray-200 px-6">
          <div className="flex overflow-x-auto scrollbar-hide">
            <button
              onClick={() => setActiveTab("company")}
              className={`flex items-center gap-2 px-4 py-4 text-sm font-semibold whitespace-nowrap border-b-2 transition-colors ${
                activeTab === "company"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-300"
              }`}
            >
              <User size={18} /> Company Info
            </button>
            <button
              onClick={() => setActiveTab("founding")}
              className={`flex items-center gap-2 px-4 py-4 text-sm font-semibold whitespace-nowrap border-b-2 transition-colors ${
                activeTab === "founding"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-300"
              }`}
            >
              <Building size={18} /> Founding Info
            </button>
            <button
              onClick={() => setActiveTab("social")}
              className={`flex items-center gap-2 px-4 py-4 text-sm font-semibold whitespace-nowrap border-b-2 transition-colors ${
                activeTab === "social"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-300"
              }`}
            >
              <Globe size={18} /> Social Media Profile
            </button>
            <button
              onClick={() => setActiveTab("account")}
              className={`flex items-center gap-2 px-4 py-4 text-sm font-semibold whitespace-nowrap border-b-2 transition-colors ${
                activeTab === "account"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-300"
              }`}
            >
              <SettingsIcon size={18} /> Account Setting
            </button>
          </div>
        </div>

        <div className="p-8">{renderTabContent()}</div>
      </div>
    </div>
  );
}
