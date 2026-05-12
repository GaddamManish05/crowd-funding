import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import { userAuth } from "../store/AuthStore";
import { styles } from "../styles/common";

function Login() {
    const navigate = useNavigate();

    const { register, handleSubmit } = useForm();

    // Zustand state
    const isAuthenticated = userAuth((state) => state.isAuthenticated);
    const currentUser = userAuth((state) => state.currentUser);
    const login = userAuth((state) => state.login);
    const error = userAuth((state) => state.error);

    const onUserLogin = async (userObj) => {
        await login(userObj);
    };
    console.log('Authenticate :',isAuthenticated);
    console.log('current User :',currentUser);
    useEffect(() => {
        if (isAuthenticated) {
            if (currentUser?.Role === "user") {
                toast.success("Login Successfully");
                    navigate("/dashboard/overview");
            }
            if (currentUser?.Role === "admin") {
                toast.success("Login Successfully");
                    navigate("/admin/overview");
            }
        }
    }, [isAuthenticated, currentUser,navigate]);

    return (
        <div className="mt-20 flex justify-center mb-20">
            <div className={styles.formCard}>
                <form onSubmit={handleSubmit(onUserLogin)}>
                    <h1 className="mb-5 text-2xl font-semibold">Login</h1>

                    {error && <p className={styles.errorClass}>{error}</p>}

                {/* Email */}

                <div className={styles.formGroup}>
                    <label htmlFor="email" className={styles.label}>
                    Email :
                    </label>

                <input
                type="email"
                className={styles.input}
                {...register("Email", { required: true })}
                />
                </div>

                {/* Password */}

            <div className={styles.formGroup}>
                <label htmlFor="password" className={styles.label}>
                Password :
                </label>

                <input
                type="password"
                className={styles.input}
                {...register("Password", { required: true })}
                />
            </div>

            <button type="submit" className={styles.submitBtn}>
                Login
            </button>
        </form>
    </div>
</div>
);
}

export default Login;
