import React,{useEffect,useState} from 'react'
import { styles } from '../../styles/common';
import {userAuth} from '../../store/AuthStore.js'
import axios from 'axios';

function CampaignTable() {
  // Temporary data (later replace with API)
  const [myCampaigns,setMyCampaigns] = useState([]);
  const currentUser = userAuth(state => state.currentUser);
  const formattedDate = (dateString) => {
    const newDate = new Date(dateString).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
  console.log('newDate :',newDate);
  return newDate
  }
// Output: 31 Mar 2026
  useEffect(() => {
      onCurrentUserCampaigns();
  },[currentUser])

  const onCurrentUserCampaigns = async() => {
      let response = await axios.get(`http://localhost:3000/user-api/campaigns`,{withCredentials:true});
      console.log(response.data?.payload);
      setMyCampaigns(response.data?.payload);
  }
  
  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
          <thead className={styles.tableHead}>
            <tr className={styles.tableHeaderCell}>
              <th className={styles.tableCell}>Campaign</th>
              <th className={styles.tableCell}>Goal</th>
              <th className={styles.tableCell}>Raised</th>
              <th className={styles.tableCell}>DeadLine</th>
              <th className={styles.tableCell}>Actions</th>
            </tr>
          </thead>
          <tbody>
              {/* Map through */}
              {
                myCampaigns.map((campaignObj) => <tr key={campaignObj.id} className={styles.tableRow}>
                  <td className={styles.tableCell}>{campaignObj.Title}</td>
                  <td className={styles.tableCell}>{campaignObj.GoalAmount}</td>
                  <td className={styles.tableCell}>{campaignObj.CurrentAmount}</td>
                  <td className={styles.tableCell}>{formattedDate(campaignObj.DeadLine)}</td>
                  <td className={styles.tableCell}>{campaignObj.Status === "Active" ? '✅ Active': ' ❌ Pending'}</td>
                </tr>)
              }
          </tbody>
      </table>
    </div>
  )
}

export default CampaignTable