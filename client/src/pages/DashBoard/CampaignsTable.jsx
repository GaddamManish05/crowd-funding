// ==========================================
// 1. IMPORTS & DEPENDENCIES
// ==========================================
import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { FaAddressCard } from "react-icons/fa";
import { userAuth } from '../../store/AuthStore.js';
import DonationForm from '../../components/campaign/DonationForm.jsx';
import { styles } from '../../styles/common.js';
import Loader from '../../components/common/Loader';

// ==========================================
// 2. MAIN COMPONENT DECLARATION
// ==========================================
function CampaignTable() {
  // A. Local Component State
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const BASE_URL = import.meta.env.VITE_API_URL;
  // B. Global State / Context Hooks (Zustand)
  const search = userAuth((state) => state.search);

  // C. Helper Functions / Utilities
  const formattedDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };
  const isAuthenticated = userAuth(state => state.isAuthenticated);
  // D. Event Handlers / Business Logic
  const fetchCampaigns = async () => {
    setError(null);
    setLoading(true);

    try {
      const response = await axios.get(
        `${BASE_URL}/common-api/campaigns`,
        { withCredentials: true }
      );
      setCampaigns(response.data?.payload || []);
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message || "Failed to fetch campaigns");
    } finally {
      setLoading(false);
    }
  };

  console.log("is authenticated from dashboard :",isAuthenticated)
  // E. Lifecycle & Side Effects
  useEffect(() => {
    if (!isAuthenticated) return;
    fetchCampaigns();
  }, [isAuthenticated]);



  // F. Derived State / Memoized Values
  const filteredCampaigns = useMemo(() => {
  return campaigns.filter((camp) => {
    console.log(camp);

    const title = camp.Title || camp.title || "";
    const description = camp.Description || camp.description || "";
    const status = camp.Status || camp.status || "";

    const searchText = search.toLowerCase();

    return (
      title.toLowerCase().includes(searchText) ||
      description.toLowerCase().includes(searchText) ||
      status.toLowerCase().includes(searchText)
    );
  });
}, [campaigns, search]);
  console.log("filteredCampaigns is :",filteredCampaigns)
  // Early Return Condition for Empty State
  if (filteredCampaigns.length === 0 && !loading) {
    return (
      <p className={styles.cardDescription}>
        No Campaigns Found...
      </p>
    );
  }

  // ==========================================
  // 3. JSX LAYOUT RETURN
  // ==========================================
  return (
    <>
      {/* DONATION MODAL */}
      {selectedCampaign && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
          <div className="relative w-full max-w-md">
            {/* CLOSE BUTTON */}
            <button
              onClick={() => setSelectedCampaign(null)}
              className="absolute top-3 right-3 z-10 text-gray-500 hover:text-black text-xl"
            >
              ✕
            </button>

            <DonationForm
              campaignId={selectedCampaign._id}
              onSuccess={() => {
                fetchCampaigns();
                setSelectedCampaign(null);
              }}
            />
          </div>
        </div>
      )}

      {/* CAMPAIGNS LISTING CONTAINER */}
      <div className="grid gap-6">
        {/* ERROR */}
        {error && (
          <p className={styles.errorClass}>
            {error}
          </p>
        )}

        {/* LOADING */}
        {loading && <Loader></Loader>}

        {/* LIST */}
        {filteredCampaigns.map((camp) => {
          const progress = Math.min((camp.CurrentAmount / camp.GoalAmount) * 100, 100);

          return (
            <div key={camp._id} className={styles.card}>
              {/* HEADER */}
              <div className="flex items-center gap-2 p-4">
                <FaAddressCard className="text-blue-500 text-lg" />
                <h2 className={styles.cardTitle}>
                  {camp.Title}
                </h2>
              </div>

              {/* CONTENT */}
              <div className={styles.cardContent}>
                <p className={`${styles.cardDescription} line-clamp-3`}>
                  {camp.Description}
                </p>

                {/* AMOUNT */}
                <p className={styles.campaignAmount}>
                  ₹{camp.CurrentAmount} raised of ₹{camp.GoalAmount}
                </p>

                {/* PROGRESS */}
                <div className={`${styles.progressBarContainer} w-30`}>
                  <div
                    className={styles.progressBar}
                    style={{ width: `${progress}%` }}
                  />
                </div>

                {/* EXTRA METRICS */}
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>
                    Status:{camp.Status === "active" ? " ✅ Active" : camp.Status === "pending" ? " ⏳ Pending" : camp.Status === "completed" ? " 🏁 Completed" : camp.Status === "expired" ? " ⏰ Expired" : " ❌ Rejected"}
                  </span>
                  <span>
                    Deadline: {formattedDate(camp.DeadLine)}
                  </span>
                </div>

                {/* DONATE BUTTON */}
                <button
                  onClick={() => {
                    if (camp.Status !== "active") {
                      return alert(camp.Status === "completed" ? "Campaign goal already achieved 🎉" : "Only active campaigns can receive donations");
                    }
                    setSelectedCampaign(camp);
                  }}
                  className={styles.donateButton}
                >
                  Donate Now
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default CampaignTable;