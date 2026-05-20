// ==========================================
// 1. IMPORTS & DEPENDENCIES
// ==========================================
import React from "react";
import {
  ArrowLeft,
  ShieldCheck,
  Mail,
  User,
  CalendarDays,
  BadgeCheck
} from "lucide-react";
import { userAuth } from "../../store/AuthStore";

// ==========================================
// 2. MAIN COMPONENT DECLARATION
// ==========================================
function AdminProfile() {
  // A. React & Third-Party Hooks
  // B. Global State / Context Hooks (Zustand)
  const currentUser = userAuth((state) => state.currentUser);
  // ==========================================
  // 3. JSX LAYOUT RETURN
  // ==========================================
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        
        {/* BACK BUTTON */}
        <button className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors mb-6"></button>
        {/* PROFILE CARD */}
        <div className="bg-white rounded-3xl shadow-sm overflow-hidden border border-gray-100">
          
          {/* HEADER HERO AREA */}
          <div className="bg-gradient-to-r from-[#0071e3] to-[#2563eb] px-10 py-14 text-white relative">
            
            {/* PROFILE IMAGE AVATAR */}
            <div className="w-28 h-28 rounded-full bg-white/20 border-4 border-white/30 flex items-center justify-center text-4xl font-bold shadow-lg">
              {currentUser?.FirstName?.charAt(0).toUpperCase()}
            </div>

            {/* USER INFO NAMES */}
            <div className="mt-6">
              <h1 className="text-4xl font-bold">
                {currentUser?.FirstName} {currentUser?.LastName}
              </h1>
              <div className="flex items-center gap-2 mt-3 text-blue-100">
                <ShieldCheck size={18} />
                Administrator Account
              </div>
            </div>

          </div>

          {/* BODY CONTENT AREA */}
          <div className="p-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-8">
              Profile Information
            </h2>

            {/* DATA INFO GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* FIRST NAME */}
              <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                <div className="flex items-center gap-3 mb-3">
                  <User size={20} className="text-blue-600" />
                  <h3 className="font-semibold text-gray-700">
                    First Name
                  </h3>
                </div>
                <p className="text-gray-500">
                  {currentUser?.FirstName}
                </p>
              </div>

              {/* LAST NAME */}
              <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                <div className="flex items-center gap-3 mb-3">
                  <User size={20} className="text-blue-600" />
                  <h3 className="font-semibold text-gray-700">
                    Last Name
                  </h3>
                </div>
                <p className="text-gray-500">
                  {currentUser?.LastName}
                </p>
              </div>

              {/* EMAIL ADDRESS */}
              <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                <div className="flex items-center gap-3 mb-3">
                  <Mail size={20} className="text-blue-600" />
                  <h3 className="font-semibold text-gray-700">
                    Email Address
                  </h3>
                </div>
                <p className="text-gray-500 break-all">
                  {currentUser?.Email}
                </p>
              </div>

              {/* ROLE */}
              <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                <div className="flex items-center gap-3 mb-3">
                  <BadgeCheck size={20} className="text-blue-600" />
                  <h3 className="font-semibold text-gray-700">
                    Role
                  </h3>
                </div>
                <p className="text-gray-500 capitalize">
                  {currentUser?.Role}
                </p>
              </div>

              {/* ACCOUNT STATUS */}
              <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100 md:col-span-2">
                <div className="flex items-center gap-3 mb-3">
                  <CalendarDays size={20} className="text-blue-600" />
                  <h3 className="font-semibold text-gray-700">
                    Account Status
                  </h3>
                </div>
                <p className="text-green-600 font-medium">
                  Active Administrator Account ✅
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default AdminProfile;