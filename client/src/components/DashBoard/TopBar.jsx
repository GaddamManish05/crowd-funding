import React from "react";
import { styles } from "../../styles/common";
import { FaBell, FaUser, FaSearch } from "react-icons/fa";
import { userAuth } from "../../store/AuthStore";

function TopBar() {
    const currentUser = userAuth((state) => state.currentUser);

    return (
        <div className={styles.topbar}>

      {/* Search Section */}

        <div className="relative flex items-center">

            <FaSearch className="absolute left-3 text-gray-400 text-sm" />

            <input
            type="text"
            placeholder="Search campaigns..."
            className={`${styles.searchBar} pl-9`}
            />

        </div>

      {/* Right Side Controls */}

    <div className="flex items-center gap-6">

        {/* Notifications */}

        <FaBell className="text-gray-600 text-lg cursor-pointer hover:text-black transition" />

        {/* Profile */}

        <div className="flex items-center gap-3">

        <p className="text-sm font-medium text-gray-700">
            {currentUser?.firstName}
        </p>

        <div className={styles.profileAvatar}>
            <FaUser />
        </div>

        </div>

    </div>

    </div>
  );
}

export default TopBar;