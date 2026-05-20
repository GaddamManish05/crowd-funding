import React from 'react'
import { NavLink, useNavigate } from "react-router-dom";
import { userAuth } from "../../store/AuthStore";

import {
  LayoutDashboard,
  PieChart,
  Folder,
  Users
} from "lucide-react";

import { FaDonate, FaSignOutAlt,FaUser } from "react-icons/fa";

function AdminSideBar() {

  const logout = userAuth(state => state.logout);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <aside
    className="
        w-64
        min-h-screen
        sticky
        top-0
        bg-white
        flex
        flex-col
        justify-between
        shadow-xl
        overflow-y-auto
    "
>

      {/* 🔷 TOP */}
      <div>

        {/* Logo */}
        <div className="flex items-center gap-3 px-6 py-6 shadow-sm">
          <LayoutDashboard className="text-black text-xl" />
          <h1 className="text-lg font-semibold tracking-tight">
            Admin Panel
          </h1>
        </div>

        {/* Navigation */}
        <ul className="flex flex-col gap-2 px-4 py-6">

          <li>
            <NavLink
              to="/admin/overview"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-all duration-200 ${
                  isActive
                    ? "bg-black text-white shadow-md"
                    : "text-gray-600 hover:bg-gray-50 hover:shadow-sm"
                }`
              }
            >
              <PieChart size={18} />
              Overview
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/admin/campaigns"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-all duration-200 ${
                  isActive
                    ? "bg-black text-white shadow-md"
                    : "text-gray-600 hover:bg-gray-50 hover:shadow-sm"
                }`
              }
            >
              <Folder size={18} />
              Campaigns
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/admin/donations"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-all duration-200 ${
                  isActive
                    ? "bg-black text-white shadow-md"
                    : "text-gray-600 hover:bg-gray-50 hover:shadow-sm"
                }`
              }
            >
              <FaDonate size={16} />
              Donations
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/admin/users"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-all duration-200 ${
                  isActive
                    ? "bg-black text-white shadow-md"
                    : "text-gray-600 hover:bg-gray-50 hover:shadow-sm"
                }`
              }
            >
              <Users size={18} />
              Users
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/admin-profile"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-all duration-200 ${
                  isActive
                    ? "bg-black text-white shadow-md"
                    : "text-gray-600 hover:bg-gray-50 hover:shadow-sm"
                }`
              }
            >
              <FaUser size={18} />
              Profile
            </NavLink>
          </li>

        </ul>
      </div>

      {/* 🔻 BOTTOM */}
      <div className="px-4 py-6">

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-2.5 w-full rounded-lg text-sm text-gray-600 hover:bg-gray-50 hover:shadow-sm transition-all duration-200"
        >
          <FaSignOutAlt />
          Logout
        </button>

      </div>

    </aside>
  );
}

export default AdminSideBar;