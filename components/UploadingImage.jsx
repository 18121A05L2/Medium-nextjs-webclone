import React, { useState } from "react";
import { storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export default function UploadingImage({handleUploadingImage}) {
  const [data, setData] = useState();
  async function handleStorage() {
    const storageRef = ref(storage, `images/${data.name}`);
    const uploadTask = uploadBytesResumable(storageRef, data);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
        });
      }
    );
    }
    handleUploadingImage(handleStorage)

  return (
    <div className="flex w-[30rem] text-[1.23rem] ">
      <span className="whitespace-nowrap mr-[5.7rem]">Upload from pc</span>
      <input
        className=""
        type="file"
        onChange={(e) => setData(e.target.files[0])}
      ></input>
      <button
        className=" hidden font-bold text-[1.2rem] bg-black text-white px-5 py-1 rounded-full"
        type="submit"
        onClick={handleStorage}
      >
        {/*getUrl*/}
      </button>
    </div>
  );
}
