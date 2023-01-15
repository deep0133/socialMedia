import React, { useState, useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { UploadNewPost } from "../Redux/Action/Post";
import Loader from "./loader/Loader";
export default function UploadPost() {
  const { uploadPostLoader, uploadPostMessage, uploadPostError } = useSelector(
    (state) => state.postAction
  );
  const dispatch = useDispatch();

  const alert = useAlert();
  const [caption, setCaption] = useState("");

  useEffect(() => {
    if (uploadPostMessage) {
      alert.success(uploadPostMessage);
      dispatch({ type: "ClearUploadMessage" });
    }
    if (uploadPostError) {
      alert.error(uploadPostError);
      dispatch({ type: "ClearUploadError" });
    }
  }, [uploadPostError, uploadPostMessage, dispatch, alert]);

  const uploadOnChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImage(reader.result);
      }
    };
  };

  const uploadHandler = (e) => {
    e.preventDefault();
    console.log("submit post");
    dispatch(UploadNewPost(localStorage.getItem("token"), image, caption));
  };

  const [image, setImage] = useState(null);
  return (
    <>
      <div
        className="imag flex h-[92vh] w-full items-center justify-center bg-cover bg-center "
        style={{
          background: `linear-gradient(to right, rgb(238, 119, 36), rgb(216, 54, 58), rgb(221, 54, 117), rgb(180, 69, 147))`,
        }}>
        <div className="mx-auto max-w-[90%] bg-cover bg-center sm:max-w-lg">
          <form
            className="rounded-lg bg-white p-6 shadow-md"
            onSubmit={uploadHandler}>
            <h2 className="mb-4 text-lg font-medium">Create a new post</h2>
            <textarea
              className="mb-3 w-full rounded-lg bg-gray-200 py-2 px-3"
              placeholder="Write your post here"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}></textarea>

            <label
              type="button"
              className="mr-2 rounded-lg bg-blue-500 py-2 px-4 text-white hover:cursor-pointer hover:bg-blue-600">
              <input
                type="file"
                className="hidden w-full"
                accept="image/*"
                onChange={uploadOnChange}
              />
              Select Post
            </label>
            <button
              disabled={uploadPostLoader}
              type="submit"
              className="mt-3 rounded-lg bg-green-500 py-2 px-4 text-white hover:bg-green-600 sm:float-right sm:mt-0">
              {uploadPostLoader ? "Uploading..." : "Upload Post"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
