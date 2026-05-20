// ==========================================
// 1. IMPORTS & DEPENDENCIES
// ==========================================
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaLock } from "react-icons/fa";
import { toast } from "react-hot-toast";
import axios from "axios";
import { styles } from "../../styles/common.js";

// ==========================================
// 2. MAIN COMPONENT DECLARATION
// ==========================================
function ChangePassword() {
  // A. React & Third-Party Hooks
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_API_URL;

  // B. Local Component State
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const [show, setShow] = useState({
    current: false,
    new: false,
    confirm: false
  });

  const [loading, setLoading] = useState(false);

  // C. Event Handlers / Business Logic
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const toggleShow = (field) => {
    setShow((prev) => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Password Match Check
    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    // 2. Password Length Check
    if (formData.newPassword.length < 6) {
      toast.error("Password must contain at least 6 characters");
      return;
    }

    // 3. API Request Execution
    try {
      setLoading(true);
      const res = await axios.put(
        `${BASE_URL}/common-api/change-password`,
        formData,
        { withCredentials: true }
      );

      console.log(res.data);
      toast.success(res.data?.message || "Password Updated Successfully");

      // Reset form states on success
      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      });

      navigate("/dashboard/user-profile");
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "Unable to update password");
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // 3. JSX LAYOUT RETURN
  // ==========================================
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start p-6">
      <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-lg border">
        
        {/* TITLE HEADINGS */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800">
            Change Password
          </h2>
          <p className="text-gray-500 text-sm mt-2">
            Update your account password securely
          </p>
        </div>

        {/* INPUT FIELDS FORM */}
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* CURRENT PASSWORD */}
          <div>
            <label className={styles.label}>Current Password</label>
            <div className="relative">
              <FaLock className="absolute left-3 top-4 text-gray-400" />
              <input
                type={show.current ? "text" : "password"}
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleChange}
                className={`${styles.input} pl-10 pr-12`}
                placeholder="Enter current password"
                required
              />
              <button
                type="button"
                onClick={() => toggleShow("current")}
                className="absolute right-4 top-4 text-gray-500"
              >
                {show.current ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* NEW PASSWORD */}
          <div>
            <label className={styles.label}>New Password</label>
            <div className="relative">
              <FaLock className="absolute left-3 top-4 text-gray-400" />
              <input
                type={show.new ? "text" : "password"}
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                className={`${styles.input} pl-10 pr-12`}
                placeholder="Enter new password"
                required
              />
              <button
                type="button"
                onClick={() => toggleShow("new")}
                className="absolute right-4 top-4 text-gray-500"
              >
                {show.new ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* CONFIRM PASSWORD */}
          <div>
            <label className={styles.label}>Confirm Password</label>
            <div className="relative">
              <FaLock className="absolute left-3 top-4 text-gray-400" />
              <input
                type={show.confirm ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`${styles.input} pl-10 pr-12`}
                placeholder="Confirm new password"
                required
              />
              <button
                type="button"
                onClick={() => toggleShow("confirm")}
                className="absolute right-4 top-4 text-gray-500"
              >
                {show.confirm ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-70"
          >
            {loading ? "Updating..." : "Update Password"}
          </button>

        </form>
      </div>
    </div>
  );
}

export default ChangePassword;