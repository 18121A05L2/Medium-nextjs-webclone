import React from "react";
import Image from "next/image"
import Logo from "../static/banner.png"

const styles = {
    accentedButton: "bg-black text-white py-2 px-4 rounded-full",
    content:"flex flex-1 justify-between items-center bg-[#FCC017] h-max-[10rem] border-y border-black px-10 py-2"
};
export default function Banner() {
    return (
      <div className={styles.content}>
        <div className="space-y-5">
          <h2 className="max-w-xl text-[3rem] md:text-[4.3rem] lg:text-[6rem] font-mediumSerief">
            Stay Curious
          </h2>
          <h3 className="text-[1.2rem] md:text-[2rem]">
            Discover stories,thinking and expertise from writers on any topic.{" "}
          </h3>
          <button className={styles.accentedButton}>Start Reading</button>
            </div>
            <Image className="object-contain h-32 flex-1" src={Logo} alt ="Logo" width="500" height="400"></Image>
      </div>
    );
}
