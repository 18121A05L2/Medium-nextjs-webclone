import React from 'react'
import Image from "next/image";
import Logo from "../static/cp.png"

const styles = {
    authorContainer: "",
    authorImageContainer: "",
    authorImage:"",
    postDetails:"",
}

export default function PostCard() {
  return (
      <div>
          <Image className={styles.authorImage} src={Logo} alt="logo" width="50" height="50"/>
          
          
      
      
      
      </div>
  )
}
