import React from "react";
import { NavLink, useNavigate } from "react-router";
import { styles } from "../../styles/common";
import { userAuth } from "../../store/AuthStore";
import { LayoutDashboard } from 'lucide-react'
import {
  FaChartPie,
  FaFolderOpen,
  FaDonate,
  FaPlus,
  FaUser,
  FaSignOutAlt
} from "react-icons/fa";
import toast from "react-hot-toast";

function Sidebar() {

  const navigate = useNavigate();
  const logout = userAuth((state) => state.logout);

  const handleLogout = async() => {
    await logout();
    toast.success("Logout SuccessFully")
    navigate("/login");
  };

  return (
    <aside className={styles.sidebar}>

      {/* Logo / Title */}

      <div className={styles.sidebarLogo}>
        <LayoutDashboard className={`${styles.navLogo} text-center mx-auto w-40`}/>
      </div>

      {/* Navigation */}

      <ul className={styles.sidebarMenu}>

        <li>
          <NavLink
            to="/dashboard/overview"
            className={({ isActive }) =>
              isActive ? styles.sidebarActive : styles.sidebarItem
            }
          >
            <FaChartPie />
            Overview
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/dashboard/my-campaigns"
            className={({ isActive }) =>
              isActive ? styles.sidebarActive : styles.sidebarItem
            }
          >
            <FaFolderOpen />
            My Campaigns
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/dashboard/donations"
            className={({ isActive }) =>
              isActive ? styles.sidebarActive : styles.sidebarItem
            }
          >
            <FaDonate />
            Donations
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/dashboard/create-campaign"
            className={({ isActive }) =>
              isActive ? styles.sidebarActive : styles.sidebarItem
            }
          >
            <FaPlus />
            Create Campaign
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/dashboard/user-profile"
            className={({ isActive }) =>
              isActive ? styles.sidebarActive : styles.sidebarItem
            }
          >
            <FaUser />
            Profile
          </NavLink>
        </li>

      </ul>

      {/* Logout */}

      <div className="p-4 mt-auto">

        <button
          onClick={handleLogout}
          className={styles.sidebarItem}
        >
          <FaSignOutAlt />
          Logout
        </button>

      </div>

    </aside>
  );
}

export default Sidebar;