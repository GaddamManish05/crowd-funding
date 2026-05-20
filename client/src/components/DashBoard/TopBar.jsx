// ==========================================
// 1. IMPORTS & DEPENDENCIES
// ==========================================
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { FaBell, FaUser, FaSearch } from "react-icons/fa";
import { userAuth } from "../../store/AuthStore";
import { styles } from "../../styles/common";

// ==========================================
// 2. MAIN COMPONENT DECLARATION
// ==========================================
function TopBar() {
  // A. React & Third-Party Hooks
  const navigate = useNavigate();

  // B. Global State / Context Hooks (Zustand)
  const currentUser = userAuth((state) => state.currentUser);
  const setSearch = userAuth((state) => state.setSearch);
  const fetchNotifications = userAuth((state) => state.fetchNotifications);
  const markNotificationAsRead = userAuth((state) => state.markNotificationAsRead);
  const notifications = userAuth((state) => state.notifications || []);

  // C. Local Component State
  const [inputValue, setInputValue] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);

  // D. Derived State / Memoized Values
  const unreadCount = notifications.filter((notification) => !notification.isRead).length;

  // E. Lifecycle & Side Effects
  useEffect(() => {
    fetchNotifications();
  }, []);

  // Search Debounce Logic
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(inputValue);
    }, 500);

    return () => clearTimeout(timer);
  }, [inputValue, setSearch]);

  // ==========================================
  // 3. JSX LAYOUT RETURN
  // ==========================================
  return (
    <div className={styles.topbar}>
      {/* SEARCH */}
      <div className="relative flex items-center">
        <FaSearch className="absolute left-3 text-gray-400 text-sm" />
        <input
          type="text"
          placeholder="Search campaigns..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className={`${styles.searchBar} pl-9`}
        />
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-6">
        
        {/* NOTIFICATIONS */}
        <div className="relative">
          {/* BELL */}
          <div
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative cursor-pointer"
          >
            <FaBell className="text-gray-600 text-lg hover:text-black transition" />
            
            {/* BADGE */}
            {unreadCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </div>

          {/* DROPDOWN */}
          {showNotifications && (
            <div className="absolute right-0 mt-3 w-80 bg-white shadow-xl rounded-xl border z-50 overflow-hidden">
              {/* HEADER */}
              <div className="px-4 py-3 border-b font-semibold text-gray-700">
                Notifications
              </div>

              {/* EMPTY STATE OR LIST */}
              {notifications.length === 0 ? (
                <p className="p-4 text-sm text-gray-500">
                  No notifications
                </p>
              ) : (
                <div className="max-h-96 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div
                      key={notification._id}
                      onClick={() => {
                        if (!notification.isRead) {
                          markNotificationAsRead(notification._id);
                        }
                      }}
                      className={`p-4 border-b hover:bg-gray-50 transition cursor-pointer ${
                        !notification.isRead ? "bg-blue-50" : "bg-white"
                      }`}
                    >
                      {/* TITLE */}
                      <h3 className="text-sm font-semibold text-gray-800">
                        {notification.title}
                      </h3>
                      
                      {/* MESSAGE */}
                      <p className="text-xs text-gray-600 mt-1">
                        {notification.message}
                      </p>
                      
                      {/* TIME */}
                      <p className="text-[10px] text-gray-400 mt-2">
                        {new Date(notification.createdAt).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* PROFILE */}
        <div
          onClick={() => {
            if(currentUser.Role === "admin"){
              navigate("/admin/admin-profile");
            }else if(currentUser.Role === "user"){
              navigate("/dashboard/user-profile");
            }
            }
          }
          className="flex items-center gap-3 cursor-pointer hover:bg-gray-100 px-3 py-2 rounded-lg transition"
        >
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