import React, { useContext, useEffect, useState } from "react";
import ArticleMain from "../../components/ArticleMain";
import ReadersNav from "../../components/Readersnav";
import Recomondations from "../../components/Recomondations";

export default function Post() {
  // useEffect(() => {
  //   if (!posts || !users) {
  //     return;
  //   } else {
  //     setPost(posts.find((item) => item.id === router.query.slug));
  //     post && setAuthor(users.find((user) => user.id === post.data.author));
  //   }
  // }, [posts, users, post, author,router.query.slug]);

  return (
    <div className="flex bg-gray-100 h-100%">
      <ReadersNav />
      <ArticleMain />
      <Recomondations />
    </div>
  );
}
