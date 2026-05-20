import React from "react";
import { NavLink } from "react-router";
import { styles } from "../../../styles/common";

function NavLinks() {

  const links = [
    { name: "Home", path: "/" },
    { name: "Explore", path: "/explore" },
    { name: "How it Works", path: "/how-it-works" }
  ];

  return (
    <ul className={styles.navLinks}>

      {links.map((link) => (
        <li key={link.name}>

          <NavLink
            to={link.path}
            className={({ isActive }) =>
              isActive
                ? `${styles.navLinkItem} font-semibold`
                : styles.navLinkItem
            }
          >
            {link.name}
          </NavLink>

        </li>
      ))}

    </ul>
  );
}

export default NavLinks;