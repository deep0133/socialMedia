import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetAllPostOfFollowingUser, GetAllUser } from "../Redux/Action/User";
import Post from "./Post";
import User from "./User";
import { useAlert } from "react-alert";
import { Avatar } from "@mui/material";
import Loader from "./loader/Loader";
import { useNavigate } from "react-router-dom";
export default function Home({ setMyprofile }) {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { users } = useSelector((state) => state.allUser);
  const { posts } = useSelector((state) => state.posts);
  const navigate = useNavigate();
  const {
    likeMessage,
    likeError,
    addUpdateCaptionMessage,
    addUpdateCaptionError,
  } = useSelector((state) => state.postAction);

  const { commentMessage, commentError } = useSelector(
    (state) => state.postAction
  );

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login", { replace: true });
    }
  }, [isAuthenticated]);

  useEffect(() => {
    dispatch(GetAllPostOfFollowingUser(localStorage.getItem("token")));
    dispatch(GetAllUser(localStorage.getItem("token")));
  }, [dispatch]);

  useEffect(() => {
    if (likeMessage) {
      alert.success(likeMessage);
      dispatch({ type: "ClearLikeMessage" });
    }
    if (likeError) {
      alert.error(likeError);
      dispatch({ type: "ClearLikeError" });
    }
    if (addUpdateCaptionMessage) {
      alert.success(addUpdateCaptionMessage);
      dispatch({ type: "ClearAddUpdateCaptionMessage" });
    }
    if (addUpdateCaptionError) {
      alert.success(addUpdateCaptionError);
      dispatch({ type: "ClearAddUpdateCaptionError" });
    }
  }, [
    alert,
    likeMessage,
    likeError,
    addUpdateCaptionMessage,
    addUpdateCaptionError,
    dispatch,
  ]);

  useEffect(() => {
    if (commentMessage) {
      alert.success(commentMessage);
      dispatch({ type: "ClearCommentMessage" });
    } else if (commentError) {
      alert.error(commentError);
      dispatch({ type: "ClearCommentError" });
    }
  }, [alert, commentMessage, commentError, dispatch]);

  return !user ? (
    <Loader />
  ) : (
    <div
      style={{
        background: `linear-gradient(to right, rgb(238, 119, 36), rgb(216, 54, 58), rgb(221, 54, 117), rgb(180, 69, 147))`,
      }}>
      <div className="mx-auto grid h-[92vh] grid-cols-12 overflow-hidden py-2 px-6 pt-6 lg:px-16 xl:container">
        <div className="Profile col-span-3 hidden overflow-auto shadow-2xl lg:block">
          <div className="card mx-auto space-y-6 px-5 py-6 ">
            <div className="mx-auto flex h-[120px] w-[120px] items-center justify-center text-center">
              <Avatar
                src={user.avatar.url}
                style={{ width: "100%", height: "100%" }}
              />
            </div>
            <h3 className="text-center text-xl font-medium">{user.name}</h3>
            <p className="text-center text-sm text-gray-800">{user.email}</p>

            <ul className="space-y-4 text-center text-lg">
              <li>
                <div className="flex justify-between px-6">
                  <div>Post</div>
                  <div className="total_posts">{user.posts.length}</div>
                </div>
              </li>
              <li>
                <div className="flex justify-between px-6 ">
                  <div>Followers</div>
                  <div className="total_posts">{user.followers.length}</div>
                </div>
              </li>
              <li>
                <div className="flex justify-between px-6">
                  <div>Following</div>
                  <div className="total_posts">{user.following.length}</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="posts shadow-3xl col-span-12 flex justify-center overflow-y-auto text-center sm:col-span-8 lg:col-span-6">
          <div className="mx-auto space-y-4">
            {posts && posts.length > 0 ? (
              posts.map((post) => {
                return (
                  <Post
                    key={post._id}
                    postId={post._id}
                    ownerId={post.owner._id}
                    ownerName={post.owner.name}
                    avatar={post.owner.avatar.url}
                    image={post.image.url}
                    caption={post.caption}
                    like={post.likes}
                    comment={post.comments}
                    createdAt={post.createdAt}
                    userId={user._id}
                    alert={alert}
                    tag={"home"}
                  />
                );
              })
            ) : (
              <h3 className="text-lg font-medium"> No User Yet</h3>
            )}
          </div>
        </div>
        <div className="active-user-list hidden overflow-hidden border-none px-6 text-center shadow-2xl sm:col-span-4 sm:block lg:col-span-3">
          <h2 className="py-6 text-lg font-medium">All User</h2>
          <div className="list relative h-full space-y-6 overflow-auto">
            {users && users.length > 0 ? (
              users.map((usr) => {
                return usr._id !== users._id ? (
                  <User
                    key={usr._id}
                    name={usr.name}
                    userId={usr._id}
                    image={usr.avatar.url}
                  />
                ) : null;
              })
            ) : (
              <h3 className="text-sm font-medium text-gray-600 lg:text-lg">
                {" "}
                No User Yet
              </h3>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
