import axios from 'axios';
import React,{useState,useEffect} from 'react'
import { styles } from '../../styles/common.js';
function AdminRecentCampaigns() {
    const [campaigns,setCampaigns] = useState([]);

    const BASE_URL = import.meta.env.VITE_API_URL;
    useEffect(() => {
        fetchCampaigns();
    },[])
    const fetchCampaigns = async() => {
        try{
            let response = await axios.get(`${BASE_URL}/admin-api/recent-campaigns`,{withCredentials : true});
            console.log("Campaigns : ",response.data.payload);
            setCampaigns(response.data?.payload);
        }catch(err){
            console.error('Fetching is Failed',err.message);
        }
    }
    
  return (
    <div>
        <div className={styles.tableContainer}>
        <h2 className="px-6 py-4 font-semibold">Recent Campaigns</h2>

  <table className={styles.table}>
    <thead className={styles.tableHead}>
      <tr>
        <th className={styles.tableHeaderCell}>Title</th>
        <th className={styles.tableHeaderCell}>Goal</th>
        <th className={styles.tableHeaderCell}>Status</th>
      </tr>
    </thead>

    <tbody>
      {campaigns.map((c) => (
        <tr key={c._id} className={styles.tableRow}>
          <td className={styles.tableCell}>{c.Title}</td>
          <td className={styles.tableCell}>₹{c.GoalAmount}</td>
          <td className={styles.tableCell}>{c.Status === "active" ? "✅ Active": (c.Status === "pending" ? "⏳ Pending":"❌ Rejected")}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
    </div>
  )
}

export default AdminRecentCampaigns