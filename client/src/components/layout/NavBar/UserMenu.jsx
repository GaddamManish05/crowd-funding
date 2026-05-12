import React from "react";
import { Link } from "react-router";
import { userAuth } from "../../../store/AuthStore";
import { styles } from "../../../styles/common";

function UserMenu() {

    const logout = userAuth((state) => state.logout);

return (
    <div className="flex items-center gap-4">

      <Link
        to="/dashboard"
        className={styles.secondaryButton}
      >
        Dashboard
      </Link>

      <button
        onClick={logout}
        className={styles.primaryButton}
      >
        Logout
      </button>

    </div>
  );
}

export default UserMenu;