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
    "border-2 border-[#787878] w-64 outline-none focus:ring-2 focus:border-none focus:p-[2px] ring-indigo-400 rounded-lg text-blue-500 px-2 focus:px-2  ",
  feild: "flex w-[30rem] text-[1.23rem] justify-between",
};

export default function PostModal() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { currentUser } = useContext(MediumContext);
  const router = useRouter();
  console.log(errors.length, "❤️‍🔥");

  const [addData, setAddData] = useState({
    title: "",
    brief: "",
    category: "",
    postLength: "",
    bannerImage: "",
    body: "",
    postedOn: serverTimestamp(),
    author: currentUser?.email,
    userImage: currentUser?.image,
    name: currentUser?.name,
  });

  function handleUploadingImage(handleStorage, getUrl) {
    return getUrl;
  }

  const addPostToFirebase = async (event) => {
    const imageUrl = await handleUploadingImage();
    addData.title && addData.brief && addData.category && addData.postLength && addData.bannerImage && addData.body && currentUser
      (await addDoc(
        collection(db, "articles"),
        imageUrl ? { ...addData, bannerImage: imageUrl } : addData
      ));
    // event.preventDefault();
  };

  return (
    <div className=" w-[35rem] h-[32rem]  xl:w-[50rem] xl:h-[40rem] flex flex-col items-center gap-2 bg-[#F7A76C] p-2">
      <h1 className="font-bold text-[2rem]">Upload a Post</h1>
      <form
        onSubmit={handleSubmit(() => {
          router.push("/");
        })}
      >
        <div className={styles.feild}>
          Title
          <input
            {...register("title", { required: "title," })}
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
            {...register("brief", { required: "brief," })}
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
            {...register("image", { required: "image," })}
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
        {/* <UploadingImage handleUploadingImage={handleUploadingImage} /> */}
        <div className={styles.feild}>
          Category{" "}
          <input
            {...register("category", { required: "category," })}
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
            {...register("estimatedTime", { required: "estimatedTime," })}
            className={styles.input}
            type="number"
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
            {...register("Text", { required: "Text," })}
            className={styles.input}
            type="text"
            rows={5}
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

        {errors && (
          <p className="text-red-600 text-[1.2rem]">
            {errors.title?.message}
            {errors.brief?.message}
            {errors.image?.message} {errors.category?.message}
            {errors.estimatedTime?.message}
            {errors.text?.message}
            {/* feilds are required */}
          </p>
        )}

        <div className="flex justify-center m-2">
          <button
            className="font-bold text-[1.2rem] bg-black text-white px-5 py-1 rounded-full hover:scale-110 active:opacity-80"
            type="submit"
            onClick={addPostToFirebase}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
