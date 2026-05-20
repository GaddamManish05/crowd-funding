import React, { useEffect, useState } from "react";
import axios from "axios";
import { styles } from "../../styles/common.js";

function AdminDonation() {

  const [donations, setDonations] = useState([]);
  const BASE_URL = import.meta.env.VITE_API_URL;
  const fetchDonations = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/admin-api/donations`, {withCredentials: true});
      console.log("donations : ",res.data.payload);
      setDonations(res.data.payload);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    fetchDonations();
  }, []);

  return (
    <div className="p-6">

      <h1 className={styles.sectionTitle}>
        All Donations
      </h1>

      <div className={styles.tableContainer}>

        <table className={styles.table}>

          <thead className={styles.tableHead}>
            <tr>
              <th className={styles.tableHeaderCell}>Donor</th>
              <th className={styles.tableHeaderCell}>Amount</th>
              <th className={styles.tableHeaderCell}>Campaign</th>
              <th className={styles.tableHeaderCell}>Date</th>
              <th className={styles.tableHeaderCell}>Payment Status</th>
            </tr>
          </thead>

          <tbody>
            {donations.length > 0 ? donations.map((d) => (
              <tr key={d._id} className={styles.tableRow}>

                <td className={styles.tableCell}>
                  {d.Donor?.FirstName}
                </td>

                <td className={styles.tableCell}>
                  ₹{d.Amount}
                </td>

                <td className={styles.tableCell}>
                  {d.Campaign?.Title || "N/A"}
                </td>

                <td className={styles.tableCell}>
                  {new Date(d.createdAt).toLocaleDateString()}
                </td>

                <td className={styles.tableCell}>
                  {d.Status === "Success" ? "✅ Success":"❌ Failed"}
                </td>

              </tr>
            )) : (
                    <tr>
                      <td colSpan="3" className={styles.tableCell}>
                          No donations found...
                      </td>
                    </tr>
            )}
          </tbody>

        </table>

      </div>

    </div>
  );
}

export default AdminDonation;