import React,{useState , useEffect} from 'react'
import { styles } from '../../styles/common'
import { FaAddressCard } from "react-icons/fa"
import { } from 'react-router-dom'
import axios from 'axios'
function CampaignTable() {
  const [error,setError] = useState(null);
  const [loading,setLoading] = useState(false);
  const [campaigns,setCampaigns] = useState([]);
  // const navigate = useNavigate();
  console.log(campaigns);
  useEffect(() => {
    donateCampaign();
  },[])
  const donateCampaign = async() => {
    setError(null);
    setLoading(true);
    try{
        let response = await axios.get('http://localhost:3000/common-api/campaigns',{withCredentials : true});
        console.log(response.data);
        setCampaigns(response.data?.payload);
        
    }catch(err){
      setError(err.message);
    }finally{
      setLoading(false);
    }
  };
  if(campaigns.length === 0){
    return <p className={styles.cardDescription}>No Campaigns Found....</p>
  }
  return (
    <div className="grid gap-6">
      {error && <p className={styles.errorClass}>{error}</p>}
      {loading && <p className={styles.loadingClass}>Loading...</p>}
      {campaigns.map((camp) => {

        const progress = Math.min(
          (camp.CurrentAmount / camp.GoalAmount) * 100,
          100
        );

        return (
        <div key={camp.id} className={styles.card}>

            {/* Header */}
            <div className="flex items-center gap-2 p-4">
                <FaAddressCard className="text-blue-500 text-lg" />
                <h2 className={styles.cardTitle}>{camp.Title}</h2>
            </div>

            {/* Content */}
            <div className={styles.cardContent}>

            <p className={styles.cardDescription}>
                {camp.Description}
            </p>

              {/* Amount */}
            <p className={styles.campaignAmount}>
                ₹{camp.CurrentAmount} raised of ₹{camp.GoalAmount}
            </p>

              {/* Progress */}
            <div className={`${styles.progressBarContainer} w-30`}>
                <div
                    className={styles.progressBar}
                    style={{ width: `${progress}%` }}
                />
            </div>

              {/* Extra Info */}
            <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>Status: {camp.Status}</span>
                <span>Deadline: {camp.Deadline}</span>
            </div>

              {/* Button */}
            <button
                onClick={donateCampaign}
                className={styles.donateButton}
            >
                Donate Now
              </button>

            </div>

          </div>
        );
      })}

    </div>
  );
}

export default CampaignTable;