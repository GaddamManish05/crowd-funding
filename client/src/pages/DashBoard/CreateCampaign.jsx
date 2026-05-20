// ==========================================
// 1. IMPORTS & DEPENDENCIES
// ==========================================
import React, { useState } from "react";
import { userAuth } from "../../store/AuthStore";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router";
import axios from "axios";
import {
  Target,
  Calendar,
  Image as ImageIcon,
  FileText,
  Tag
} from "lucide-react";
import { styles } from "../../styles/common";

// ==========================================
// 2. MAIN COMPONENT DECLARATION
// ==========================================
function CreateCampaign() {
  // A. React & Third-Party Hooks
  const { register, handleSubmit, watch, reset } = useForm();
  const navigate = useNavigate();

  // B. Global State / Context Hooks
  const addNotification = userAuth((state) => state.addNotification);

  const BASE_URL = import.meta.env.VITE_API_URL;
  // C. Local Component State
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // D. Derived State / Watches
  const imageFile = watch("Image");

  // E. Event Handlers / Business Logic
  const createNewCampaign = async (data) => {
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("Title", data.Title);
      formData.append("Description", data.Description);
      formData.append("Category", data.Category);
      formData.append("GoalAmount", data.GoalAmount);
      formData.append("DeadLine", data.DeadLine);
      formData.append("Image", data.Image[0]);

      const response = await axios.post(
        `${BASE_URL}/campaign-api/add`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );

      console.log(response.data);
      toast.success("Campaign Created 🎉");
      reset();
      addNotification({ title: "Campaign Created", message: `${data.Title} campaign created successfully` });
      navigate("/dashboard/my-campaigns");
    } catch (err) {
      console.log(err.message);
      setError(err.response?.data?.message || "Campaign creation failed");
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // 3. JSX LAYOUT RETURN
  // ==========================================
  return (
    <div className="min-h-full bg-[#f5f5f7]">
      <div className="flex justify-center px-4 py-10">
        <div className="w-full max-w-3xl bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          {loading && (
            <p className={styles.loadingClass}>
              Creating Campaign...
            </p>
          )}

          {error && (
            <p className={styles.errorClass}>
              {error}
            </p>
          )}

          <h2 className={styles.headingMD}>
            Campaign Details
          </h2>

          <form onSubmit={handleSubmit(createNewCampaign)} className="space-y-6 mt-6">
            {/* TITLE */}
            <div className={styles.formGroup}>
              <label className={styles.label}>
                Campaign Title
              </label>
              <div className="relative">
                <FileText className="absolute left-3 top-3 text-gray-400" size={18} />
                <input
                  type="text"
                  {...register("Title", {
                    required: true,
                    maxLength: 80,
                    minLength: 8
                  })}
                  className={`${styles.input} pl-10`}
                  placeholder="Enter campaign title"
                />
              </div>
            </div>

            {/* TARGET + CATEGORY */}
            <div className={styles.grid2}>
              {/* TARGET */}
              <div className={styles.formGroup}>
                <label className={styles.label}>
                  Goal Amount
                </label>
                <div className="relative">
                  <Target className="absolute left-3 top-3 text-gray-400" size={18} />
                  <input
                    type="number"
                    {...register("GoalAmount", { required: true })}
                    className={`${styles.input} pl-10`}
                    placeholder="Enter target amount"
                  />
                </div>
              </div>

              {/* CATEGORY */}
              <div className={styles.formGroup}>
                <label className={styles.label}>
                  Category
                </label>
                <div className="relative">
                  <Tag className="absolute left-3 top-3 text-gray-400" size={18} />
                  <select
                    {...register("Category", { required: true })}
                    className={`${styles.input} pl-10`}
                  >
                    <option value="">Select category</option>
                    <option value="Education">Education</option>
                    <option value="Health">Health</option>
                    <option value="Environment">Environment</option>
                    <option value="Technology">Technology</option>
                    <option value="Arts">Arts</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
            </div>

            {/* DEADLINE */}
            <div className={styles.formGroup}>
              <label className={styles.label}>
                Campaign Deadline
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 text-gray-400" size={18} />
                <input
                  type="date"
                  {...register("DeadLine", { required: true })}
                  className={`${styles.input} pl-10`}
                />
              </div>
            </div>

            {/* DESCRIPTION */}
            <div className={styles.formGroup}>
              <label className={styles.label}>
                Campaign Description
              </label>
              <textarea
                rows="5"
                {...register("Description", { required: true })}
                className={styles.textarea}
                placeholder="Describe your campaign purpose..."
              />
            </div>

            {/* IMAGE */}
            <div className={styles.formGroup}>
              <label className={styles.label}>
                Campaign Image
              </label>
              <div className="relative">
                <ImageIcon className="absolute left-3 top-3 text-gray-400" size={18} />
                <input
                  type="file"
                  accept="image/*"
                  {...register("Image", { required: true })}
                  className={`${styles.input} pl-10`}
                />
              </div>

              {/* IMAGE PREVIEW */}
              {imageFile?.[0] && (
                <img
                  src={URL.createObjectURL(imageFile[0])}
                  alt="Preview"
                  className="mt-4 w-full h-64 object-cover rounded-2xl border border-gray-100"
                />
              )}
            </div>

            {/* SUBMIT */}
            <button
              type="submit"
              disabled={loading}
              className={`${styles.primaryButton} w-full`}
            >
              {loading ? "Creating Campaign..." : "Launch Campaign"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateCampaign;