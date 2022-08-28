import Banner from "../components/Banner";
import Header from "../components/Header";
import PostCard from "../components/PostCard";
import { useContext } from "react";
import { MediumContext } from "../context/MediumContext";
import { db, auth, provider } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { FcGoogle } from "react-icons/fc";
import { useCollection } from "react-firebase-hooks/firestore";

var currentUserEmail;
export default function Home({ staticPosts }) {
  const { handleAuth, currentUser } = useContext(MediumContext);
  const posts = staticPosts;
  var currentUserPosts;
  currentUser &&
    (currentUserPosts = posts.filter(
      (post) =>
        post.data.author.toLowerCase() === currentUser.email.toLowerCase()
    ));
  // console.log(currentUserPosts, "❤️‍🔥");
  // const [realtimePosts] = useCollection(collection(db,"articles"))
  // const posts = realtimePosts?.docs

  currentUser && (currentUserEmail = currentUser.email);

  return (
    <div className="bg-gray-600 scrollbar-hide">
      <Header />
      <Banner />
      <div className="flex ">
        <div className="w-1/2">
          {!currentUser ? (
            <div className="flex justify-center items-center text-[2rem] mt-[10rem]  ">
              <span
                onClick={handleAuth}
                className=" border flex items-center min-h-min rounded-full px-[3rem] cursor-pointer hover:bg-slate-500 gap-x-2"
              >
                Sign with <FcGoogle />
              </span>
            </div>
          ) : !currentUser ? (
            <div className="flex flex-col items-center pt-[10rem] text-[2rem]">
              <span>You Haven{"'"}t Posted Anything</span>
              <span>Please use the write button at Top Right </span>
            </div>
          ) : (
            <div className=" flex flex-col  pt-4 items-center border-l border-yellow-500 ">
              <h1 className="font-bold text-[1.7rem] text-yellow-500 ">
                {currentUser.name.toUpperCase()+"'s"} Posts
              </h1>
              <div className="flex flex-col-reverse">
                {!posts ? (
                  <div>Loading</div>
                ) : (
                  currentUserPosts.map((post) => {
                    return (
                      <PostCard
                        post={post}
                        currentUser={currentUser}
                        key={post.id}
                      />
                    );
                  })
                )}
              </div>
            </div>
          )}
        </div>

        <div className=" flex flex-col w-1/2  pt-4 items-center border-l border-yellow-500 ">
          <h1 className="font-bold text-[1.7rem] text-yellow-500 ">
            All Users Posts
          </h1>
          <div className="flex flex-col-reverse">
            {!posts ? (
              <div>Loading</div>
            ) : (
              posts.map((post) => {
                return (
                  <PostCard
                    post={post}
                    currentUser={currentUser}
                    key={post.id}
                  />
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// export async function getStaticPaths() {
//   const querySnapshot = await getDocs(collection(db, "articles"));
//   const paths = querySnapshot.docs.map((doc) => {
//     return {
//       params: { slug: doc.id },
//     };
//   });
//   console.log(paths);

//   return {
//     paths,
//     fallback: false,
//   };
// }

export async function getServerSideProps() {
  const querySnapshot = await getDocs(collection(db, "articles"));
  let staticPosts = querySnapshot.docs.map((doc) => {
    return {
      id: doc.id,
      data: {
        ...doc.data(),
      },
    };
  });

  if (currentUserEmail) {
    staticPosts = staticPosts.filter(
      (doc) => doc.data.author.toLowerCase() == currentUserEmail.toLowerCase()
    );
  }

  return {
    props: {
      staticPosts: JSON.parse(JSON.stringify(staticPosts)),
    },
  };
}
