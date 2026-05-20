// ==========================================
// 1. IMPORTS & DEPENDENCIES
// ==========================================
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { styles } from '../../styles/common';
import Loader from '../common/Loader';

// ==========================================
// 2. MAIN COMPONENT DECLARATION
// ==========================================
function DonationTable() {
  // A. Local Component State
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const BASE_URL = import.meta.env.VITE_API_URL;
  // B. Helper Functions / Utilities
  const formattedDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  // C. Event Handlers / Business Logic
  const fetchDonations = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `${BASE_URL}/user-api/donations`,
        { withCredentials: true }
      );
      console.log(response.data?.donations);
      setDonations(response.data?.donations || []);
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message || "Unable to fetch donations");
    } finally {
      setLoading(false);
    }
  };

  // D. Lifecycle & Side Effects
  useEffect(() => {
    fetchDonations();
  }, []);

  // ==========================================
  // 3. JSX LAYOUT RETURN
  // ==========================================
  return (
    <div>
      <div className={styles.tableContainer}>
        {/* ERROR */}
        {error && (
          <p className={styles.errorClass}>
            {error}
          </p>
        )}

        {/* LOADING */}
        {loading && <Loader></Loader>}

        <table className={styles.table}>
          <thead className={styles.tableHead}>
            <tr className={styles.tableRow}>
              <th className={styles.tableCell}>Campaign</th>
              <th className={styles.tableCell}>Amount</th>
              <th className={styles.tableCell}>Donar</th>
              <th className={styles.tableCell}>Date</th>
              <th className={styles.tableCell}>Status</th>
            </tr>
          </thead>

          <tbody>
            {donations.length > 0 ? (
              donations.map((donateObj) => (
                <tr key={donateObj._id} className={styles.tableRow}>
                  <td className={styles.tableCell}>
                    {donateObj.Campaign?.Title}
                  </td>
                  <td className={styles.tableCell}>
                    ₹{donateObj.Amount}
                  </td>
                  <td className={styles.tableCell}>
                    {donateObj.Donor?.FirstName} {donateObj.Donor?.LastName}
                  </td>
                  <td className={styles.tableCell}>
                    {formattedDate(donateObj.createdAt)}
                  </td>
                  <td className={styles.tableCell}>
                    {donateObj.Status === "Success" ? "✅ Success" : "⏳ Pending"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className={styles.tableCell}>
                  No Donations Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DonationTable;