import React from "react";
import { styles } from "../../styles/common";
import { Link } from "react-router";

function Footer() {
  return (
    <footer className={styles.footer}>

      <div className={styles.footerContainer}>

        {/* Brand Section */}

        <div className="max-w-sm">

          <h2 className="text-xl font-semibold mb-4">
            CrowdFund
          </h2>

          <p className={styles.footerText}>
            CrowdFund helps creators, innovators, and communities
            raise funds for meaningful projects and causes.
            Support ideas that inspire change.
          </p>

        </div>


        {/* Product Links */}

        <div className={styles.footerLinks}>
          <h3 className="text-white font-semibold mb-3">
            Product
          </h3>

          <Link to="/">Home</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/create-campaign">Start Campaign</Link>
          <Link to="/donations">Donations</Link>
        </div>


        {/* Company Links */}

        <div className={styles.footerLinks}>
          <h3 className="text-white font-semibold mb-3">
            Company
          </h3>

          <a href="#">About</a>
          <a href="#">Careers</a>
          <a href="#">Blog</a>
          <a href="#">Press</a>
        </div>


        {/* Support Links */}

        <div className={styles.footerLinks}>
          <h3 className="text-white font-semibold mb-3">
            Support
          </h3>

          <Link to="/sign-up">Sign Up</Link>
          <Link to="/login">Login</Link>
          <a href="#">Help Center</a>
          <a href="#">Contact</a>
        </div>

      </div>


      {/* Bottom Section */}

      <div className="border-t border-gray-800 mt-12 pt-6 text-center text-sm text-gray-400">

        © {new Date().getFullYear()} CrowdFund. All rights reserved.

      </div>

    </footer>
  );
}

export default Footer;