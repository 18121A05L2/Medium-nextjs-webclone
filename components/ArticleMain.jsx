import React,{useState} from "react";
import Image from "next/image";
import Lucky from "../static/qazi.jpg";
import Banner from "../static/banner.png";
import { useContext } from "react";
import { MediumContext } from "../context/MediumContext";
import { useForm } from "react-hook-form";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { useRouter } from "next/router";

export default function ArticleMain() {
  const [commented, setCommented] = useState(false);
  console.log(commented);
  const { posts } = useContext(MediumContext);
  const router = useRouter();
  const post = posts?.filter((post) => post.id === router.query.slug)[0];
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  console.log(errors);
  // console.log(post.data.bannerImage, "❤️‍🔥");

  return (
    <div className="flex flex-col gap-4 flex-1 justify-center border-2 p-5 ml-[5rem] text-[1.1rem] h-full mb-[10rem] max-h-[200rem]">
      <div className="flex items-center gap-4">
        <Image
          className="rounded-full"
          src={Lucky}
          alt="lucky"
          height="100"
          width="100"
        ></Image>
        <h2 className="font-bold text-3xl ">{post && post.data?.name}</h2>
      </div>
      <div>
        <Image
          className="rounded-lg"
          src={(post && post.data?.bannerImage) }
          alt="banner"
          height="300"
          width="500"
        />
        <div className="text-3xl font-bold">{post && post.data?.title} </div>
        <div className="">
          {" "}
          Author : {post && post.data?.name} ,{" "}
          {post &&
            new Date(post.data?.postedOn).toLocaleString("en-US", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
        </div>
        <div>Brief:{post && post.data?.brief}</div>
        <div>{post && post.data?.body}</div>
      </div>
      <hr className="border border-yellow-500" />

      {/* ------------------------------- COMMENTS ------------------------------------ */}

      <form
        className=" flex flex-col"
        onSubmit={handleSubmit(async (dataa) => {
          errors.length || setCommented(true);
          await addDoc(collection(db, "comments"), dataa);
          dataa = {};
        })}
      >
        {!commented ? (
          <div>
            <h3 className="text-yellow-600 t">Enjoyed this article?</h3>
            <h1>Leave a comment below</h1>
            <label>
              <span>Name</span>
              <input
                {...register("name", { required: "-name field is required" })}
                className="shadow border form-input block w-full lg:w-1/3  focus:ring-2 focus:ring-yellow-400 outline-none "
                type="text"
              ></input>
            </label>
            <label>
              <span>Email</span>
              <input
                {...register("email", { required: "-email is required" })}
                className="shadow border form-input block w-full lg:w-1/3 focus:ring-2 focus:ring-yellow-400 outline-none "
                type="email"
              ></input>
            </label>
            <label>
              <span>Comments</span>
              <textarea
                {...register("comments", { required: "-coomment is required" })}
                className="shadow border form-input block w-full lg:w-1/2 focus:ring-2 focus:ring-yellow-400 outline-none p-1"
                type="text"
                rows={8}
              ></textarea>
            </label>
            <div className="p-2 text-red-400">
              <p>{errors.name?.message}</p>
              <p>{errors.email?.message}</p>
              <p>{errors.comments?.message}</p>
            </div>
            <button
              type="submit"
              className="bg-yellow-500 hover:bg-yellow-400 lg:w-1/3"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        ) : (
          <div className="flex bg-yellow-300 p-10 items-center justify-center max-w-[50rem] text-2xl font-semibold">
            Thank You For Commenting
          </div>
        )}
      </form>
    </div>
  );
}
