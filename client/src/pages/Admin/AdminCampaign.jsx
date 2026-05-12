import React, { useEffect, useState } from "react";
import axios from "axios";
import { styles } from "../../styles/common";
import { toast } from "react-hot-toast";

function AdminCampaigns() {

  const [campaigns, setCampaigns] = useState([]);

  const fetchCampaigns = async () => {
    const res = await axios.get("http://localhost:3000/admin-api/campaigns", {
        withCredentials: true
    });
    setCampaigns(res.data.payload);
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  // Approve
  const handleApprove = async (id) => {
    let res = await axios.put(`http://localhost:3000/admin-api/approve-campaign/${id}`,{},{withCredentials : true});
    console.log(res.data?.payload)
    toast.success("Approved ✅");
    fetchCampaigns();
  };

  //  Reject
  const handleReject = async (id) => {
    await axios.put(`http://localhost:3000/admin-api/reject-campaign/${id}`,{},{withCredentials:true});
    toast.error("Rejected ❌");
    fetchCampaigns();
  };

  return (
    <div className="p-6">

      <h1 className={styles.sectionTitle}>Manage Campaigns</h1>

      <div className={styles.tableContainer}>

        <table className={styles.table}>

          <thead className={styles.tableHead}>
            <tr>
              <th className={styles.tableHeaderCell}>Title</th>
              <th className={styles.tableHeaderCell}>Goal</th>
              <th className={styles.tableHeaderCell}>Status</th>
              <th className={styles.tableHeaderCell}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {campaigns.map((c) => (
              <tr key={c._id} className={styles.tableRow}>

                <td className={styles.tableCell}>{c.Title}</td>

                <td className={styles.tableCell}>
                  ₹{c.GoalAmount}
                </td>

                <td className={styles.tableCell}>
                  <span className={`px-2 py-1 text-xs rounded 
                    ${c.Status === "active" ? "bg-green-100 text-green-600" :
                      c.Status === "pending" ? "bg-yellow-100 text-yellow-600" :
                      "bg-red-100 text-red-600"}`}>
                    {c.Status}
                  </span>
                </td>

                <td className={styles.tableCell}>

                  {c.Status === "pending" && (
                    <div className="flex gap-2">

                      <button
                        onClick={() => handleApprove(c._id)}
                        className="px-3 py-1 text-xs rounded bg-green-500 text-white hover:bg-green-600"
                      >
                        Approve
                      </button>

                      <button
                        onClick={() => handleReject(c._id)}
                        className="px-3 py-1 text-xs rounded bg-red-500 text-white hover:bg-red-600"
                      >
                        Reject
                      </button>

                    </div>
                  )}

                </td>

              </tr>
            ))}
          </tbody>

        </table>

      </div>

    </div>
  );
}

export default AdminCampaigns;