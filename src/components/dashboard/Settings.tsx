import React from 'react';
import { Upload, Plus, Globe } from 'lucide-react';
import { ResumeCard } from '../../components/dashboard/ResumeCard';

const SettingsPage = () => {
  return (
    <div className="max-w-6xl mx-auto p-8 bg-bg-white">
      <h1 className="text-xl font-bold mb-6 text-gray-900 text-left">Setting</h1>

      {/* Tabs Menu */}
      <div className="flex border-b border-gray-100 mb-10 overflow-x-auto gap-10">
        {['Personal', 'Profile', 'Social Links', 'Account Setting'].map((tab, idx) => (
          <button
            key={tab}
            className={`pb-4 text-sm font-medium transition-all whitespace-nowrap ${
              idx === 0 
                ? 'border-b-2 border-primary-500 text-primary-500' 
                : 'text-gray-400 hover:text-gray-700'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* CỘT TRÁI: Profile Picture */}
        <div className="lg:col-span-4">
          <h3 className="text-sm font-semibold mb-6 text-gray-900 text-left">Basic Information</h3>
          <div className="text-xs text-gray-500 mb-3 font-medium uppercase text-left">Profile Picture</div>
          <div className="border-2 border-dashed border-gray-100 rounded-xl p-10 flex flex-col items-center justify-center text-center bg-gray-50/20">
            <div className="w-16 h-16 bg-bg-white rounded-full flex items-center justify-center mb-4 shadow-sm border border-gray-50">
              <Upload className="w-6 h-6 text-gray-300" />
            </div>
            <p className="text-sm text-gray-900 font-medium">
              Browse photo <span className="text-gray-400 font-normal">or drop here</span>
            </p>
            <p className="text-[11px] text-gray-400 mt-2 leading-relaxed max-w-[200px]">
              A photo larger than 400 pixels work best. Max photo size 5 MB.
            </p>
          </div>
        </div>

        {/* CỘT PHẢI: Form chi tiết */}
        <div className="lg:col-span-8 space-y-6 pt-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2 text-left">
              <label className="text-sm font-medium text-gray-700">Full name</label>
              <input type="text" placeholder="Full name" className="w-full p-3 border border-gray-100 rounded-lg focus:border-primary-400 focus:ring-1 focus:ring-primary-400 outline-none transition-all placeholder:text-gray-300" />
            </div>
            <div className="space-y-2 text-left">
              <label className="text-sm font-medium text-gray-700">Title/headline</label>
              <input type="text" placeholder="Title/headline" className="w-full p-3 border border-gray-100 rounded-lg focus:border-primary-400 focus:ring-1 focus:ring-primary-400 outline-none transition-all placeholder:text-gray-300" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2 text-left">
              <label className="text-sm font-medium text-gray-700">Experience</label>
              <select className="w-full p-3 border border-gray-100 rounded-lg bg-bg-white outline-none focus:border-primary-400 text-gray-600 cursor-pointer">
                <option>Select...</option>
                <option>Internship</option>
                <option>Junior</option>
              </select>
            </div>
            <div className="space-y-2 text-left">
              <label className="text-sm font-medium text-gray-700">Educations</label>
              <select className="w-full p-3 border border-gray-100 rounded-lg bg-bg-white outline-none focus:border-primary-400 text-gray-600 cursor-pointer">
                <option>Select...</option>
                <option>Bachelor Degree</option>
              </select>
            </div>
          </div>

          <div className="space-y-2 text-left">
            <label className="text-sm font-medium text-gray-700">Personal Website</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-primary-500">
                <Globe className="h-5 w-5" />
              </div>
              <input type="text" placeholder="Website url..." className="w-full p-3 pl-10 border border-gray-100 rounded-lg focus:border-primary-400 outline-none" />
            </div>
          </div>

          <div className="text-left">
            <button className="bg-primary-500 text-bg-white px-8 py-3 rounded-lg font-bold hover:bg-primary-600 active:scale-95 transition-all shadow-md shadow-primary-100">
              Save Changes
            </button>
          </div>
        </div>
      </div>

      {/* PHẦN DƯỚI: CV Manager */}
      <div className="mt-16 pt-10 border-t border-gray-100 text-left">
        <h3 className="text-lg font-bold mb-8 text-gray-900">Your Cv/Resume</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          
          <ResumeCard resume={{ name: 'Professional Resume', size: '3.5 MB' }} />
          <ResumeCard resume={{ name: 'Product Designer', size: '4.7 MB' }} />
          <ResumeCard resume={{ name: 'Visual Designer', size: '1.3 MB' }} />
          
          {/* NÚT THÊM MỚI */}
          <button className="flex items-center justify-start p-5 border-2 border-dashed border-primary-100 rounded-lg bg-bg-white hover:bg-primary-50 transition-all h-full group outline-none">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary-100 rounded-full text-primary-500 group-hover:scale-110 transition-transform">
                <Plus className="w-6 h-6" />
              </div>
              
              <div className="flex flex-col text-left">
                <p className="text-sm font-bold text-primary-500">Add Cv/Resume</p>
                <p className="text-[11px] text-gray-400 mt-1">Browse file or drop here. only pdf</p>
              </div>
            </div>
          </button>

        </div>
      </div>
    </div>
  );
};

export default SettingsPage;