import React, { useEffect, useState } from "react";
import Image from "next/image";
import Logo from "../static/cp.png";
import Tutorial from "../static/logo.png";
import { FiBookmark } from "react-icons/fi";
import Link from "next/link";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

const styles = {
  container:
    "flex justify-between my-3 mx-10 max-w-[45rem] cursor-pointer border-2 hover:border-4 hover:border-blue-600 hover:p-[6px] border-blue-300 rounded-[1rem] p-2 bg-indigo-100",
  left: "p-2",
  right: "flex",
  top: "flex items-center",
  middle: "",
  bottom: " text-[.9rem] my-1",
};

export default function PostCard({ post, currentUser }) {
  // const [authorData, setAuthorData] = useState();
  // author = post.data.author;

  // useEffect(() => {
  //   const getAuthorData = async () => {
  //     setAuthorData((await getDoc(doc(db, "users", post.data.author))).data());
  //   };
  //   getAuthorData();
  // }, [post]);
  // console.log(post.data.image)
  // console.log(
  //   new Date(post.data.postedOn.seconds).toLocaleString("en-US", {
  //     timeZone: "Asia/Jakarta",
  //   })
  // );
  console.log(post.data.userImage)

  return (
    <Link href={`/posts/${post.id}`} passHref>
      <div className={styles.container}>
        <div className={styles.left}>
          <div className={styles.top}>
            <Image
              className="rounded-full  "
              src={post.data.userImage || Logo}
              alt="logo"
              width="50"
              height="50"
            />
            <h2 className="font-bold text-[1.5rem] text-orange-300 px-4">
              {post.data.name}
            </h2>
          </div>
          <div className={styles.middle}>
            <h1 className="font-bold text-2xl">{post.data.title}</h1>
            <p className="text-[#787878]">{post.data.brief}</p>
          </div>
          <div className={styles.bottom}>
            <span>
              {new Date(post.data.postedOn).toLocaleString("en-US")}{" "}
              . {post.data.postLength} min read .{" "}
              <span className="bg-blue-300 p-1 px-3 rounded-full">
                {post.data.category}
              </span>{" "}
            </span>
          </div>
        </div>
        <div className={styles.right}>
          <FiBookmark className="h-8 w-8 mt-auto mx-3 cursor-pointer" />
          <Image
            className="object-cover border border-black rounded-[1rem] "
            src={post.data.bannerImage}
            alt="Tutorial"
            width="250"
            height="100"
          ></Image>
        </div>
      </div>
    </Link>
  );
}
