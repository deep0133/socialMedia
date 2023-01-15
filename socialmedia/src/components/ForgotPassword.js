import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { ForgotPasswordAction } from "../Redux/Action/User";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const { udpateLoading, updateMessage, updateError } = useSelector(
    (state) => state.updateProfile
  );

  const dispatch = useDispatch();
  const alert = useAlert();

  useEffect(() => {
    if (updateMessage) {
      alert.success(updateMessage);
      dispatch({ type: "ClearUpdateMessage" });
    }
    if (updateError) {
      alert.success(updateError);
      dispatch({ type: "ClearUpdateError" });
    }
  }, [updateMessage, updateError, dispatch, alert]);

  const forgotPasswordHanle = (e) => {
    e.preventDefault();
    console.log("forgot password");
    dispatch(ForgotPasswordAction(email));
  };

  return (
    <div className=" flex h-[92vh] items-center justify-center bg-gray-200">
      <div className="container mx-auto lg:w-[80%]">
        <div className="mx-auto mb-6 w-fit text-xl text-gray-600">
          Forgot Password
        </div>
        <form
          className="mx-10 md:mx-auto md:w-[60%] lg:w-[50%]"
          onSubmit={forgotPasswordHanle}>
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

          <div className="mb-2 pt-1 pb-1 text-center">
            <button
              className="mb-3 inline-block w-full rounded px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-blue-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg"
              type="submit"
              style={{
                background: `linear-gradient( to right, #ee7724, #d8363a, #dd3675, #b44593)`,
              }}>
              {udpateLoading ? "Processing..." : "Send Token"}
            </button>
          </div>

          <div className="flex flex-col items-center justify-between pb-6">
            <p className="mb-3">OR</p>
            <button
              type="button"
              style={{
                background: `linear-gradient( to right, #ee7724, #d8363a, #dd3675, #b44593)`,
              }}
              className="inline-block w-full rounded px-6 py-2 text-xs font-medium uppercase leading-tight text-gray-300 transition duration-150 ease-in-out hover:bg-opacity-5 focus:outline-none focus:ring-0"
              onClick={() => {
                window.location.assign("/");
              }}>
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
