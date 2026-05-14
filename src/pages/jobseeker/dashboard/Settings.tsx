import ProfilePicture from "./components/ProfilePicture";
import BasicInfoForm from "./components/BasicInfoForm";
import ResumeManager from "./components/ResumeManager";

export default function Settings() {
  return (
    <div className="max-w-6xl mx-auto p-8 bg-bg-white">
      <h1 className="text-xl font-bold mb-6 text-gray-900 text-left">Setting</h1>

      {/* Sub-tabs Navigation */}
      <div className="flex border-b border-gray-100 mb-10 overflow-x-auto gap-10">
        {["Personal", "Profile", "Social Links", "Account Setting"].map((tab, idx) => (
          <button
            key={tab}
            type="button"
            className={`pb-4 text-sm font-medium transition-all whitespace-nowrap ${
              idx === 0
                ? "border-b-2 border-primary-500 text-primary-500"
                : "text-gray-400 hover:text-gray-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Khu vực thông tin cơ bản: Chia 2 cột */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-4">
          <ProfilePicture />
        </div>
        <div className="lg:col-span-8 pt-10">
          <BasicInfoForm />
        </div>
      </div>

      {/* Khu vực quản lý CV */}
      <ResumeManager />
    </div>
  );
}