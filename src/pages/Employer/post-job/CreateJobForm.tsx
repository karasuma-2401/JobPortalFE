import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { toast } from "sonner";
import ApplyJobType from "./components/ApplyJobType";
import RichTextEditor from "../../../components/ui/RichTextEditor";

export default function CreateJobForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    tags: "",
    role: "",
    minSalary: "",
    maxSalary: "",
    salaryType: "",
    education: "",
    experience: "",
    jobType: "",
    vacancies: "",
    expirationDate: "",
    jobLevel: "",
    applyType: "myjob",
    description: "",
    responsibilities: "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title) {
      toast.error("Job Title is required!");
      return;
    }
    toast.success("Job posted successfully!");
    navigate("/employer/dashboard");
  };

  return (
    <div className="w-full max-w-5xl mx-auto animate-in fade-in duration-500 pb-16">
      <div className="mb-8 border-b border-gray-100 pb-4">
        <h1 className="text-2xl font-bold text-gray-900">Post a job</h1>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Job Title
          </label>
          <input
            type="text"
            placeholder="Add job title, role, vacancies etc"
            value={formData.title}
            onChange={(e) => handleChange("title", e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Tags
            </label>
            <input
              type="text"
              placeholder="Job keyword, tags etc..."
              value={formData.tags}
              onChange={(e) => handleChange("tags", e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Job Role
            </label>
            <select
              value={formData.role}
              onChange={(e) => handleChange("role", e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-blue-500 bg-white"
            >
              <option value="">Select...</option>
              <option value="designer">Designer</option>
              <option value="developer">Developer</option>
              <option value="manager">Manager</option>
            </select>
          </div>
        </div>

        <div className="mt-4">
          <h3 className="text-sm font-bold text-gray-900 mb-4">Salary</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Min Salary
              </label>
              <div className="relative">
                <input
                  type="number"
                  placeholder="Minimum salary..."
                  value={formData.minSalary}
                  onChange={(e) => handleChange("minSalary", e.target.value)}
                  className="w-full pl-4 pr-12 py-3 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-blue-500"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-500 font-medium">
                  USD
                </span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Max Salary
              </label>
              <div className="relative">
                <input
                  type="number"
                  placeholder="Maximum salary..."
                  value={formData.maxSalary}
                  onChange={(e) => handleChange("maxSalary", e.target.value)}
                  className="w-full pl-4 pr-12 py-3 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-blue-500"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-500 font-medium">
                  USD
                </span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Salary Type
              </label>
              <select
                value={formData.salaryType}
                onChange={(e) => handleChange("salaryType", e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-blue-500 bg-white"
              >
                <option value="">Select...</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
                <option value="hourly">Hourly</option>
              </select>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <h3 className="text-sm font-bold text-gray-900 mb-4">
            Advance Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 gap-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Education
              </label>
              <select
                value={formData.education}
                onChange={(e) => handleChange("education", e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-blue-500 bg-white"
              >
                <option value="">Select...</option>
                <option value="bachelor">Bachelor Degree</option>
                <option value="master">Master Degree</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Experience
              </label>
              <select
                value={formData.experience}
                onChange={(e) => handleChange("experience", e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-blue-500 bg-white"
              >
                <option value="">Select...</option>
                <option value="1">1 Year</option>
                <option value="2">2 Years</option>
                <option value="5">5+ Years</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Job Type
              </label>
              <select
                value={formData.jobType}
                onChange={(e) => handleChange("jobType", e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-blue-500 bg-white"
              >
                <option value="">Select...</option>
                <option value="fulltime">Full Time</option>
                <option value="parttime">Part Time</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Vacancies
              </label>
              <select
                value={formData.vacancies}
                onChange={(e) => handleChange("vacancies", e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-blue-500 bg-white"
              >
                <option value="">Select...</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="5">5+</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Expiration Date
              </label>
              <input
                type="date"
                value={formData.expirationDate}
                onChange={(e) => handleChange("expirationDate", e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-blue-500 text-gray-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Job Level
              </label>
              <select
                value={formData.jobLevel}
                onChange={(e) => handleChange("jobLevel", e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-blue-500 bg-white"
              >
                <option value="">Select...</option>
                <option value="junior">Junior</option>
                <option value="senior">Senior</option>
              </select>
            </div>
          </div>
        </div>

        <ApplyJobType
          value={formData.applyType}
          onChange={(val) => handleChange("applyType", val)}
        />

        <div className="mt-4 pt-6 border-t border-gray-100">
          <h3 className="text-sm font-bold text-gray-900 mb-4">
            Description & Responsibility
          </h3>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Description
            </label>
            <RichTextEditor
              placeholder="Add your job description..."
              value={formData.description}
              onChange={(val) => handleChange("description", val)}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Responsibilities
            </label>
            <RichTextEditor
              placeholder="Add your job responsibilities..."
              value={formData.responsibilities}
              onChange={(val) => handleChange("responsibilities", val)}
            />
          </div>
        </div>

        <div className="mt-2">
          <button
            type="submit"
            className="flex items-center justify-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 transition-colors"
          >
            Post Job <ArrowRight size={18} />
          </button>
        </div>
      </form>
    </div>
  );
}
