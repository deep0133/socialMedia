import axios from "axios";

export const LikePost = (token, id) => async (dispatch) => {
  try {
    dispatch({
      type: "LikePostRequest",
    });

    const url = `http://localhost:5000/post/v1/likeAndUnlikePost/${id}`;
    await axios
      .post(
        url,
        {
          token,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(function (response) {
        dispatch({
          type: "LikePostSuccess",
          payload: response.data.message,
        });
      });
  } catch (error) {
    dispatch({
      type: "LikePostFailure",
      payload: error.response.data.message,
    });
  }
};
export const CommentPost = (token, comment, postId) => async (dispatch) => {
  try {
    dispatch({
      type: "CommentPostRequest",
    });

    // http://localhost:5000/post/v1/addComment/63b534a66759bc130ff675eb
    const url = `http://localhost:5000/post/v1/addComment/${postId}`;

    await axios
      .put(
        url,
        {
          token,
          comment,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(function (response) {
        dispatch({
          type: "CommentPostSuccess",
          payload: response.data.message,
        });
      });
  } catch (error) {
    dispatch({
      type: "CommentPostFailure",
      payload: error.response.data.message,
    });
  }
};
export const UploadNewPost = (token, image, caption) => async (dispatch) => {
  try {
    dispatch({
      type: "UploadPostRequest",
    });

    const url = `http://localhost:5000/post/v1/createPost`;

    await axios
      .post(
        url,
        {
          token,
          image,
          caption,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(function (response) {
        dispatch({
          type: "UploadPostSuccess",
          payload: response.data.message,
        });
      });
  } catch (error) {
    dispatch({
      type: "UploadPostFailure",
      payload: error.response.data.message,
    });
  }
};
export const DeletePost = (token, id) => async (dispatch) => {
  try {
    dispatch({
      type: "DeletePostRequest",
    });

    const url = `http://localhost:5000/post/v1/deletePost/${id}`;

    await axios
      .post(
        url,
        {
          token,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(function (response) {
        dispatch({
          type: "DeletePostSuccess",
          payload: response.data.message,
        });
      });
  } catch (error) {
    dispatch({
      type: "DeletePostFailure",
      payload: error.response.data.message,
    });
  }
};
export const DeleteComment = (token, id, pId) => async (dispatch) => {
  try {
    dispatch({
      type: "DeleteCommentRequest",
    });

    const url = `http://localhost:5000/post/v1/deleteComment/${pId}`;

    await axios
      .post(
        url,
        {
          token,
          commentId: id,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(function (response) {
        dispatch({
          type: "DeleteCommentSuccess",
          payload: response.data.message,
        });
      });
  } catch (error) {
    dispatch({
      type: "DeleteCommentFailure",
      payload: error.response.data.message,
    });
  }
};

export const AddUpdateCaption =
  (token, caption, postId) => async (dispatch) => {
    try {
      dispatch({
        type: "AddUpdateCaptionRequest",
      });

      const url = `http://localhost:5000/post/v1/updateCaption/${postId}`;

      await axios
        .put(
          url,
          {
            token,
            caption,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then(function (response) {
          dispatch({
            type: "AddUpdateCaptionSuccess",
            payload: response.data.message,
          });
        });
    } catch (error) {
      dispatch({
        type: "AddUpdateCaptionFailure",
        payload: error.response.data.message,
      });
    }
  };
