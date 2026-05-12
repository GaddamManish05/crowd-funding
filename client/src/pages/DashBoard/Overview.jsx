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
  useEffect(()=>{
      getCampaignDetails();
  },[])

  const getCampaignDetails = async () => {
      setError(null);
      setLoading(true);
      try{
          let response = await axios.get('http://localhost:3000/common-api/campaigns',{withCredentials : true});
          console.log(response?.data?.payload);
          response?.data?.payload.filter((campaignObj) => campaignObj.status === "approved");
          setCampaigns([response?.data?.payload]);
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
          value={5}
          icon={<FaFolderOpen />}
        />

        <StatsCard
          title="Funds Raised"
          value={"$25000"}
          icon={<FaChartLine />}
        />

        <StatsCard
          title="Total Donations"
          value={20}
          icon={<FaDonate />}
        />

        <StatsCard
          title="Active Campaigns"
          value={3}
          icon={<FaRocket />}
        />

      </div>
      <div className='mt-7'>
          <CampaignTable campaigns = {campaigns}></CampaignTable>
      </div>

    </div>
  );
}

export default Overview;