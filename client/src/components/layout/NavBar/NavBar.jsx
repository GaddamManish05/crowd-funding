import React from "react";
import { styles } from "../../../styles/common";
import { userAuth } from "../../../store/AuthStore";

import Logo from "./Logo";
import NavLinks from "./NavLinks";
import AuthButtons from "./AuthButtons";
import UserMenu from "./UserMenu";

function Navbar() {

  const isAuthenticate = userAuth((state) => state.isAuthenticate);

  return (
    <header>

      <nav className={styles.navbar}>

        {/* Logo */}
        <Logo />

        {/* Navigation */}
        <NavLinks />

        {/* Right Section */}
        {isAuthenticate ? <UserMenu /> : <AuthButtons />}

      </nav>

    </header>
  );
}

export default Navbar;