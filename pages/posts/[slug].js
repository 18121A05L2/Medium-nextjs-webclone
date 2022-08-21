import React, { useContext, useEffect, useState } from 'react'
import ArticleMain from '../../components/ArticleMain'
import ReadersNav from "../../components/Readersnav"
import Recomondations from '../../components/Recomondations'
import { MediumContext } from '../../context/MediumContext'
import {useRouter} from "next/router"
import { AuthErrorCodes } from 'firebase/auth'

export default function Post() {
  const { posts, users } = useContext(MediumContext)
  const [post, setPost] = useState();
  const [Author , setAuthor] = useState();
  const router = useRouter();
  console.log(post);
  useEffect(() => {
    posts &&
    setPost(posts.find(post => posts.id === router.query.slug))
  },[])
  return (
    <div className="flex">
      <ReadersNav />
      <ArticleMain  />
      <Recomondations/>
    
    </div>
  )
}
