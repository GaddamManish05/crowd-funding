import React,{useState , useEffect} from "react";
import { styles } from "../../styles/common";
import StatsCard from "../../components/dashboard/StatsCard";
import CampaignTable from "./CampaignsTable";
import axios from "axios";
import {
  FaChartLine,
  FaDonate,
  FaFolderOpen,
  FaRocket
} from "react-icons/fa";

function Overview() {
  const [campaigns,setCampaigns] = useState([]);
  const [error,setError] = useState(null);
  const [loading,setLoading] = useState(false);
  console.log("campaigns are",campaigns);

  const BASE_URL = import.meta.env.VITE_API_URL;
  
  useEffect(()=>{
      getCampaignDetails();
  },[])

  const getCampaignDetails = async () => {
      setError(null);
      setLoading(true);
      try{
          let response = await axios.get(`${BASE_URL}/user-api/campaigns`, { withCredentials: true });
          console.log(response?.data?.payload);
          setCampaigns(response?.data?.payload);
      }catch(err){
          setError(err.response?.data?.error);
      }finally{
        setLoading(false);
      }
  }
  
  return (
    <div className="text-center">
      <h1 className={`${styles.sectionTitle} text-center`}>
        Dashboard Overview
      </h1>
      {loading && <p className={styles.loadingClass}>{loading}</p>}
      {error && <p className={styles.errorClass}>{error}</p>}
      <div className={styles.statsContainer}>

        <StatsCard
          title="Total Campaigns"
          value={campaigns.length}
          icon={<FaFolderOpen />}
        />

        <StatsCard
          title="Funds Raised"
          value={`$ ${campaigns.reduce((sum,cur) => sum + cur.CurrentAmount,0)}`}
          icon={<FaChartLine />}
        />

        <StatsCard
          title="Donations Received"
          value={campaigns.reduce((sum,cur) => sum + cur.Donations.length,0)}
          icon={<FaDonate />}
        />

        <StatsCard
          title="Active Campaigns"
          value={campaigns.filter((campaigns) => campaigns.Status === "active").length}
          icon={<FaRocket />}
        />

      </div>
      <div className='mt-7'>
          <CampaignTable></CampaignTable>
      </div>

    </div>
  );
}

export default Overview;