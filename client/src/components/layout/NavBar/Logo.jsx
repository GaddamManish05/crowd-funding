import React from "react";
import { Link } from "react-router"; // Note: standard is react-router-dom
import { Award } from 'lucide-react';

function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2 group transition-all">
      {/* Icon Container */}
      <div className="bg-blue-600 p-1.5 rounded-lg group-hover:bg-blue-700 transition-colors">
        <Award className="w-6 h-6 text-white" />
      </div>

      {/* Text Branding */}
      <span className="font-bold text-xl tracking-tight text-slate-800">
        Crowd<span className="text-blue-600">Fund</span>
      </span>
    </Link>
  );
}

export default Logo;