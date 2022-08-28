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
  wrapper:
    "flex justify-center p-5  gap-5 bg-[#FCC017] sticky left-0 right-0 top-0 shadow-md z-50  isolate ",
  content: " flex justify-between flex-1 gap-10 ",
  logoContainer: "flex items-center flex-start",
  logo: " cursor-pointer object-contain",
  bannerNav: "flex cursor-pointer items-center space-x-8 ",
  accentedButton: "hidden md:flex bg-black text-white py-2 px-4 rounded-full",
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
          <div className="hidden md:flex">Our story</div>
          <div className="hidden md:flex">Membership</div>

          {currentUser && (
            <Link href="/?addNew=1" passHref>
              <div className={styles.accentedButton}>Write</div>
            </Link>
          )}

          {currentUser && (
            <div className={styles.accentedButton} onClick={handleSignOut}>
              SignOut
            </div>
          )}
          {!currentUser && (
            <div
              className="border-2 border-black px-4 py-1 rounded-full sm:text-2xl md:text-xl hover:bg-yellow-400"
              onClick={handleAuth}
            >
              Sign In
            </div>
          )}
          <div className={styles.accentedButton}>Get Started</div>
        </div>
      </div>
      <Modal
        className=""
        isOpen={Boolean(router.query.addNew)}
        onRequestClose={() => router.push("/")}
        style={customStyles}
      >
        <PostModal></PostModal>
      </Modal>
    </div>
  );
}
