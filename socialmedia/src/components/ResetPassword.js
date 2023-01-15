import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ResetPasswordAction } from "../Redux/Action/User";

export default function ResetPassword() {
  const [password, setPassword] = useState("");

  const { udpateLoading, updateMessage, updateError } = useSelector(
    (state) => state.updateProfile
  );

  const dispatch = useDispatch();
  const param = useParams();
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

  const updatePasswordHandle = (e) => {
    e.preventDefault();

    console.log(param);
    dispatch(
      ResetPasswordAction(localStorage.getItem("token"), param.token, password)
    );
  };

  return (
    <div className=" flex h-screen items-center justify-center bg-gray-200">
      <div className="mx-auto w-[80%] sm:max-w-lg">
        <div className="mx-auto mb-6 w-fit text-xl text-gray-600">
          Reset Password
        </div>
        <form onSubmit={updatePasswordHandle}>
          <div className="mb-4">
            <input
              type="password"
              className="form-control m-0 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none"
              placeholder="New Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
            />
          </div>

          <div className="pt-1 pb-1 text-center">
            <button
              disabled={udpateLoading}
              className="mb-3 inline-block w-full rounded px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-blue-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg"
              type="submit"
              style={{
                background: `linear-gradient( to right, #ee7724, #d8363a, #dd3675, #b44593)`,
              }}>
              {udpateLoading ? "Updating..." : "Update"}
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
