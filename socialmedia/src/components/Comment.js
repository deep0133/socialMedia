import { DeleteForeverOutlined } from "@mui/icons-material";
import { Avatar, Button } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { DeleteComment } from "../Redux/Action/Post";
import {
  AllMyPost,
  GetAllPostOfFollowingUser,
  ViewUserProfile,
} from "../Redux/Action/User";

export default function Comment({
  avatar,
  comment,
  name,
  commentId,
  userId,
  tag,
  postId,
}) {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);

  const viewProfile = (id) => {
    dispatch(ViewUserProfile(localStorage.getItem("token"), id));
  };

  const deleteCommentHandle = async (id, pId) => {
    await dispatch(DeleteComment(localStorage.getItem("token"), id, pId));
    if (tag === "me") {
      dispatch(AllMyPost(localStorage.getItem("token")));
    } else if (tag === "home") {
      dispatch(GetAllPostOfFollowingUser(localStorage.getItem("token")));
    } else if (tag === "profile") {
      dispatch(ViewUserProfile(localStorage.getItem("token"), id));
    }
  };

  return (
    <div>
      <div className="card mx-auto w-[90%] border-2  p-4 shadow-md">
        <div className="image-name flex space-x-3">
          <Avatar src={avatar} style={{ width: "30px", height: "30px" }} />
          <div className="mt-1 flex space-x-3 font-medium">
            <Link
              to={`/profile/${userId}`}
              onClick={() => {
                viewProfile(userId);
              }}
              className="name">
              {name}
            </Link>
            {tag === "me" ? (
              <Button
                onClick={() => {
                  deleteCommentHandle(commentId, postId);
                }}>
                <DeleteForeverOutlined />
              </Button>
            ) : userId === user._id ? (
              <Button
                onClick={() => {
                  deleteCommentHandle(commentId, postId);
                }}>
                <DeleteForeverOutlined />
              </Button>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="message-container px-1 py-2">{comment}</div>
      </div>
    </div>
  );
}
