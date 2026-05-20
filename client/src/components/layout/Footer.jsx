// ==========================================
// 1. IMPORTS & DEPENDENCIES
// ==========================================
import React from "react";
import { Link } from "react-router-dom";
import {
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Mail,
  Phone,
  MapPin,
  HeartHandshake
} from "lucide-react";

// ==========================================
// 2. MAIN COMPONENT DECLARATION
// ==========================================
function Footer() {
  return (
    <footer className="bg-[#0f172a] text-white mt-20">
      
      {/* TOP SECTION */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        
        {/* BRAND SECTION */}
        <div className="space-y-5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center">
              <HeartHandshake size={26} />
            </div>
            <h1 className="text-2xl font-bold tracking-wide">
              CrowdFund
            </h1>
          </div>
          <p className="text-gray-400 leading-relaxed text-sm">
            CrowdFund empowers creators, startups, communities, and innovators to raise funds securely and bring impactful ideas to life.
          </p>
          
          {/* SOCIAL ICONS */}
          <div className="flex items-center gap-4 pt-2">
            <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-blue-600 transition-all duration-200 flex items-center justify-center">
              <Facebook size={18} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-pink-500 transition-all duration-200 flex items-center justify-center">
              <Instagram size={18} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-sky-500 transition-all duration-200 flex items-center justify-center">
              <Twitter size={18} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-blue-700 transition-all duration-200 flex items-center justify-center">
              <Linkedin size={18} />
            </a>
          </div>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h2 className="text-lg font-semibold mb-5">
            Quick Links
          </h2>
          <div className="flex flex-col gap-3 text-gray-400 text-sm">
            <Link to="/" className="hover:text-white transition">Home</Link>
            <Link to="/explore" className="hover:text-white transition">Explore Campaigns</Link>
            <Link to="/how-it-works" className="hover:text-white transition">How It Works</Link>
            <Link to="/login" className="hover:text-white transition">Login</Link>
            <Link to="/sign-up" className="hover:text-white transition">Sign Up</Link>
          </div>
        </div>

        {/* PLATFORM */}
        <div>
          <h2 className="text-lg font-semibold mb-5">
            Platform
          </h2>
          <div className="flex flex-col gap-3 text-gray-400 text-sm">
            <Link to="/dashboard/overview" className="hover:text-white transition">Dashboard</Link>
            <Link to="/dashboard/create-campaign" className="hover:text-white transition">Start Campaign</Link>
            <Link to="/dashboard/donations" className="hover:text-white transition">Donations</Link>
            <a href="#" className="hover:text-white transition">Privacy Policy</a>
            <a href="#" className="hover:text-white transition">Terms & Conditions</a>
          </div>
        </div>

        {/* CONTACT */}
        <div>
          <h2 className="text-lg font-semibold mb-5">
            Contact
          </h2>
          <div className="flex flex-col gap-4 text-gray-400 text-sm">
            <div className="flex items-center gap-3">
              <Mail size={18} />
              <span>support@crowdfund.com</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone size={18} />
              <span>+91 9876543210</span>
            </div>
            <div className="flex items-start gap-3">
              <MapPin size={18} />
              <span>Hyderabad, Telangana, India</span>
            </div>
          </div>
        </div>

      </div>

      {/* BOTTOM SECTION */}
      <div className="border-t border-white/10 py-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} CrowdFund Platform. All rights reserved.
      </div>

    </footer>
  );
}

export default Footer;