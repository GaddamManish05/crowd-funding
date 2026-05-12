import React, { useState } from "react";
import { Target, Calendar, Image as ImageIcon, FileText, Tag } from "lucide-react";
import { styles } from "../../styles/common";
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router'
import axios from "axios";

function CreateCampaign() {
  const {register,handleSubmit} = useForm()
  const [newCampaigns,setNewCampaigns] = useState([]);
  console.log(newCampaigns);
  const [error,setError] = useState(null);
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();
  const createNewCampaign = async(newCampaignObj) => {
    console.log(newCampaignObj);
    setLoading(true);
    setError(null);
    try{
      // const { name, value } = e.target;
      const response = await axios.post('http://localhost:3000/campaign-api/add',newCampaignObj,{withCredentials : true});
      setNewCampaigns(response.data?.payload);
      toast.success('Campaign Created 🎉');
      navigate('/dashboard/my-campaigns');

    }catch(err){
      console.log(err.response?.data?.message);
      setError(err.response?.data?.message);
    }finally{
      setLoading(false);
    }
  };

  return (
    <div className="min-h-full bg-[#f5f5f7]">
      {/* Form Section */}
      <div className="flex justify-center px-4 py-10">
        
        <div className="w-full max-w-3xl bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        {loading && <p className={styles.loadingClass}>Loading...</p>}
        {error && <p className={styles.errorClass}>{error}</p>}
          <h2 className="text-xl font-semibold text-[#1d1d1f] mb-6">
            Campaign Details
          </h2>

          <form onSubmit={handleSubmit(createNewCampaign)} className="space-y-6">

            {/* Title */}
            <div>
              <label className={styles.label}>Campaign Title</label>
              <div className="relative">
                <FileText className="absolute left-3 top-3 text-gray-400" size={18} />
                <input
                  name="title"
                  {...register('Title',{required : true})}
                  className={`${styles.input} pl-9`}
                  placeholder="Enter campaign title"
                  required
                />
              </div>
            </div>

            {/* Target + Category */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <div>
                <label className={styles.label}>Target Amount</label>
                <div className="relative">
                  <Target className="absolute left-3 top-3 text-gray-400" size={18} />
                  <input
                    name="targetAmount"
                    type="number"
                    {...register('GoalAmount',{required : true})}
                    className={`${styles.input} pl-9`}
                    placeholder="₹50000"
                    required
                  />
                </div>
              </div>

              <div>
                <label className={styles.label}>Category</label>
                <div className="relative">
                  <Tag className="absolute left-3 top-3 text-gray-400" size={18} />
                  <select
                    name="category"
                    className={`${styles.input} pl-9`}
                    {...register('Category',{required : true})}
                  >
                    <option>Tech</option>
                    <option>Education</option>
                    <option>Health</option>
                    <option>Environment</option>
                  </select>
                </div>
              </div>

            </div>

            {/* Deadline */}
            <div>
              <label className={styles.label}>End Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 text-gray-400" size={18} />
                <input
                  name="deadline"
                  type="date"
                  className={`${styles.input} pl-9`}
                  {...register('DeadLine',{required : true})}
                  required
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className={styles.label}>Description</label>
              <textarea
                name="description"
                rows="5"
                className={`${styles.textarea}`}
                {...register('Description',{required : true})}
                placeholder="Explain your campaign..."
              />
            </div>

            {/* Image */}
            <div>
              <label className={styles.label}>Image URL</label>
              <div className="relative">
                <ImageIcon className="absolute left-3 top-3 text-gray-400" size={18} />
                <input
                  name="image"
                  className={`${styles.input} pl-9`}
                  {...register('ImageUrl',{required : true})}
                  placeholder="https://..."
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className={styles.primaryButton + " w-full"}
            >
              Launch Campaign
            </button>

          </form>

        </div>

      </div>

    </div>
  );
}

export default CreateCampaign;