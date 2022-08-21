import { createContext, useEffect, useState } from "react";
import { collection, getDocs, setDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import MyApp from "../pages/_app";

const MediumContext = createContext();

const MediumProvider = ({ children }) => {
  const [users, setUsers] = useState();
  const [posts, setPosts] = useState();

  useEffect(() => {
    const getUsers = async () => {
      const querySnapshot = await getDocs(collection(db, "users"));
      setUsers(
        querySnapshot.docs.map((doc) => {
          return {
            id: doc.id,
            data: {
              ...doc.data(),
            },
          };
        })
      );
    };
    getUsers();
  }, []);

  useEffect(() => {
    const getPosts = async () => {
      const querySnapshot = await getDocs(collection(db, "articles"));
      setPosts(
        querySnapshot.docs.map((doc) => {
          return {
            id: doc.id,
            data: {
              author: doc.data().author,
              body: doc.data().body,
              brief: doc.data().brief,
              category: doc.data().category,
              postLength: doc.data().postLength,
              title: doc.data().title,
              postedOn: doc.data().postedOn.toDate(),
              bannerImage:doc.data().bannerImage
              
            },
          };
        })
      );
    };
    getPosts();
  }, []);

  return (
    <MediumContext.Provider value={{ posts, users }}>
      {children}
    </MediumContext.Provider>
  );
};

export { MediumContext, MediumProvider };
