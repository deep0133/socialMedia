import { Avatar, Dialog, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { FollowToUser, LoadUser, ViewUserProfile } from "../Redux/Action/User";
import Loader from "./loader/Loader";
import Post from "./Post";
import User from "./User";

export default function Profile() {
  const [followerToggle, setFollowerToggle] = useState(false);
  const [followingToggle, setFollowingToggle] = useState(false);
  const [myProfile, setMyProfile] = useState(false);

  const { user } = useSelector((state) => state.user);
  const { viewUser, loading, error } = useSelector(
    (state) => state.viewProfile
  );
  const params = useParams();

  const {
    loading: f_Loading,
    error: f_Error,
    message: f_message,
  } = useSelector((state) => state.followToUser);

  const dispatch = useDispatch();
  const alert = useAlert();

  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    dispatch(ViewUserProfile(localStorage.getItem("token"), params.id));
  }, []);

  useEffect(() => {
    if (user) {
      if (user._id === params.id) {
        setMyProfile(true);
      }
    }
    if (viewUser) {
      viewUser.followers.forEach((element) => {
        if (element._id === user._id) {
          setIsFollowing(true);
        } else {
          setIsFollowing(false);
        }
      });
    }
  }, [user, viewUser, params]);

  const {
    likeMessage,
    likeError,
    addUpdateCaptionMessage,
    addUpdateCaptionError,
    commentMessage,
    commentError,
  } = useSelector((state) => state.postAction);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: "ClearViewProfileError" });
    }
    if (f_message) {
      alert.success(f_message);
      dispatch({ type: "ClearFollowMessage" });
    }

    if (f_Error) {
      alert.error(f_Error);
      dispatch({ type: "ClearFollowError" });
    }
  }, [alert, dispatch, f_Loading, f_Error, f_message, error]);

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

  const followOrUnfollowHandle = async (id) => {
    await dispatch(FollowToUser(localStorage.getItem("token"), id));
    setIsFollowing(!isFollowing);
    dispatch(ViewUserProfile(localStorage.getItem("token"), id));
    dispatch(LoadUser(localStorage.getItem("token")));
  };

  return loading === undefined || loading === true ? (
    <Loader />
  ) : (
    <>
      <div
        style={{
          background: `linear-gradient(to right, rgb(238, 119, 36), rgb(216, 54, 58), rgb(221, 54, 117), rgb(180, 69, 147))`,
          padding: "12px",
        }}>
        <div className="shadow-3xl mx-auto grid w-full grid-cols-1 overflow-hidden pt-3 sm:h-[92vh] sm:grid-cols-12 sm:gap-3 sm:px-6 md:gap-5 lg:container lg:px-24">
          {/* div-1 */}
          <div className="order-2 col-span-1 max-h-full overflow-y-auto rounded-md shadow-2xl sm:order-1 sm:col-span-8">
            <div className="posts mx-auto w-fit space-y-6 py-2">
              <div className="flex h-full w-full flex-col items-center justify-center text-lg font-medium">
                <div className="posts mx-auto w-fit space-y-6 py-2">
                  {viewUser && viewUser.posts.length > 0 ? (
                    viewUser.posts.map((pst) => {
                      return (
                        <Post
                          key={pst._id}
                          postId={pst._id}
                          caption={pst.caption}
                          like={pst.likes}
                          comment={pst.comments}
                          createdAt={pst.createdAt}
                          ownerId={viewUser._id}
                          ownerName={viewUser.name}
                          avatar={viewUser.avatar.url}
                          image={pst.image.url}
                          cloudId={pst.image.public_id}
                          tag={"profile"}
                        />
                      );
                    })
                  ) : (
                    <h3 className="mb-2 ">No Post Found</h3>
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* div-2 */}
          <div
            className="order-1 col-span-1 max-h-full overflow-auto rounded-md p-3 shadow-2xl sm:order-2 sm:col-span-4 sm:p-0"
            style={{ backdropFilter: `hue-rotate(11deg)` }}>
            <div className="Profile overflow-auto border-none">
              <div className="card mx-auto space-y-3 px-5 py-6 text-center">
                <div className="mx-auto w-fit">
                  <div className="img mx-auto flex h-[120px] w-[120px] items-center justify-center overflow-hidden rounded-full">
                    <Avatar
                      src={viewUser.avatar.url}
                      style={{ width: "100%", height: "100%" }}
                    />
                  </div>
                </div>
                <h3 className="text-xl font-medium">{viewUser.name}</h3>
                <span className="text-xs">{viewUser.email}</span>

                <div className="posts box-border flex flex-col">
                  <button className="delay-50 mx-auto w-fit px-8 py-1 text-lg transition duration-200  hover:shadow-md">
                    Posts
                  </button>

                  <span className="text-lg">{viewUser.posts.length}</span>
                </div>
                <div className="follower box-border flex flex-col">
                  <button
                    onClick={() => {
                      setFollowerToggle(!followerToggle);
                    }}
                    className="delay-50 mx-auto w-fit px-8 py-1 text-lg transition duration-200  hover:shadow-md">
                    Follower
                  </button>

                  <span className="text-lg">{viewUser.followers.length} </span>
                </div>
                <div className="following box-border flex flex-col">
                  <button
                    onClick={() => {
                      setFollowingToggle(!followingToggle);
                    }}
                    className="delay-50 mx-auto w-fit px-8 py-1 text-lg transition duration-200 hover:shadow-md">
                    Following
                  </button>

                  <span className="text-lg">{viewUser.following.length} </span>
                </div>
                <div className="delete-profile mt-3 box-border flex flex-col">
                  {!myProfile ? (
                    <button
                      onClick={() => {
                        followOrUnfollowHandle(viewUser._id);
                      }}
                      className="delay-50 mx-auto w-fit rounded-md px-8 py-1 text-lg font-[500] shadow-md transition duration-200 hover:bg-[#a7386c]">
                      {isFollowing ? "UNFOLLOW" : "FOLLOW"}
                    </button>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*  All Followers */}
      <Dialog
        open={followerToggle}
        onClose={() => {
          setFollowerToggle(!followerToggle);
        }}>
        <div className="update-profile-comment h-[500px]  w-[600px] space-y-3 rounded-md bg-[#f3f3f3] p-6">
          {viewUser && viewUser.followers.length > 0 ? (
            viewUser.followers.map((follower) => {
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
          {viewUser && viewUser.following.length > 0 ? (
            viewUser.following.map((ele) => {
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
