import { createReducer } from "@reduxjs/toolkit";

const initialState = {};

export const PostReducer = createReducer(initialState, {
  LikePostRequest: (state) => {
    state.likeLoader = true;
  },
  LikePostSuccess: (state, action) => {
    state.likeLoader = false;
    state.likeMessage = action.payload;
  },
  LikePostFailure: (state, action) => {
    state.likeLoader = false;
    state.likeError = action.payload;
  },

  ClearLikeMessage: (state) => {
    state.likeMessage = null;
  },
  ClearLikeError: (state) => {
    state.likeError = null;
  },

  CommentPostRequest: (state) => {
    state.commentLoader = true;
  },
  CommentPostSuccess: (state, action) => {
    state.commentLoader = false;
    state.commentMessage = action.payload;
  },
  CommentPostFailure: (state, action) => {
    state.commentLoader = false;
    state.commentError = action.payload;
  },

  ClearCommentMessage: (state) => {
    state.commentMessage = null;
  },
  ClearCommentError: (state) => {
    state.commentError = null;
  },

  UploadPostRequest: (state) => {
    state.uploadPostLoader = true;
  },
  UploadPostSuccess: (state, action) => {
    state.uploadPostLoader = false;
    state.uploadPostMessage = action.payload;
  },
  UploadPostFailure: (state, action) => {
    state.uploadPostLoader = false;
    state.uploadPostError = action.payload;
  },

  ClearUploadMessage: (state) => {
    state.uploadPostMessage = null;
  },
  ClearUploadError: (state) => {
    state.uploadPostError = null;
  },

  DeletePostRequest: (state) => {
    state.deletePostLoader = true;
  },
  DeletePostSuccess: (state, action) => {
    state.deletePostLoader = false;
    state.deletePostMessage = action.payload;
  },
  DeletePostFailure: (state, action) => {
    state.deletePostLoader = false;
    state.deletePostError = action.payload;
  },

  ClearDeleteMessage: (state) => {
    state.deletePostMessage = null;
  },
  ClearDeleteError: (state) => {
    state.deletePostError = null;
  },

  DeleteCommentRequest: (state) => {
    state.deleteCommentLoader = true;
  },
  DeleteCommentSuccess: (state, action) => {
    state.deleteCommentLoader = false;
    state.deleteCommentMessage = action.payload;
  },
  DeleteCommentFailure: (state, action) => {
    state.deleteCommentLoader = false;
    state.deleteCommentError = action.payload;
  },

  ClearDeleteCommentMessage: (state) => {
    state.deleteCommentMessage = null;
  },
  ClearDeleteCommentError: (state) => {
    state.deleteCommentError = null;
  },

  AddUpdateCaptionRequest: (state) => {
    state.addUpdateCaptionLoader = true;
  },
  AddUpdateCaptionSuccess: (state, action) => {
    state.addUpdateCaptionLoader = false;
    state.addUpdateCaptionMessage = action.payload;
  },
  AddUpdateCaptionFailure: (state, action) => {
    state.addUpdateCaptionLoader = false;
    state.addUpdateCaptionError = action.payload;
  },
  ClearAddUpdateCaptionMessage: (state) => {
    state.addUpdateCaptionMessage = null;
  },
  ClearAddUpdateCaptionError: (state) => {
    state.addUpdateCaptionError = null;
  },
});
