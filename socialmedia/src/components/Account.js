import { Avatar, Button, Dialog, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  AllMyPost,
  DeleteAccount,
  LoadUser,
  UpdateUserPassword,
  UpdateUserProfile,
  UserLogout,
} from "../Redux/Action/User";
import Loader from "./loader/Loader";
import Post from "./Post";
import { useAlert } from "react-alert";
import User from "./User";
import FullPageLoader from "./loader/FullPageLoader";

export default function Account({ setActive }) {
  const { user, loading, error, message, isAuthenticated } = useSelector(
    (state) => state.user
  );
  const { allMyPost, allMyPostLoading } = useSelector((state) => state.myPost);
  const { udpateLoading, updateMessage, updateError } = useSelector(
    (state) => state.updateProfile
  );

  const {
    likeMessage,
    likeError,
    addUpdateCaptionMessage,
    addUpdateCaptionError,
    deletePostMessage,
    commentMessage,
    commentError,
    deletePostError,
    deleteCommentMessage,
    deleteCommentError,
  } = useSelector((state) => state.postAction);

  const dispatch = useDispatch();
  const alert = useAlert();

  const [updateProfile, setUpdateProfile] = useState(false);
  const [name, setName] = useState(user ? user.name : "");
  const [email, setEmail] = useState(user ? user.email : "");
  const [updatePassword, setUpdatePassword] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [followerToggle, setFollowerToggle] = useState(false);
  const [followingToggle, setFollowingToggle] = useState(false);

  useEffect(() => {
    if (localStorage.key("token") !== undefined) {
      dispatch(AllMyPost(localStorage.getItem("token")));
    }
  }, [dispatch]);

  useEffect(() => {
    if (message) {
      alert.success(message);
      dispatch({ type: "ClearUserMessage" });
    }
    // if (error) {
    //   alert.success(error);
    //   dispatch({ type: "ClearUserError" });
    // }
  }, [alert, message, dispatch]);

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
    }
    if (commentError) {
      alert.error(commentError);
      dispatch({ type: "ClearCommentError" });
    }

    if (deleteCommentMessage) {
      alert.success(deleteCommentMessage);
      dispatch({ type: "ClearDeleteCommentMessage" });
    }
    if (deleteCommentError) {
      alert.error(deleteCommentError);
      dispatch({ type: "ClearDeleteCommentError" });
    }
    if (deletePostMessage) {
      alert.success(deletePostMessage);
      dispatch({ type: "ClearDeleteMessage" });
    }
    if (deletePostError) {
      alert.error(deletePostError);
      dispatch({ type: "ClearDeleteError" });
    }
  }, [
    alert,
    commentMessage,
    commentError,
    deleteCommentMessage,
    deleteCommentError,
    deletePostMessage,
    deletePostError,
    dispatch,
  ]);

  useEffect(() => {
    if (updateMessage) {
      alert.success(updateMessage);
      dispatch({ type: "ClearUpdateMessage" });
    }
    if (updateError) {
      alert.success(updateError);
      dispatch({ type: "ClearUpdateError" });
    }
  }, [alert, updateMessage, dispatch]);

  const logoutHandle = () => {
    dispatch(UserLogout(localStorage.getItem("token")));
    localStorage.removeItem("token");
  };
  const updateProfileHandle = async (e) => {
    e.preventDefault();
    await dispatch(
      UpdateUserProfile(localStorage.getItem("token"), name, email)
    );
    setName("");
    setEmail("");
    dispatch(LoadUser(localStorage.getItem("token")));
  };

  const updatePasswordHandle = (e) => {
    e.preventDefault();
    dispatch(
      UpdateUserPassword(
        localStorage.getItem("token"),
        oldPassword,
        newPassword
      )
    );
    setOldPassword("");
    setNewPassword("");
  };

  const deleteProfileHandle = async () => {
    await dispatch(DeleteAccount(localStorage.getItem("token")));
    logoutHandle();
  };

  return (
    <>
      {loading === true ? (
        <FullPageLoader />
      ) : (
        <div
          style={{
            background: `linear-gradient(to right, rgb(238, 119, 36), rgb(216, 54, 58), rgb(221, 54, 117), rgb(180, 69, 147))`,
            padding: "12px",
          }}>
          {!isAuthenticated ? (
            window.location.assign("/")
          ) : (
            <div className="shadow-3xl mx-auto grid w-full grid-cols-1 overflow-hidden pt-3 sm:h-[92vh] sm:grid-cols-12 sm:gap-3 sm:px-6 md:gap-5 lg:container lg:px-24">
              {/* div-1 */}
              <div
                className="order-2 col-span-1 max-h-full w-full overflow-y-auto rounded-md shadow-2xl sm:order-1 sm:col-span-8"
                style={{ backdropFilter: `hue-rotate(376deg)` }}>
                <div className="posts mx-auto w-fit space-y-6 py-2">
                  {allMyPostLoading === true ? (
                    <Loader />
                  ) : allMyPost && allMyPost.length > 0 ? (
                    allMyPost.map((pst) => {
                      return (
                        <Post
                          key={pst._id}
                          postId={pst._id}
                          caption={pst.caption}
                          like={pst.likes}
                          comment={pst.comments}
                          createdAt={pst.createdAt}
                          ownerId={pst.owner._id}
                          ownerName={pst.owner.name}
                          avatar={pst.owner.avatar.url}
                          image={pst.image.url}
                          cloudId={pst.image.public_id}
                          tag={"me"}
                        />
                      );
                    })
                  ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center text-sm font-medium lg:text-lg">
                      <h3 className="mb-2 ">No Post Found</h3>
                      <Button>
                        <Link
                          onClick={() => {
                            setActive("/upload");
                          }}
                          className="text-lg font-medium"
                          to={"/upload"}>
                          Upload Post
                        </Link>
                      </Button>
                    </div>
                  )}
                </div>
              </div>
              {/* div-2 */}
              <div
                className="order-1 overflow-auto rounded-md shadow-2xl sm:order-2 sm:col-span-4"
                style={{ backdropFilter: `hue-rotate(11deg)` }}>
                {loading === true || loading === undefined ? (
                  <Loader />
                ) : (
                  <div className="Profile overflow-auto border-none">
                    <div className="card spacy-2 mx-auto px-3 py-6 text-center md:space-y-3 lg:px-5">
                      <div className="mx-auto w-fit">
                        <Avatar
                          src={user.avatar.url}
                          style={{ width: "100px", height: "100px" }}
                        />
                      </div>
                      <h3 className="text-sm font-medium lg:text-xl">
                        {user.name}
                      </h3>
                      <span className="text-xs">{user.email}</span>

                      <div className="posts box-border flex flex-col">
                        <button className="delay-50 mx-auto w-fit px-8 py-1 text-sm transition duration-200 hover:shadow-md  lg:text-lg">
                          Posts
                        </button>

                        <span className="text-lg">
                          {allMyPost ? allMyPost.length : user.posts.length}{" "}
                        </span>
                      </div>
                      <div className="follower box-border flex flex-col">
                        <button
                          onClick={() => {
                            setFollowerToggle(!followerToggle);
                          }}
                          className="delay-50 mx-auto w-fit px-8 py-1 text-sm transition duration-200 hover:shadow-md  lg:text-lg">
                          Follower
                        </button>

                        <span className="text-lg">
                          {user.followers.length}{" "}
                        </span>
                      </div>
                      <div className="following box-border flex flex-col">
                        <button
                          onClick={() => {
                            setFollowingToggle(!followingToggle);
                          }}
                          className="delay-50 mx-auto w-fit px-8 py-1 text-sm transition duration-200 hover:shadow-md  lg:text-lg">
                          Following
                        </button>

                        <span className="text-lg">
                          {user.following.length}{" "}
                        </span>
                      </div>
                      <div className="update-profile box-border flex flex-col">
                        <button
                          onClick={() => {
                            setUpdateProfile(!updateProfile);
                          }}
                          className="delay-50 mx-auto w-fit px-8 py-1 text-sm transition duration-200 hover:shadow-md  lg:text-lg">
                          Update Profile
                        </button>
                      </div>
                      <div className="change-password box-border flex flex-col">
                        <button
                          onClick={() => {
                            setUpdatePassword(!updatePassword);
                          }}
                          className="delay-50 mx-auto w-fit px-8 py-1 text-sm transition duration-200 hover:shadow-md  lg:text-lg">
                          Change Password
                        </button>
                      </div>
                      <div className="logout box-border flex flex-col">
                        <button
                          onClick={logoutHandle}
                          className="delay-50 mx-auto w-fit rounded-md px-8 py-1 text-sm font-[400] shadow-md transition duration-200 hover:bg-[#a7386c] lg:text-lg">
                          Logout
                        </button>
                      </div>
                      <div className="delete-profile box-border flex flex-col">
                        <button
                          onClick={deleteProfileHandle}
                          className="delay-50 mx-auto w-fit rounded-md px-8 py-1 text-sm font-[500] text-orange-500 shadow-xl transition duration-200 hover:bg-[#a7386c] hover:text-orange-600 lg:text-lg ">
                          Delete Account
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
      {/* Update Profile */}
      <Dialog
        open={updateProfile}
        onClose={() => {
          setUpdateProfile(!updateProfile);
        }}>
        <div className="update-profile-comment h-[500px]  w-[600px] space-y-3 rounded-md p-6">
          <div className="title mt-3 mb-4 py-1 text-center">
            {" "}
            Update Profile
          </div>

          <form onSubmit={updateProfileHandle}>
            <div className="mb-4">
              <input
                type="text"
                className="form-control focus m-0 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-base font-normal transition ease-in-out focus:border-blue-600 focus:bg-white focus:outline-none"
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
                type="text"
                className="form-control focus m-0 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-base font-normal transition ease-in-out focus:border-blue-600 focus:bg-white focus:outline-none"
                placeholder="Email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                required
              />
            </div>

            <div className="mb-12 pt-1 pb-1 text-center">
              <button
                disabled={udpateLoading}
                className="mb-3 inline-block w-full rounded px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-blue-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg"
                type="submit"
                style={{
                  background: `linear-gradient( to right, #ee7724, #d8363a, #dd3675, #b44593)`,
                }}>
                {udpateLoading ? "Updating..." : "Update Profile"}
              </button>
            </div>
          </form>
        </div>
      </Dialog>

      {/* Update Password */}
      <Dialog
        open={updatePassword}
        onClose={() => {
          setUpdatePassword(!updatePassword);
        }}>
        <div className="update-profile-comment h-[500px]  w-[600px] space-y-3 rounded-md p-6">
          <div className="title mt-3 mb-4 py-1 text-center">
            {" "}
            Change Password
          </div>

          <form onSubmit={updatePasswordHandle}>
            <div className="mb-4">
              <input
                type="password"
                className="form-control focus m-0 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-base font-normal transition ease-in-out focus:border-blue-600 focus:bg-white focus:outline-none"
                placeholder="Old Password"
                value={oldPassword}
                onChange={(e) => {
                  setOldPassword(e.target.value);
                }}
                required
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                className="form-control focus m-0 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-base font-normal transition ease-in-out focus:border-blue-600 focus:bg-white focus:outline-none"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                }}
                required
              />
            </div>

            <div className="mb-12 pt-1 pb-1 text-center">
              <button
                disabled={udpateLoading}
                className="mb-3 box-border inline-block w-full rounded px-6 py-3 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-blue-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg"
                type="submit"
                style={{
                  background: `linear-gradient( to right, #ee7724, #d8363a, #dd3675, #b44593)`,
                }}>
                {udpateLoading ? "Updating..." : "Update Profile"}
              </button>
            </div>
          </form>
        </div>
      </Dialog>

      {/*  All Followers */}
      <Dialog
        open={followerToggle}
        onClose={() => {
          setFollowerToggle(!followerToggle);
        }}>
        <div className="update-profile-comment h-[500px]  w-[600px] space-y-3 rounded-md bg-[#f3f3f3] p-6">
          {user && user.followers.length > 0 ? (
            user.followers.map((follower) => {
              return (
                <User
                  key={follower._id}
                  name={follower.name}
                  userId={follower._id}
                  image={follower.avatar.url}
                />
              );
            })
          ) : (
            <Typography variant="h6" style={{ textAlign: "center" }}>
              No Follower Found
            </Typography>
          )}
        </div>
      </Dialog>

      {/*  All Following */}
      <Dialog
        open={followingToggle}
        onClose={() => {
          setFollowingToggle(!followingToggle);
        }}>
        <div className="update-profile-comment h-[500px]  w-[600px] space-y-3 rounded-md bg-[#f3f3f3] p-6">
          {user && user.following.length > 0 ? (
            user.following.map((ele) => {
              return (
                <User
                  key={ele._id}
                  name={ele.name}
                  userId={ele._id}
                  image={ele.avatar.url}
                />
              );
            })
          ) : (
            <Typography variant="h6" style={{ textAlign: "center" }}>
              Nothing Found
            </Typography>
          )}
        </div>
      </Dialog>
    </>
  );
}
