// ==========================================
// 1. IMPORTS & DEPENDENCIES
// ==========================================
import React, { useEffect,useState } from "react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { ShieldCheck, Rocket, HeartHandshake } from "lucide-react";
import { userAuth } from "../store/AuthStore.js";
import { styles } from "../styles/common.js";
import Loader from "../components/common/Loader";
// ==========================================
// 2. MAIN COMPONENT DECLARATION
// ==========================================
function Login() {
  // A. React & Third-Party Hooks
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  // B. Global State / Context Hooks (Zustand)
  const isAuthenticated = userAuth((state) => state.isAuthenticated);
  const currentUser = userAuth((state) => state.currentUser);
  const login = userAuth((state) => state.login);
  const error = userAuth((state) => state.error);
const [loading, setLoading] = useState(false);

  // C. Event Handlers / Business Logic
  const onUserLogin = async (userObj) => {
     try {
        setLoading(true);
        await login(userObj);
    }
    finally {
        setLoading(false);
    }
  };

  // D. Lifecycle & Side Effects
  useEffect(() => {
    if (isAuthenticated) {
      toast.success("Login Successfully 🚀");

      if (currentUser?.Role === "user") {
        navigate("/dashboard/overview");
      }
      if (currentUser?.Role === "admin") {
        navigate("/admin/overview");
      }
    }
  }, [isAuthenticated, currentUser, navigate]);

  // ==========================================
  // 3. JSX LAYOUT RETURN
  // ==========================================
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 flex items-center justify-center px-6 py-10">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/30">
        
        {/* LEFT SIDE - BRANDING & FEATURES */}
        <div className="hidden lg:flex flex-col justify-center bg-gradient-to-br from-[#0071e3] to-[#2563eb] text-white p-14 relative">
          <div className="space-y-8">
            <div>
              <h1 className="text-5xl font-bold leading-tight">
                CrowdFunding Platform
              </h1>
              <p className="mt-5 text-blue-100 text-lg leading-relaxed">
                Support ideas, empower communities, and help campaigns achieve their goals.
              </p>
            </div>

            {/* FEATURES */}
            <div className="space-y-5">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                  <Rocket size={24} />
                </div>
                <div>
                  <h3 className="font-semibold">Launch Campaigns</h3>
                  <p className="text-sm text-blue-100">
                    Create and manage fundraising campaigns.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                  <HeartHandshake size={24} />
                </div>
                <div>
                  <h3 className="font-semibold">Secure Donations</h3>
                  <p className="text-sm text-blue-100">
                    Integrated Razorpay payment support.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <h3 className="font-semibold">Safe & Trusted</h3>
                  <p className="text-sm text-blue-100">
                    Secure authentication and protected workflows.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE - LOGIN FORM */}
        <div className="flex items-center justify-center p-8 md:p-14">
          <div className="w-full max-w-md">
            <div className="mb-8 text-center">
              <h2 className="text-4xl font-bold text-gray-800">
                Welcome Back
              </h2>
              <p className="text-gray-500 mt-3">
                Login to continue your crowdfunding journey
              </p>
            </div>

            <form onSubmit={handleSubmit(onUserLogin)} className="space-y-6">
              {/* ERROR ACCORDION */}
              {error && (
                <p className={styles.errorClass}>
                  {error}
                </p>
              )}

              {/* EMAIL */}
              <div>
                <label htmlFor="email" className={styles.label}>
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className={styles.input}
                  {...register("Email", { required: true })}
                />
              </div>

              {/* PASSWORD */}
              <div>
                <label htmlFor="password" className={styles.label}>
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className={styles.input}
                  {...register("Password", { required: true })}
                />
              </div>

              {/* SUBMIT BUTTON */}
              <button type="submit" disabled={loading} className={`${styles.submitBtn} flex items-center justify-center gap-3 disabled:opacity-70`}>
              {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    Signing In...
              </>
            ) : (
            "Login")}
            </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Login;