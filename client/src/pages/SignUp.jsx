// ==========================================
// 1. IMPORTS & DEPENDENCIES
// ==========================================
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import axios from "axios";
import { UserPlus, ShieldCheck, HeartHandshake } from "lucide-react";
import { styles } from "../styles/common.js";

// ==========================================
// 2. MAIN COMPONENT DECLARATION
// ==========================================
function SignUp() {
  // A. React & Third-Party Hooks
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const BASE_URL = import.meta.env.VITE_API_URL;
  // B. Local Component State
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // C. Event Handlers / Business Logic
  const onCreateUser = async (newUserObj) => {
    setError(null);
    setLoading(true);

    try {
      const { role, ...userObj } = newUserObj;
      console.log(role);
      
      const response = await axios.post(
        `${BASE_URL}/common-api/signup`,
        userObj
      );
      console.log(response.data);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration Failed");
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // 3. JSX LAYOUT RETURN
  // ==========================================
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 flex items-center justify-center px-6 py-10">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/30">
        
        {/* LEFT SECTION - BRANDING & FEATURES */}
        <div className="hidden lg:flex flex-col justify-center bg-gradient-to-br from-[#0071e3] to-[#2563eb] text-white p-14">
          <div className="space-y-8">
            <div>
              <h1 className="text-5xl font-bold leading-tight">
                Join CrowdFunding
              </h1>
              <p className="mt-5 text-blue-100 text-lg leading-relaxed">
                Create campaigns, raise funds, and support impactful ideas across communities.
              </p>
            </div>

            {/* FEATURES */}
            <div className="space-y-5">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                  <UserPlus size={24} />
                </div>
                <div>
                  <h3 className="font-semibold">Easy Registration</h3>
                  <p className="text-sm text-blue-100">
                    Create your account within seconds.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                  <HeartHandshake size={24} />
                </div>
                <div>
                  <h3 className="font-semibold">Support Campaigns</h3>
                  <p className="text-sm text-blue-100">
                    Donate securely using Razorpay integration.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <h3 className="font-semibold">Secure Platform</h3>
                  <p className="text-sm text-blue-100">
                    Protected authentication and secure workflows.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SECTION - REGISTRATION FORM */}
        <div className="flex items-center justify-center p-8 md:p-14">
          <div className="w-full max-w-md">
            {/* HEADER */}
            <div className="mb-8 text-center">
              <h2 className="text-4xl font-bold text-gray-800">
                Create Account
              </h2>
              <p className="text-gray-500 mt-3">
                Start your crowdfunding journey today 🚀
              </p>
            </div>

            {/* FORM */}
            <form onSubmit={handleSubmit(onCreateUser)} className="space-y-5">
              {/* ERROR ACCORDION */}
              {error && (
                <p className={styles.errorClass}>
                  {error}
                </p>
              )}

              {/* FIRST NAME */}
              <div>
                <label className={styles.label}>First Name</label>
                <input
                  type="text"
                  placeholder="Enter first name"
                  className={styles.input}
                  {...register("FirstName", { required: true })}
                />
              </div>

              {/* LAST NAME */}
              <div>
                <label className={styles.label}>Last Name</label>
                <input
                  type="text"
                  placeholder="Enter last name"
                  className={styles.input}
                  {...register("LastName")}
                />
              </div>

              {/* EMAIL */}
              <div>
                <label className={styles.label}>Email</label>
                <input
                  type="email"
                  placeholder="Enter email"
                  className={styles.input}
                  {...register("Email", { required: true })}
                />
              </div>

              {/* PASSWORD */}
              <div>
                <label className={styles.label}>Password</label>
                <input
                  type="password"
                  placeholder="Enter password"
                  className={styles.input}
                  {...register("Password", { required: true })}
                />
              </div>

              {/* PHONE */}
              <div>
                <label className={styles.label}>Contact Number</label>
                <input
                  type="text"
                  placeholder="Enter phone number"
                  className={styles.input}
                  {...register("PhoneNumber")}
                />
              </div>

              {/* SUBMIT BUTTON */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#0071e3] hover:bg-[#005bb5] text-white font-medium py-3 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg"
              >
                {loading ? "Creating Account..." : "Register"}
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}

export default SignUp;