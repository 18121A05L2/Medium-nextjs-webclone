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
  icons: "flex flex-col justify-center gap-[2rem] items-center flex-1 text-2xl",
};

export default function Readersnav() {
  return (
    <div className=" cusrsor-pointer w-[5rem] h-screen flex flex-col ">
      <Link href={`/`}>
        <Image src={SmallLogo} alt="Logo"></Image>
      </Link>
      <div className={styles.icons}>
        <HiOutlineHome />
        <FiBell />
        <BiBookmarks />
        <RiArticleLine className="border-b"/>
        <BsPencilSquare />
          </div>
          <Image className="rounded-full object-contain" src={Lucky} alt="Lucky" ></Image>
    </div>
  );
}
