import React from "react";
import Image from "next/image";
import Logo from "../static/logo.png";

const styles = {
  wrapper: "flex justify-center p-5  gap-5 bg-[#FCC017]",
  content: " flex justify-between flex-1 gap-10 ",
  logoContainer: "flex items-center flex-start",
  logo: " cursor-pointer object-contain",
  bannerNav: "flex cursor-pointer items-center space-x-8 ",
  accentedButton: "bg-black text-white py-2 px-4 rounded-full",
};

export default function Header() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.logoContainer}>
          <Image
            className={styles.logo}
            src={Logo}
            alt="logo"
            width="200"
            height="40"
          />
        </div>
        <div className={styles.bannerNav}>
          <div>Our story</div>
          <div>Membership</div>
          <div>Sign In</div>
          <div className={styles.accentedButton}>Get Started</div>
        </div>
      </div>
    </div>
  );
}
