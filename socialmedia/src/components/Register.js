import { Avatar } from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { RegisterRequest } from "../Redux/Action/User";
import Loader from "./loader/Loader";
import FullPageLoader from "./loader/FullPageLoader";

export default function Login() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState(null);
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const alert = useAlert();
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

  const { loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: "ClearUserError" });
    }
  }, [alert, dispatch, error]);

  const registerHandler = (e) => {
    e.preventDefault();
    console.log("register form submitted");
    dispatch(RegisterRequest(name, email, image, password));
  };
  return (
    <>
      {loading === true ? (
        <FullPageLoader />
      ) : (
        <section className="gradient-form min-h-screen bg-gray-200">
          <div className="container mx-auto p-5">
            <div className="g-6 flex h-full flex-wrap items-center justify-center text-gray-800">
              <div className="xl:w-10/12">
                <div className="block rounded-lg bg-white shadow-lg">
                  <div className="g-0 lg:flex lg:flex-wrap">
                    <div className="px-4 md:px-0 lg:w-6/12">
                      <div className="md:mx-6 md:p-12">
                        <div className="text-center">
                          <h4 className="mt-1 mb-3 pb-1 text-xl font-semibold">
                            Social Media
                          </h4>
                        </div>
                        <div className="avatar mb-2 flex justify-center">
                          <Avatar
                            src={image}
                            style={{ height: "80px", width: "80px" }}
                          />
                        </div>
                        <form onSubmit={registerHandler}>
                          <div className="mb-4 flex items-center justify-center">
                            <label
                              className="flex w-24 items-center justify-center rounded-full border-2 py-1 font-[500] text-gray-300 hover:cursor-pointer "
                              style={{
                                background: `linear-gradient(to right, rgb(238, 119, 36), rgb(216, 54, 58),  rgb(221, 54, 117), rgb(180, 69, 147))`,
                              }}>
                              <input
                                type="file"
                                className="hidden"
                                onChange={uploadOnChange}
                              />
                              Select
                            </label>
                          </div>
                          <div className="mb-4">
                            <input
                              type="text"
                              className="form-control m-0 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none"
                              placeholder="Name"
                              value={name}
                              onChange={(e) => {
                                setName(e.target.value);
                              }}
                              required
                            />
                          </div>
                          <div className="mb-4">
                            <input
                              type="email"
                              className="form-control m-0 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none"
                              placeholder="Email"
                              value={email}
                              onChange={(e) => {
                                setEmail(e.target.value);
                              }}
                              required
                            />
                          </div>
                          <div className="mb-4">
                            <input
                              type="password"
                              className="form-control m-0 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none"
                              placeholder="Password"
                              value={password}
                              onChange={(e) => {
                                setPassword(e.target.value);
                              }}
                              required
                            />
                          </div>
                          <div className="mb-12 pt-1 pb-1 text-center">
                            <button
                              className="mb-3 inline-block w-full rounded px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-blue-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg"
                              type="submit"
                              style={{
                                background: `linear-gradient( to right, #ee7724, #d8363a, #dd3675, #b44593)`,
                              }}>
                              {loading ? <Loader /> : "Register"}
                            </button>
                          </div>
                          <div className="flex items-center justify-between pb-6">
                            <p className="mb-0 mr-2">
                              Already have an account?
                            </p>
                            <button
                              type="button"
                              className="inline-block rounded border-2 border-red-600 px-6 py-2 text-xs font-medium uppercase leading-tight text-red-600 transition duration-150 ease-in-out hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0"
                              onClick={() => {
                                window.location.assign("/");
                              }}>
                              Login
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                    <div
                      className="flex items-center rounded-b-lg lg:w-6/12 lg:rounded-r-lg lg:rounded-bl-none"
                      style={{
                        background: `linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)`,
                      }}>
                      <div className="px-4 py-6 text-white md:mx-6 md:p-12">
                        <h4 className="mb-6 text-xl font-semibold">
                          Welcome to our social media community!
                        </h4>
                        <p className="text-sm">
                          "Connect, share, and engage with friends and
                          like-minded individuals on our platform. Here you can
                          share your thoughts, ideas and moments with your
                          friends and followers, and discover new and
                          interesting content. We're excited to have you join us
                          and can't wait to see what you'll share. Happy
                          posting!"
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
