// ==========================================
// 1. IMPORTS & DEPENDENCIES
// ==========================================
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  UserPlus,
  FolderPlus,
  BadgeIndianRupee,
  CheckCircle2
} from 'lucide-react';

// ==========================================
// 2. MAIN COMPONENT DECLARATION
// ==========================================
function HowItWorks() {
  // A. React & Third-Party Hooks
  const navigate = useNavigate();

  // B. Local Constants / Static Configurations
  const steps = [
    {
      id: 1,
      title: "Create An Account",
      description: "Sign up and securely login to access the crowdfunding platform features.",
      icon: <UserPlus size={34} />
    },
    {
      id: 2,
      title: "Launch A Campaign",
      description: "Create campaigns with goals, descriptions, deadlines and images.",
      icon: <FolderPlus size={34} />
    },
    {
      id: 3,
      title: "Receive Donations",
      description: "Users can securely donate through Razorpay payment gateway integration.",
      icon: <BadgeIndianRupee size={34} />
    },
    {
      id: 4,
      title: "Achieve Your Goal",
      description: "Track campaign progress and successfully complete fundraising goals.",
      icon: <CheckCircle2 size={34} />
    }
  ];

  // ==========================================
  // 3. JSX LAYOUT RETURN
  // ==========================================
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* BACK BUTTON */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 mb-6 px-4 py-2 rounded-lg bg-white shadow-sm hover:shadow-md transition-all duration-200"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        {/* HERO SECTION */}
        <div className="bg-white rounded-2xl shadow-sm p-10 text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            How CrowdFunding Works
          </h1>
          <p className="text-gray-500 max-w-3xl mx-auto leading-relaxed">
            Learn how users can create campaigns, raise funds, receive donations securely, and achieve fundraising goals through our crowdfunding platform.
          </p>
        </div>

        {/* STEPS TIMELINE GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => (
            <div
              key={step.id}
              className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 p-6 relative flex flex-col"
            >
              {/* STEP NUMBER */}
              <div className="absolute top-4 right-4 text-sm font-semibold text-gray-300">
                0{step.id}
              </div>

              {/* ICON CONTAINER */}
              <div className="w-16 h-16 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-5">
                {step.icon}
              </div>

              {/* TITLE */}
              <h2 className="text-lg font-semibold text-gray-800 mb-3">
                {step.title}
              </h2>

              {/* DESCRIPTION */}
              <p className="text-sm text-gray-500 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default HowItWorks;