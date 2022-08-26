import React from "react";
import { MediumContext } from "../context/MediumContext";
import { useState, useContext } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { useRouter } from "next/router";
import UploadingImage from "./UploadingImage";
import { useForm } from "react-hook-form";

const styles = {
  input:
    "border-2 border-[#787878] w-64 outline-none focus:ring-2 focus:border-none focus:p-[2px] ring-indigo-400 ",
  feild: "flex w-[30rem] text-[1.23rem] justify-between",
};

export default function PostModal() {
  const { register } = useForm();
  const { currentUser } = useContext(MediumContext);
  const router = useRouter();

  function handleUploadingImage(handleStorage){

  }

  const [addData, setAddData] = useState({
    title: "",
    brief: "",
    category: "",
    postLength: "",
    bannerImage: "",
    body: "",
    postedOn: serverTimestamp(),
    author: currentUser?.email,
    useImage: currentUser?.image,
  });

  const addPostToFirebase = async (event) => {
    router.push("/");
    await addDoc(collection(db, "articles"), addData);
    event.preventDefault();
  };

  return (
    <div className="w-[50rem] h-[40rem] flex flex-col items-center gap-2 bg-[#F7A76C] p-2 ">
      <h1 className="font-bold text-[2rem]">Upload a Post</h1>
      <div className={styles.feild}>
        Title
        <input
          {...register("Title", { required: true })}
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
      </div>
      <div className={styles.feild}>
        Brief
        <input
          {...register("Brief", { required: true })}
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
      </div>
      <div className={styles.feild}>
        Banner Image Url ( or )
        <input
          {...register("Image", { required: true })}
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
      </div>
      <UploadingImage handleUploadingImage={handleUploadingImage} />
      <div className={styles.feild}>
        Category{" "}
        <input
          {...register("category", { required: true })}
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
      </div>
      <div className={styles.feild}>
        Estimated Read Time
        <input
          {...register("Estimated Time", { required: true })}
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
      </div>
      <div className={styles.feild}>
        Article Text
        <textarea
          {...register("Text", { required: true })}
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
      </div>

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
