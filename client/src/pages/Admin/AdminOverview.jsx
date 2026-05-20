import React, { useEffect, useState } from "react";
import axios from "axios";
import StatsCard from "../../components/DashBoard/StatsCard";
import { styles } from "../../styles/common";
import { FaUsers, FaFolderOpen, FaDonate, FaMoneyBill } from "react-icons/fa";
import AdminRecentCampaigns from "./AdminRecentCampaigns";
import AdminRecentDonations from "./AdminRecentDonations";

function AdminOverview() {

  const [stats, setStats] = useState({});
  const BASE_URL = import.meta.env.VITE_API_URL;
  console.log("Admin stats :",stats);
  const fetchStats = async () => {
    const res = await axios.get(`${BASE_URL}/admin-api/stats`,{withCredentials : true});
    setStats(res.data);
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="p-6">

      <h1 className={styles.sectionTitle}>Admin Overview</h1>

      <div className={styles.statsContainer}>

        <StatsCard
          title="Users"
          value={stats.users}
          icon={<FaUsers />}
        />

        <StatsCard
          title="Campaigns"
          value={stats.campaigns}
          icon={<FaFolderOpen />}
        />

        <StatsCard
          title="Donations"
          value={stats.donations}
          icon={<FaDonate />}
        />

        <StatsCard
          title="Funds Raised"
          value={`₹${stats.funds}`}
          icon={<FaMoneyBill />}
        />

      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">

        <AdminRecentCampaigns />
        <AdminRecentDonations />

      </div>
    </div>
  );
}

export default AdminOverview;