import { Avatar } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { ViewUserProfile } from "../Redux/Action/User";
export default function User({ name, userId, image }) {
  const dispatch = useDispatch();
  const viewProfile = (id) => {
    dispatch(ViewUserProfile(localStorage.getItem("token"), id));
  };
  return (
    <Link
      to={`/profile/${userId}`}
      onClick={() => {
        viewProfile(userId);
      }}
      className="card flex space-x-4  py-1.5 px-3 transition duration-300 ">
      <div className="img flex h-10 w-10 items-center justify-center overflow-hidden rounded-full">
        <Avatar src={image} style={{ width: "100%", height: "100%" }} />
      </div>
      <h3 className="name mt-1 text-left text-sm font-medium capitalize lg:text-lg">
        {name}
      </h3>
    </Link>
  );
}
