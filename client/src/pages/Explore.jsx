// ==========================================
// 1. IMPORTS & DEPENDENCIES
// ==========================================
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Compass,
  ArrowLeft,
  Search,
  Users,
  HeartHandshake,
  Rocket
} from 'lucide-react';

// ==========================================
// 2. MAIN COMPONENT DECLARATION
// ==========================================
function Explore() {
  // A. React & Third-Party Hooks
  const navigate = useNavigate();

  // B. Local Constants / Static Configurations
  const exploreCards = [
    {
      id: 1,
      title: "Discover Campaigns",
      description: "Explore active fundraising campaigns from creators around the world.",
      icon: <Search size={32} />
    },
    {
      id: 2,
      title: "Support Communities",
      description: "Help people raise funds for education, health, environment and more.",
      icon: <HeartHandshake size={32} />
    },
    {
      id: 3,
      title: "Connect With Creators",
      description: "Engage with campaign owners and follow their fundraising journey.",
      icon: <Users size={32} />
    },
    {
      id: 4,
      title: "Launch Ideas",
      description: "Turn innovative ideas into reality through crowdfunding support.",
      icon: <Rocket size={32} />
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
        <div className="bg-white rounded-2xl shadow-sm p-10 flex flex-col items-center text-center mb-10">
          <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mb-5">
            <Compass size={40} className="text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold mb-4 text-gray-800">
            Explore CrowdFunding
          </h1>
          <p className="text-gray-500 max-w-2xl leading-relaxed">
            Discover inspiring campaigns, support meaningful causes, and connect with innovators building impactful projects through crowdfunding.
          </p>
        </div>

        {/* EXPLORE CARDS LISTING GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {exploreCards.map((card) => (
            <div
              key={card.id}
              className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 p-6 flex flex-col gap-4"
            >
              <div className="w-14 h-14 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                {card.icon}
              </div>
              <h2 className="text-lg font-semibold text-gray-800">
                {card.title}
              </h2>
              <p className="text-sm text-gray-500 leading-relaxed">
                {card.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default Explore;