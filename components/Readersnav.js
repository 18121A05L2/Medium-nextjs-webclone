import React from "react";
import Image from "next/image";
import Link from "next/link";
import SmallLogo from "../static/smallLogo.png";
import { HiOutlineHome } from "react-icons/hi";
import { FiBell } from "react-icons/fi";
import { BiBookmarks } from "react-icons/bi";
import { RiArticleLine } from "react-icons/ri";
import { BsPencilSquare } from "react-icons/bs";
import Lucky from "../static/qazi.jpg";

const styles = {
  iconsdiv: "flex flex-col justify-center gap-[0.7rem] items-center flex-1 text-3xl",
  icon:" hover:bg-slate-200 hover:rounded-xl w-full h-16 p-4 active:text-blue-500 hover:transition ease-in-out hover:duration-500 "
};

export default function Readersnav() {
  return (
    <div className=" cusrsor-pointer w-[5rem] h-screen flex flex-col bg-yellow-400 fixed left-0 top-0 bottom-0 isolate ">
      <Link href={`/`}>
        <Image src={SmallLogo} alt="Logo"></Image>
      </Link>
      <div className={styles.iconsdiv}>
        <HiOutlineHome className={styles.icon} />
        <FiBell className={styles.icon} />
        <BiBookmarks className={styles.icon} />
        <RiArticleLine className={styles.icon} />
        <BsPencilSquare className={styles.icon} />
      </div>
      <Image
        className="rounded-full object-contain"
        src={Lucky}
        alt="Lucky"
      ></Image>
    </div>
  );
}
