import Banner from "../components/Banner";
import Header from "../components/Header";
import PostCard from "../components/PostCard";
import { useContext } from "react";
import { MediumContext } from "../context/MediumContext";

export default function Home() {
  const { posts, users } = useContext(MediumContext);


  return (
    <>
      <Header />
      <Banner />
      <div className=" flex flex-col sm:grid-cols-2 lg:grid-cols-3">
        {!posts ? (
          <div>Loading</div>
        ) : (
            posts.map((post) => {
  
            return <PostCard post={post} key={post.id} />;
          })
        )}
      </div>
    </>
  );
}
