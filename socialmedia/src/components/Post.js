import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LikePost, CommentPost, DeletePost } from "../Redux/Action/Post";
import {
  AllMyPost,
  GetAllPostOfFollowingUser,
  ViewUserProfile,
} from "../Redux/Action/User";
import { Dialog, Button, Typography, Avatar } from "@mui/material";
import { AddUpdateCaption } from "../Redux/Action/Post";
import {
  Favorite,
  FavoriteBorderOutlined,
  ChatBubbleOutline,
  DeleteForever,
  Edit,
} from "@mui/icons-material";
import User from "./User";
import Comment from "./Comment";
import { Link } from "react-router-dom";

export default function Post({
  postId,
  ownerId,
  ownerName,
  avatar,
  image,
  caption,
  like,
  comment,
  createdAt,
  tag,
}) {
  const [liked, setLiked] = useState(false);
  const [likedList, setLikedList] = useState(false);
  const [commentList, setCommentList] = useState(false);
  const [commentForm, setCommentForm] = useState(false);
  const [commentValue, setCommentValue] = useState("");
  const [captionForm, setCaptionForm] = useState(false);
  const [captionValue, setCaptionValue] = useState(caption);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    like.forEach((element) => {
      if (element._id === user._id) {
        setLiked(true);
      }
    });
  }, [like]);

  const likeHandle = async (pId, owId) => {
    setLiked(!liked);
    await dispatch(LikePost(localStorage.getItem("token"), pId));
    if (tag === "me") {
      dispatch(AllMyPost(localStorage.getItem("token")));
    } else if (tag === "home") {
      dispatch(GetAllPostOfFollowingUser(localStorage.getItem("token")));
    } else if (tag === "profile") {
      dispatch(ViewUserProfile(localStorage.getItem("token"), owId));
    }
  };

  const commentActionHandle = async (pId, owId) => {
    await dispatch(
      CommentPost(localStorage.getItem("token"), commentValue, pId)
    );
    setCommentForm(!commentForm);
    if (tag === "me") {
      dispatch(AllMyPost(localStorage.getItem("token")));
    } else if (tag === "home") {
      dispatch(GetAllPostOfFollowingUser(localStorage.getItem("token")));
    } else if (tag === "profile") {
      dispatch(ViewUserProfile(localStorage.getItem("token"), owId));
    }
  };

  const deletePostHandle = async (pstId, owId) => {
    await dispatch(DeletePost(localStorage.getItem("token"), pstId));
    if (tag === "me") {
      dispatch(AllMyPost(localStorage.getItem("token")));
    } else if (tag === "home") {
      dispatch(GetAllPostOfFollowingUser(localStorage.getItem("token")));
    } else if (tag === "profile") {
      dispatch(ViewUserProfile(localStorage.getItem("token"), owId));
    }
  };

  const editCaptionHandle = async (pId, owId) => {
    await dispatch(
      AddUpdateCaption(localStorage.getItem("token"), captionValue, pId)
    );
    setCaptionForm(!captionForm);
    if (tag === "me") {
      dispatch(AllMyPost(localStorage.getItem("token")));
    } else if (tag === "home") {
      dispatch(GetAllPostOfFollowingUser(localStorage.getItem("token")));
    } else if (tag === "profile") {
      dispatch(ViewUserProfile(localStorage.getItem("token"), owId));
    }
  };

  const viewProfile = (id) => {
    dispatch(ViewUserProfile(localStorage.getItem("token"), id));
  };

  function convert(datetime) {
    const currentTime = new Date();
    const givenTime = new Date(datetime);
    const timeDifference = Math.abs(currentTime - givenTime);
    const diffInSec = Math.floor(timeDifference / 1000);
    const diffInMin = Math.floor(diffInSec / 60);
    const diffInHou = Math.floor(diffInMin / 60);
    const diffInDays = Math.floor(diffInHou / 24);
    const diffInYears = Math.floor(diffInDays / 365);

    if (diffInSec < 60) {
      return diffInSec + " seconds ago";
    } else if (diffInMin < 60) {
      return diffInMin + " minutes ago";
    } else if (diffInHou < 24) {
      return diffInHou + " hours ago";
    } else if (diffInDays < 365) {
      return diffInDays + " days ago";
    } else {
      return diffInYears + " years ago";
    }
  }

  return (
    <div className="relative w-fit overflow-hidden shadow-md">
      <div className="max-w-md rounded-sm border bg-white">
        <div className="flex items-center px-4 py-3 text-left">
          <Avatar loading="lazy" src={avatar} />
          <div className="ml-3 mt-3">
            <Link
              to={`/profile/${ownerId}`}
              onClick={() => {
                viewProfile(ownerId);
              }}
              className="block text-sm font-semibold leading-tight antialiased">
              {ownerName}
            </Link>
            <span className="text-xs font-thin text-gray-400">
              {convert(createdAt)}
            </span>
          </div>
        </div>
        <img src={image} loading="lazy" alt="postPic" />
        <div className="mt-2 flex">
          <div className="caption basis-5/6 px-4 text-left text-lg">
            {caption}
          </div>
          {tag === "me" ? (
            <div className="basis-1/6">
              <Button
                className=""
                onClick={() => {
                  setCaptionForm(!captionForm);
                }}>
                {" "}
                <Edit />{" "}
              </Button>
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="mx-4 mt-4 mb-2 flex items-center justify-between">
          <div className="flex gap-5">
            <button
              onClick={() => {
                likeHandle(postId, ownerId);
              }}>
              {liked === true ? (
                <Favorite sx={{ color: `red` }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </button>
            <Button
              onClick={() => {
                setCommentForm(!commentForm);
              }}>
              <ChatBubbleOutline />
            </Button>
          </div>
          <div className="flex w-fit hover:cursor-pointer">
            {tag === "me" ? (
              <DeleteForever
                onClick={() => {
                  deletePostHandle(postId, ownerId);
                }}
              />
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="mx-4 mt-2 mb-4 space-x-5 text-left text-sm font-semibold text-gray-500">
          <span
            className="hover:cursor-pointer"
            onClick={() => {
              setLikedList(true);
            }}>
            {like.length} likes
          </span>
          <span
            className="hover:cursor-pointer"
            onClick={() => {
              setCommentList(true);
            }}>
            {comment.length} comments
          </span>
        </div>
      </div>

      {/* Like List */}
      <Dialog
        open={likedList}
        onClose={() => {
          setLikedList(!likedList);
        }}>
        <div className="like-list  h-[500px] w-screen space-y-3 p-10">
          {like && like.length > 0 ? (
            like.map((usr) => {
              return (
                <User
                  key={usr._id}
                  name={usr.name}
                  userId={usr._id}
                  image={usr.avatar.url}
                />
              );
            })
          ) : (
            <h3 className="text-lg font-medium text-gray-600"> No Likes Yet</h3>
          )}
        </div>
      </Dialog>
      {/* Show All Comment and Delete your comment */}
      <Dialog
        BackdropProps={{ invisible: true }}
        open={commentList}
        onClose={() => {
          setCommentList(!commentList);
        }}>
        <div className="comment-list h-[500px]  w-[600px] space-y-3 rounded-md p-6">
          {comment && comment.length > 0 ? (
            comment.map((cmt) => {
              return (
                <Comment
                  key={cmt._id}
                  name={cmt.user.name}
                  avatar={cmt.user.avatar.url}
                  comment={cmt.comment}
                  userId={cmt.user._id}
                  commentId={cmt._id}
                  postId={postId}
                  tag={tag}
                />
              );
            })
          ) : (
            <h3 className="text-lg font-medium text-gray-600">
              {" "}
              No Comment Yet
            </h3>
          )}
        </div>
      </Dialog>
      {/* Add or Update Comment */}
      <Dialog
        open={commentForm}
        onClose={() => {
          setCommentForm(!commentForm);
        }}>
        <div className="add-update-comment h-[500px]  w-[600px] space-y-3 rounded-md bg-[#f3f3f3] p-6">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              commentActionHandle(postId, ownerId);
            }}
            className="flex flex-col space-y-3">
            <input type="hidden" value={postId} name="pId" />
            <textarea
              className="mx-auto w-[80%] rounded-md border-2 bg-[#f3f3f3] px-3 py-2 outline-none"
              name="comment"
              id="comment"
              cols="40"
              rows="6"
              value={commentValue}
              onChange={(e) => {
                setCommentValue(e.target.value);
              }}
              placeholder="Write your comment here..."></textarea>
            <Typography
              variant="textarea"
              row="6"
              col="30"
              placeholder="typo"
            />
            <Button type="submit">Add Comment</Button>
          </form>
        </div>
      </Dialog>
      {/* Add or Update Caption */}
      <Dialog
        open={captionForm}
        onClose={() => {
          setCaptionForm(!captionForm);
        }}>
        <div className="add-update-comment h-[500px]  w-[600px] space-y-3 rounded-md bg-[#f3f3f3] p-6">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              editCaptionHandle(postId, ownerId);
            }}
            className="flex flex-col space-y-3">
            <input type="hidden" value={postId} name="id" />
            <textarea
              className="mx-auto w-[80%] rounded-md border-2 bg-[#f3f3f3] px-3 py-2 outline-none"
              name="caption"
              cols="40"
              rows="6"
              value={captionValue}
              onChange={(e) => {
                setCaptionValue(e.target.value);
              }}
              placeholder="Write here..."></textarea>
            <Button type="submit">Update Caption</Button>
          </form>
        </div>
      </Dialog>
    </div>
  );
}
