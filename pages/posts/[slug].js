import React, { useContext, useEffect, useState } from "react";
import ArticleMain from "../../components/ArticleMain";
import ReadersNav from "../../components/Readersnav";
import Recomondations from "../../components/Recomondations";
import { MediumContext } from "../../context/MediumContext";
import { useRouter } from "next/router";

export default function Post() {
  const { posts, users } = useContext(MediumContext);
  const [post, setPost] = useState();
  const [author, setAuthor] = useState();
  const router = useRouter();

  useEffect(() => {
    if (!posts || !users) {
      return;
    } else {
      setPost(posts.find((item) => item.id === router.query.slug));
      // console.log(post,"✅")
      post && setAuthor(users.find((user) => user.id === post.data.author));
    }
  }, [posts, users, post, author,router.query.slug]);
  // console.log(post,author)

  return (
    <div className="flex">
      <ReadersNav />
      <ArticleMain post={post} author={author} />
      <Recomondations />
    </div>
  );
}
