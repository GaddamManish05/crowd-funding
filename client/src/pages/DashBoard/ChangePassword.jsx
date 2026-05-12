import React, { useState } from "react";
import { FaEye, FaEyeSlash, FaLock } from "react-icons/fa";
import { styles } from "../../styles/common";
import { toast } from 'react-hot-toast';
import axios from "axios";
import { useNavigate } from "react-router";
function ChangePassword() {

    let navigate = useNavigate();
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const [show, setShow] = useState({
    old: false,
    new: false,
    confirm: false
  });

  const handleChange = (e) => {
    console.log(e.target.name);
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const toggleShow = (field) => {
    setShow(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
        toast.error("Passwords do not match" )
    }
    let res = await axios.post('',formData,{withCredentials: true});
    console.log(res);
    if(!res.ok){
        navigate('profile');
    }
    console.log("Change Password:", formData);
    // axios.post('/api/change-password', formData)
  };

  return (
    <div className="flex justify-center wrap">

      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-sm border">

        <h2 className="text-xl font-semibold mb-6">
          Change Password
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Old Password */}
          <div>
            <label className={styles.label}>Old Password</label>

            <div className="relative">
              <FaLock className="absolute left-3 top-3 text-gray-400" />

              <input
                type={show.old ? "text" : "password"}
                name="oldPassword"
                onChange={handleChange}
                className={`${styles.input} pl-9 pr-10`}
                required
              />

              <button
                type="button"
                onClick={() => toggleShow("old")}
                className="absolute right-3 top-3 text-gray-500"
              >
                {show.old ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div>
            <label className={styles.label}>New Password</label>

            <div className="relative">
              <FaLock className="absolute left-3 top-3 text-gray-400" />

              <input
                type={show.new ? "text" : "password"}
                name="newPassword"
                onChange={handleChange}
                className={`${styles.input} pl-9 pr-10`}
                required
              />

              <button
                type="button"
                onClick={() => toggleShow("new")}
                className="absolute right-3 top-3 text-gray-500"
              >
                {show.new ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className={styles.label}>Confirm Password</label>

            <div className="relative">
              <FaLock className="absolute left-3 top-3 text-gray-400" />

              <input
                type={show.confirm ? "text" : "password"}
                name="confirmPassword"
                onChange={handleChange}
                className={`${styles.input} pl-9 pr-10`}
                required
              />

              <button
                type="button"
                onClick={() => toggleShow("confirm")}
                className="absolute right-3 top-3 text-gray-500"
              >
                {show.confirm ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className={styles.primaryButton + " w-full"}
          >
            Update Password
          </button>

        </form>

      </div>

    </div>
  );
}

export default ChangePassword;