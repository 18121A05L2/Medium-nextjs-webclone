import React, { useEffect, useState } from 'react'
import Image from "next/image";
import Logo from "../static/cp.png"
import Tutorial from "../static/logo.png";
import { FiBookmark } from "react-icons/fi";
import Link from 'next/link';
import { doc, getDoc } from 'firebase/firestore';
import {db} from "../firebase"

const styles = {
    container: "flex py-2 px-10 max-w-[45rem] cursor-pointer ",
    left: "p-2",
    right:"flex p-2",
    top: "flex items-center",
    middle: "",
    bottom:" text-[.9rem] my-1"
}

export default function PostCard({ post }) {
  const [authorData , setAuthorData ] = useState()
  
  useEffect(() => {
    const getAuthorData = async () => {
      setAuthorData(
      (await getDoc(doc(db,"users",post.data.author))).data() )
    }
    getAuthorData()
      
    },[post])
    
    return (
      <Link href={`/posts/${post.id}`}>
        <div className={styles.container}>
          <div className={styles.left}>
            <div className={styles.top}>
              <Image
                className=""
                src={Logo}
                alt="logo"
                width="50"
                height="50"
              />
              <h2 className="font-semibold px-4">{authorData && authorData.name}</h2>
            </div>
            <div className={styles.middle}>
              <h1 className="font-bold text-2xl">{post.data.title}</h1>
              <p className="text-[#787878]">{post.data.brief}</p>
            </div>
            <div className={styles.bottom}>
              <span>
                {new Date(post.data.postedOn).toLocaleString("en-US", {
                  day: "numeric",
                  month:"short"
                })} . {post.data.postLength} min read .{" "}
                <span className="bg-[#F2F2F2] p-1 px-3 rounded-full">
                  {post.data.category}
                </span>{" "}
              </span>
            </div>
          </div>
          <div className={styles.right}>
            <FiBookmark className="h-10 w-10 mt-auto mx-2 cursor-pointer" />
            <Image
              src={post.data.bannerImage}
              alt="Tutorial"
              width="200"
              height="100"
            ></Image>
          </div>
        </div>
      </Link>
    );
}
