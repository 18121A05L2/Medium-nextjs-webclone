import React, { useContext } from "react";
import Image from "next/image";
import Logo from "../static/logo.png";
import { MediumContext } from "../context/MediumContext";
import Modal from "react-modal";
import { useRouter } from "next/router";
import Link from "next/link";
import PostModal from "./PostModal";

Modal.setAppElement("#__next");

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const styles = {
  wrapper: "flex justify-center p-5  gap-5 bg-[#FCC017]",
  content: " flex justify-between flex-1 gap-10 ",
  logoContainer: "flex items-center flex-start",
  logo: " cursor-pointer object-contain",
  bannerNav: "flex cursor-pointer items-center space-x-8 ",
  accentedButton: "bg-black text-white py-2 px-4 rounded-full",
};

export default function Header() {
  const router = useRouter();
  const { handleAuth, currentUser, handleSignOut } = useContext(MediumContext);
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

          {currentUser && (
            <Link href="/?addNew=1">
              <div className={styles.accentedButton}>Write</div>
            </Link>
          )}

          {currentUser && (
            <div className={styles.accentedButton} onClick={handleSignOut}>
              SignOut
            </div>
          )}
          {!currentUser && <div onClick={handleAuth}>Sign In</div>}
          <div className={styles.accentedButton}>Get Started</div>
        </div>
      </div>
      <Modal
        isOpen={Boolean(router.query.addNew)}
        onRequestClose={() => router.push("/")}
        style={customStyles}
      >
        <PostModal></PostModal>
      </Modal>
    </div>
  );
}
