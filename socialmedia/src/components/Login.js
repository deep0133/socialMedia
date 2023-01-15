import React, { useEffect } from "react";
import { useState } from "react";
import { LoginRequest } from "../Redux/Action/User";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import FullPageLoader from "./loader/FullPageLoader";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const { user, loading, message, error } = useSelector((state) => state.user);
  const { error: ALlUserError } = useSelector((state) => state.allUser);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const alert = useAlert();

  useEffect(() => {
    if (message) {
      alert.success(message);
      dispatch({ type: "ClearUserMessage" });
    }
    if (error) {
      alert.error(error);
      dispatch({ type: "ClearUserError" });
    }
    if (user) {
      navigate("/", { replace: true });
    }
  }, [alert, dispatch, user, message, error]);

  useEffect(() => {
    if (ALlUserError) {
      alert.error(ALlUserError);
      dispatch({ type: "clearError" });
    }
  }, [alert, dispatch, ALlUserError]);

  const loginHandler = (e) => {
    e.preventDefault();
    dispatch(LoginRequest(email, password));
  };

  return loading === true ? (
    <FullPageLoader />
  ) : (
    <section className="gradient-form min-h-screen bg-gray-200">
      <div className="container mx-auto bg-gray-200 py-12 px-6">
        <div className="g-6 flex h-full flex-wrap items-center justify-center text-gray-800">
          <div className="xl:w-10/12">
            <div className="block rounded-lg bg-white shadow-lg">
              <div className="g-0 lg:flex lg:flex-wrap">
                <div className="px-4 md:px-0 lg:w-6/12">
                  <div className="pt-5 md:mx-6 md:p-12">
                    <div className="text-center">
                      <h4 className="mt-1 mb-12 pb-1 text-xl font-semibold">
                        Social Media
                      </h4>
                    </div>
                    <form onSubmit={loginHandler}>
                      <p className="mb-4">Please login to your account</p>
                      <div className="mb-4">
                        <input
                          type="text"
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
                          className="mb-3 box-border inline-block w-full rounded px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-blue-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg"
                          type="submit"
                          disabled={loading}
                          style={{
                            background: `linear-gradient( to right, #ee7724, #d8363a, #dd3675, #b44593)`,
                          }}>
                          Login
                        </button>
                        <Link to={"/forgotPassword"} className="text-gray-500">
                          Forgot password?
                        </Link>
                      </div>
                      <div className="flex items-center justify-between pb-6">
                        <p className="mb-0 mr-2">Don't have an account?</p>
                        <button
                          type="button"
                          className="inline-block rounded border-2 border-red-600 px-6 py-2 text-xs font-medium uppercase leading-tight text-red-600 transition duration-150 ease-in-out hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0"
                          onClick={() => {
                            window.location.assign("/register");
                          }}>
                          Register
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
                      "Connect, share, and engage with friends and like-minded
                      individuals on our platform. Here you can share your
                      thoughts, ideas and moments with your friends and
                      followers, and discover new and interesting content. We're
                      excited to have you join us and can't wait to see what
                      you'll share. Happy posting!"
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
