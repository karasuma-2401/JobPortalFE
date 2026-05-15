import { useState } from "react";
import ProfilePicture from "./components/ProfilePicture";
import BasicInfoForm from "./components/BasicInfoForm";
import ResumeManager from "./components/ResumeManager";
import ProfileTab from "./components/ProfileTab";
import SocialLinksTab from "./components/SocialLinksTab";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("Personal");

  const tabs = [
    { id: "Personal", label: "Personal" },
    { id: "Profile", label: "Profile" },
    { id: "Social Links", label: "Social Links" },
    { id: "Account Setting", label: "Account Setting" },
  ];

  return (
    <div className="max-w-6xl mx-auto p-8 bg-bg-white">
      <h1 className="text-xl font-bold mb-6 text-gray-900 text-left">Setting</h1>

      <div className="flex border-b border-gray-100 mb-10 overflow-x-auto gap-10">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`pb-4 text-sm font-medium transition-all whitespace-nowrap border-b-2 ${
              activeTab === tab.id
                ? "border-primary-500 text-primary-500"
                : "border-transparent text-gray-400 hover:text-gray-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="animate-fade-in">
        {activeTab === "Personal" && (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              <div className="lg:col-span-4">
                <ProfilePicture />
              </div>
              <div className="lg:col-span-8 pt-10">
                <BasicInfoForm />
              </div>
            </div>

            <ResumeManager />
          </>
        )}

        {activeTab === "Profile" && (
          <ProfileTab />
        )}

        {activeTab === "Social Links" && (
          <SocialLinksTab />
      )}
              {(activeTab === "Social Links") && (
          <div className="py-20 text-center text-gray-400 border border-dashed border-gray-100 rounded-xl">
            Content for {activeTab} is coming soon...
          </div>
        )}
      </div>
    </div>
  );
}