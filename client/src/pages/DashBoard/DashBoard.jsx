import React from "react";
import { Outlet } from "react-router";
import Sidebar from "../../components/DashBoard/Sidebar";
import TopBar from "../../components/DashBoard/TopBar";
import { styles } from "../../styles/common.js";

function DashBoard() {
  return (
    <div className={styles.dashboardLayout}>

      <Sidebar />

      <div className={styles.dashboardContent}>

        <TopBar />

      <div className="flex-1 overflow-y-auto p-6">

        <div className="max-w-6xl mx-auto w-full">
          <Outlet />
        </div>
    </div>
      </div>

    </div>
  );
}

export default DashBoard;