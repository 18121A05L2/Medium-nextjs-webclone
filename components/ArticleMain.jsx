import React from 'react'
import Image from "next/image";
import Lucky from "../static/qazi.jpg";
import Banner from "../static/banner.png"

export default function ArticleMain() {
  return (
    <div className="flex flex-col gap-4 flex-1 justify-center border-2 p-5">
      <div className="flex items-center">
        <Image
          className="rounded-full"
          src={Lucky}
          alt="lucky"
          height="100"
          width="100"
              ></Image>
              <h2>Lucky</h2>
      </div>
      <Image src={Banner} alt="banner" height="300" />
      <div>7 Free Tools That Will Make You More Productive </div>
      <div> Lucky , June 15, 2022</div>
      <div>Brief:Productivity is a skill that can be learned</div>
      <div>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industrys standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum.
      </div>
    </div>
  );
}
