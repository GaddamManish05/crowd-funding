import React from "react";
import { Link } from "react-router";
import { styles } from "../../../styles/common";
import { userAuth } from "../../../store/AuthStore";

function AuthButtons() {
  const isAuthenticated = userAuth(state => state.isAuthenticated);
  const currentUser = userAuth(state => state.currentUser)
  console.log("Authenticate",isAuthenticated);
  console.log("current user",currentUser);
  return (

    <div className="">
      {!isAuthenticated &&
      <div className="flex items-center gap-4">
        <Link
          to="/login"
          className={styles.secondaryButton}
        >
          Login
        </Link>
      
        <Link
          to="/sign-up"
          className={styles.primaryButton}
        >
          Sign Up
        </Link>
      </div>
    }
    </div>
          
  );
}

export default AuthButtons;
