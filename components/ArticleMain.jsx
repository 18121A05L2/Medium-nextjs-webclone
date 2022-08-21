import React from 'react'
import Image from "next/image";
import Lucky from "../static/qazi.jpg";
import Banner from "../static/banner.png"

export default function ArticleMain({post,author}) {
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
        <h2>{author && author.data.name}</h2>
      </div>
      <Image src={Banner} alt="banner" height="300" />
      <div>{post && post.data.title} </div>
      <div> {author && author.data.name} , { post && new Date(post.data.postedOn).toLocaleString("en-US",{
        day: "numeric",
        month: "short",
        year :"numeric"
      })}</div>
      <div>Brief:{ post && post.data.brief}</div>
      <div>
        {post && post.data.body}
      </div>
    </div>
  );
}
