import Banner from "../components/Banner";
import Header from "../components/Header";
import PostCard from "../components/PostCard";
import { useContext } from "react";
import { MediumContext  } from "../context/MediumContext";
import { db, auth, provider } from "../firebase";
import { collection, getDocs,getDoc, setDoc, doc } from "firebase/firestore";
import { FcGoogle } from "react-icons/fc";

var currentUserEmail;
export default function Home({ staticPosts }) {
  
  const { handleAuth, currentUser } = useContext(MediumContext);
  const posts = staticPosts;
  currentUser && (currentUserEmail = currentUser.email)


  return (
    <div className="">
      <Header />
      <Banner />
      <div>
        {currentUser ? (
          <div className=" flex flex-col sm:grid-cols-2 lg:grid-cols-3">
            {!posts ? (
              <div>Loading</div>
            ) : (
              posts.map((post) => {
                return <PostCard post={post} currentUser={currentUser} key={post.id} />;
              })
            )}
          </div>
        ) : (
          <div className="flex justify-center items-center text-[2rem] mt-[10rem]  ">
            <span onClick={handleAuth} className=" border flex items-center min-h-min rounded-full px-[3rem] cursor-pointer">
              Sign with <FcGoogle />
            </span>
          </div>
        )}
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
  let staticPosts = querySnapshot.docs
    .map((doc) => {
      return {
        id: doc.id,
        data: {
          ...doc.data(),
        },
      };
    })

  if (currentUserEmail) {
      staticPosts = staticPosts.filter(
        (doc) =>
          doc.data.author.toLowerCase() == currentUserEmail.toLowerCase()
      );
    }
  

  return {
    props: {
      staticPosts: JSON.parse(JSON.stringify(staticPosts)),

    },
  };
}
