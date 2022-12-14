import Link from "next/link";
import React, { useEffect, useState } from "react";
import styles from "../../styles/Navbar.module.css";
import { useMoralis } from "react-moralis";
export const Navbar = () => {
  const { user, isAuthenticated, isAuthenticating, logout } = useMoralis();

  return (
    <div className={styles.nav_component}>
      <div className={styles.nav_items}>
        <div className={styles.logo_component}>
          <div className={styles.logo}>
            <div id={styles.brandlogo} style={{ width: 50, height: 50 }} />
          </div>
          <div className={styles.logo_name}>
            <h3 className={styles.logo_text}>Data Analytics</h3>
          </div>
        </div>
        <div className={styles.nav_item}>
          <li className={styles.nav_links}>
            
          

            <>
              {user ? (
                <Link href="/">
                  <button
                    className={styles.Signup_btn}
                    onClick={() => {
                      logout();
                      console.log(isAuthenticated);
                    }}
                    disabled={isAuthenticating}
                  >
                    Logout{console.log(isAuthenticated)}
                  </button>
                </Link>
              ) : (
                <Link href="/Login" className={styles.User_Route}>
                  <button className={styles.Signup_btn}>Sign Up/login</button>
                </Link>
              )}
            </>
          </li>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
