import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { styles } from '../../styles/common';

function AdminRecentDonations() {

  const [donations, setDonations] = useState([]);
  const BASE_URL = import.meta.env.VITE_API_URL;
  const fetchDonations = async () => {
    try {
      let res = await axios.get(
        `${BASE_URL}/admin-api/recent-donations`,
        { withCredentials: true }
      );
      console.log("Donations : ",res.data?.payload)
      setDonations(res.data?.payload || []);

    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    fetchDonations();
  }, []);

  return (
    <div className={styles.tableContainer}>

      <h2 className="px-6 py-4 font-semibold">
        Recent Donations
      </h2>

      <table className={styles.table}>

        <thead className={styles.tableHead}>
          <tr>
            <th className={styles.tableHeaderCell}>Donor</th>
            <th className={styles.tableHeaderCell}>Amount</th>
            <th className={styles.tableHeaderCell}>Campaign</th>
          </tr>
        </thead>

        <tbody>
          {donations.length > 0 ? (
            donations.map((d) => (
              <tr key={d._id} className={styles.tableRow}>
                <td className={styles.tableCell}>{d?.Donor?.FirstName}</td>
                <td className={styles.tableCell}>₹{d.Amount}</td>
                <td className={styles.tableCell}>
                  {d.Campaign?.Title || "N/A"}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className={styles.tableCell}>
                No donations found
              </td>
            </tr>
          )}
        </tbody>

      </table>
    </div>
  );
}

export default AdminRecentDonations;