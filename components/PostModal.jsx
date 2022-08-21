import React from "react";
import { MediumContext } from "../context/MediumContext";
import { useState, useContext } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { useRouter } from "next/router";

const styles = {
  input: "border-2 border-[#787878] w-60",
};

export default function PostModal() {
  const { currentUser } = useContext(MediumContext);
  const router = useRouter();

  const [addData, setAddData] = useState({
    title: "",
    brief: "",
    category: "",
    postLength: "",
    bannerImage: "",
    body: "",
    postedOn: serverTimestamp(),
    author: currentUser && currentUser.email,
  });

  const addPostToFirebase = async (event) => {
    router.push("/");
    await addDoc(collection(db, "articles"), addData);
    event.preventDefault();
  };

  return (
    <div className="w-[50rem] h-[40rem] flex flex-col items-center gap-2">
      <h1 className="font-bold text-[2rem]">Upload a Post</h1>
      Title
      <input
        className={styles.input}
        type="text"
        value={addData.title}
        onChange={(event) => {
          setAddData((previousData) => {
            return {
              ...previousData,
              title: event.target.value,
            };
          });
        }}
      ></input>
      Brief
      <input
        className={styles.input}
        type="text"
        value={addData.brief}
        onChange={(event) => {
          setAddData((previousData) => {
            return {
              ...previousData,
              brief: event.target.value,
            };
          });
        }}
      ></input>
      Banner Image Url
      <input
        className={styles.input}
        type="text"
        value={addData.bannerImage}
        onChange={(event) => {
          setAddData((previousData) => {
            return {
              ...previousData,
              bannerImage: event.target.value,
            };
          });
        }}
      ></input>
      Category{" "}
      <input
        className={styles.input}
        type="text"
        value={addData.category}
        onChange={(event) => {
          setAddData((previousData) => {
            return {
              ...previousData,
              category: event.target.value,
            };
          });
        }}
      ></input>
      Estimated Read Length (in minutes)
      <input
        className={styles.input}
        type="text"
        onChange={(event) => {
          setAddData((previousData) => {
            return {
              ...previousData,
              postLength: event.target.value,
            };
          });
        }}
      ></input>
      Article Text
      <textarea
        className={styles.input}
        type="text"
        rows={6}
        value={addData.body}
        onChange={(event) => {
          setAddData((previousData) => {
            return {
              ...previousData,
              body: event.target.value,
            };
          });
        }}
      ></textarea>
      <button
        className="font-bold text-[1.2rem] bg-black text-white px-5 py-1 rounded-full"
        type="submit"
        onClick={addPostToFirebase}
      >
        Submit
      </button>
    </div>
  );
}
