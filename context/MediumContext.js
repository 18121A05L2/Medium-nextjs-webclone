import { createContext, useEffect, useState } from "react";
import { collection, getDocs, setDoc, doc } from "firebase/firestore";
import { db, auth, provider } from "../firebase";
import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import useSWR from "swr";

const MediumContext = createContext();

const MediumProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();

  const fetcher = async () => {
    const querySnapshot = await getDocs(collection(db, "articles"));
    return querySnapshot.docs.map((doc) => {
      return {
        id: doc.id,
        data: {
          author: doc.data().author,
          body: doc.data().body,
          brief: doc.data().brief,
          category: doc.data().category,
          postLength: doc.data().postLength,
          title: doc.data().title,
          postedOn: doc.data().postedOn,
          bannerImage: doc.data().bannerImage,
          image: doc.data().userImage,
          name: doc.data().name,
        },
      };
    });
  };

  const { data: posts, error } = useSWR("posts", fetcher);


  const handleAuth = async () => {
    const userData = await signInWithPopup(auth, provider);
    const user = userData.user;
    setCurrentUser({
      email: user.email,
      name: user.displayName,
      image: user.photoURL,
      followerCount: 0,
    });
    addUserToFirebase(user);
  };

  const addUserToFirebase = async (user) => {
    await setDoc(doc(db, "users", user.email), {
      email: user.email,
      name: user.displayName,
      image: user.photoURL,
      followerCount: 0,
    });
  };

  const handleSignOut = async () => {
    await signOut(auth);
    setCurrentUser(null);
  };

  return (
    <MediumContext.Provider
      value={{ posts, handleAuth, currentUser, handleSignOut }}
    >
      {children}
    </MediumContext.Provider>
  );
};

export { MediumContext, MediumProvider };
