import React from "react";
import Image from "next/image";
import { AiOutlineSearch } from "react-icons/ai";
import { MdMarkEmailUnread } from "react-icons/md";
import ReplitLogo from "../static/replit.png";
import TutorialImg from "../static/tutorial.jpg";
import CpLogo from "../static/cp.png";
import Quazi from "../static/qazi.jpg";
import JsLogo from "../static/jsLogo.png";

export default function Recomondations() {
  return (
    <div className=" flex flex-col gap-6 w-[20rem] p-4">
      <button className="bg-black text-white py-2 px-5 rounded-full text-[1.5rem]">
        Get UnLimited Access
      </button>
      <div className="flex border rounded-full px-[1rem] py-3 gap-[1rem] items-center">
        <AiOutlineSearch />
        <input
          type="text"
          className="outline-none"
          placeholder="Search"
        ></input>
      </div>
      <Image
        className=" object-contain rounded-full "
        src={Quazi}
              alt="logo"
              width="100"
              height="100"
      />
      <div>Lucky</div>
      <div>1M Followers</div>
      <div>Follow</div>
      <div>
        <MdMarkEmailUnread />
      </div>
      <div>More from medium</div>
      <div>
        <div>content</div>
        <div>content</div>
        <div>content</div>
      </div>
    </div>
  );
}
