import React, { useState } from "react";
import { EyeOff, Eye, XCircle } from "lucide-react";
import { toast } from "sonner";

import Contact from "../../account-setup/Contact";
import Input from "../../../../components/ui/Input";
import Button from "../../../../components/ui/Button";

export default function AccountSettingTab() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    toast.success("Password changed successfully!");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleDeleteAccount = () => {
    const confirm = window.confirm(
      "Are you sure you want to permanently delete your account? This action cannot be undone.",
    );
    if (confirm) {
      toast.success("Account deletion requested.");
    }
  };

  return (
    <div className="flex flex-col gap-10 animate-in fade-in duration-500">
      <section>
        <h3 className="text-lg font-bold text-gray-900 mb-6">
          Contact Information
        </h3>
        <Contact mode="settings" />
      </section>

      <div className="h-px w-full bg-gray-200"></div>

      <section>
        <h3 className="text-lg font-bold text-gray-900 mb-6">
          Change Password
        </h3>
        <form onSubmit={handleChangePassword} className="flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col gap-2 relative">
              <label className="font-medium text-sm text-gray-900">
                Current Password
              </label>
              <div className="relative">
                <Input
                  type={showCurrent ? "text" : "password"}
                  placeholder="Password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowCurrent(!showCurrent)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showCurrent ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            <div className="flex flex-col gap-2 relative">
              <label className="font-medium text-sm text-gray-900">
                New Password
              </label>
              <div className="relative">
                <Input
                  type={showNew ? "text" : "password"}
                  placeholder="Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowNew(!showNew)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            <div className="flex flex-col gap-2 relative">
              <label className="font-medium text-sm text-gray-900">
                Confirm Password
              </label>
              <div className="relative">
                <Input
                  type={showConfirm ? "text" : "password"}
                  placeholder="Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
          </div>
          <div>
            <Button variant="primary" type="submit">
              Change Password
            </Button>
          </div>
        </form>
      </section>

      <div className="h-px w-full bg-gray-200"></div>

      <section className="pb-4">
        <h3 className="text-lg font-bold text-gray-900 mb-4">
          Delete Your Company
        </h3>
        <p className="text-sm text-gray-500 mb-6 max-w-3xl leading-relaxed">
          If you delete your Job pilot account, you will no longer be able to get
          information about the matched jobs, following employers, and job
          alert, shortlisted jobs and more. You will be abandoned from all the
          services of Jobpilot.com.
        </p>
        <button
          onClick={handleDeleteAccount}
          className="flex items-center gap-2 text-sm font-bold text-red-500 hover:text-red-600 transition-colors"
        >
          <XCircle size={18} /> Close Account
        </button>
      </section>
    </div>
  );
}
