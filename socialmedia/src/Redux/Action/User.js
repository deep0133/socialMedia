import axios from "axios";

export const LoginRequest = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: "loginRequest",
    });

    const url = "http://localhost:5000/api/v1/login";
    await axios
      .post(
        url,
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(function (response) {
        dispatch({
          type: "loginSuccess",
          payload: response.data.user,
        });

        localStorage.setItem("token", response.data.token);
      })
      .catch(function (error) {
        dispatch({
          type: "loginFailure",
          payload: error.response.data.message,
        });
      });
  } catch (error) {
    dispatch({
      type: "loginFailure",
      payload: error,
    });
  }
};

export const RegisterRequest =
  (name, email, image, password) => async (dispatch) => {
    try {
      dispatch({
        type: "RegisterRequest",
      });

      const url = "http://localhost:5000/api/v1/register";
      await axios
        .post(
          url,
          {
            name,
            email,
            image,
            password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then(function (response) {
          dispatch({
            type: "RegisterSuccess",
            payload: response.data.user,
          });

          localStorage.setItem("token", response.data.token);
        })
        .catch(function (error) {
          dispatch({
            type: "RegisterFailure",
            payload: error.response.data.message,
          });
        });
    } catch (error) {
      dispatch({
        type: "RegisterFailure",
        payload: error.message,
      });
    }
  };

export const LoadUser = (token) => async (dispatch) => {
  try {
    dispatch({
      type: "loadUserRequest",
    });

    const url = "http://localhost:5000/api/v1/me";
    await axios
      .post(
        url,
        { token },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(function (response) {
        dispatch({
          type: "loadUsertSuccess",
          payload: response.data.user,
        });
      })
      .catch(function (error) {
        dispatch({
          type: "loadUserFailure",
          payload: error.response.data.message,
        });
      });
  } catch (error) {
    dispatch({
      type: "loadUserFailure",
      payload: error.message,
    });
  }
};

export const GetAllPostOfFollowingUser = (token) => (dispatch) => {
  try {
    dispatch({
      type: "postOfFollowingUserRequest",
    });

    const url = "http://localhost:5000/api/v1/postOfFollowing";
    axios
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
          type: "postOfFollowingUserSuccess",
          payload: response.data.posts,
        });
      })
      .catch(function (error) {
        dispatch({
          type: "postOfFollowingUserFailure",
          payload: error.response.data.message,
        });
      });
  } catch (error) {
    dispatch({
      type: "postOfFollowingUserFailure",
      payload: error.message,
    });
  }
};

export const GetAllUser =
  (token, name = "") =>
  (dispatch) => {
    try {
      dispatch({
        type: "GetAllUserRequest",
      });

      const url = `http://localhost:5000/api/v1/getAllUser?name=${name}`;
      axios
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
            type: "GetAllUserSuccess",
            payload: response.data.user,
          });
        })
        .catch(function (error) {
          dispatch({
            type: "GetAllUserFailure",
            payload: error.response.data.message,
          });
        });
    } catch (error) {
      dispatch({
        type: "GetAllUserFailure",
        payload: error.message,
      });
    }
  };

export const AllMyPost = (token) => (dispatch) => {
  try {
    dispatch({
      type: "AllMyPostRequest",
    });

    const url = "http://localhost:5000/post/v1/allPost";
    axios
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
          type: "AllMyPostSuccess",
          payload: response.data.post,
        });
      })
      .catch(function (error) {
        dispatch({
          type: "AllMyPostFailure",
          payload: error.response.data.message,
        });
      });
  } catch (error) {
    dispatch({
      type: "AllMyPostFailure",
      payload: error.message,
    });
  }
};

export const UpdateUserProfile = (token, name, email) => async (dispatch) => {
  try {
    dispatch({
      type: "UpdateProfileRequest",
    });

    const url = "http://localhost:5000/api/v1/updateProfile";
    await axios
      .put(
        url,
        {
          token,
          name,
          email,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(function (response) {
        dispatch({
          type: "UpdateProfileSuccess",
          payload: response.data.message,
        });
      })
      .catch(function (error) {
        console.log("axios catch error : " + error);
        dispatch({
          type: "UpdateProfileFailure",
          payload: error.response.data.message,
        });
      });
  } catch (error) {
    dispatch({
      type: "UpdateProfileFailure",
      payload: error.message,
    });
  }
};
export const UpdateUserPassword =
  (token, oldPassword, newPassword) => async (dispatch) => {
    try {
      dispatch({
        type: "UpdatePasswordRequest",
      });

      const url = "http://localhost:5000/api/v1/updatePassword";
      await axios
        .put(
          url,
          {
            token,
            oldPassword,
            newPassword,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then(function (response) {
          dispatch({
            type: "UpdatePasswordSuccess",
            payload: response.data.message,
          });
        })
        .catch(function (error) {
          console.log("axios catch error : " + error);
          dispatch({
            type: "UpdatePasswordFailure",
            payload: error.response.data.message,
          });
        });
    } catch (error) {
      console.log("try catch error : " + error);
      dispatch({
        type: "UpdatePasswordFailure",
        payload: error.message,
      });
    }
  };

export const UserLogout = (token) => (dispatch) => {
  try {
    dispatch({
      type: "LogoutUserRequest",
    });

    const url = "http://localhost:5000/api/v1/logout";
    axios
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
          type: "LogoutUsertSuccess",
          payload: response.data.message,
        });
      })
      .catch(function (error) {
        dispatch({
          type: "LogoutUserFailure",
          payload: error.response.data.message,
        });
      });
  } catch (error) {
    dispatch({
      type: "LogoutUserFailure",
      payload: error.message,
    });
  }
};

export const DeleteAccount = (token) => (dispatch) => {
  try {
    dispatch({
      type: "DeleteProfileRequest",
    });

    const url = "http://localhost:5000/api/v1/deleteMyProfile";
    axios
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
          type: "DeleteProfileSuccess",
          payload: response.data.message,
        });
      })
      .catch(function (error) {
        dispatch({
          type: "DeleteProfileFailure",
          payload: error.response.data.message,
        });
      });
  } catch (error) {
    dispatch({
      type: "DeleteProfileFailure",
      payload: error.message,
    });
  }
};

export const ViewUserProfile = (token, id) => async (dispatch) => {
  try {
    dispatch({
      type: "ViewProfileRequest",
    });

    const url = `http://localhost:5000/api/v1/otherUser/${id}`;
    await axios
      .post(
        url,
        { token },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(function (response) {
        dispatch({
          type: "ViewProfileSuccess",
          payload: response.data.user,
        });
      })
      .catch(function (error) {
        dispatch({
          type: "ViewProfileFailure",
          payload: error.response.data.message,
        });
      });
  } catch (error) {
    dispatch({
      type: "ViewProfileFailure",
      payload: error.message,
    });
  }
};

export const FollowToUser = (token, id) => async (dispatch) => {
  try {
    dispatch({
      type: "FollowRequest",
    });

    const url = `http://localhost:5000/api/v1/follow/${id}`;
    await axios
      .post(
        url,
        { token },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(function (response) {
        dispatch({
          type: "FollowSuccess",
          payload: response.data.message,
        });
      })
      .catch(function (error) {
        dispatch({
          type: "FollowFailure",
          payload: error.response.data.message,
        });
      });
  } catch (error) {
    dispatch({
      type: "FollowFailure",
      payload: error.message,
    });
  }
};

export const ForgotPasswordAction = (email) => async (dispatch) => {
  try {
    dispatch({
      type: "ForgotPasswordRequest",
    });

    const url = "http://localhost:5000/api/v1/forgotPassword";
    await axios
      .post(
        url,
        {
          email,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(function (response) {
        dispatch({
          type: "ForgotPasswordSuccess",
          payload: response.data.message,
        });
      })
      .catch(function (error) {
        console.log("axios catch error : " + error);
        dispatch({
          type: "ForgotPasswordFailure",
          payload: error.response.data.message,
        });
      });
  } catch (error) {
    console.log("try catch error : " + error);
    dispatch({
      type: "ForgotPasswordFailure",
      payload: error.message,
    });
  }
};

export const ResetPasswordAction =
  (token, id, password) => async (dispatch) => {
    try {
      dispatch({
        type: "UpdatePasswordRequest",
      });

      const url = `http://localhost:5000/api/v1/password/reset/${id}`;
      await axios
        .post(
          url,
          {
            token,
            password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then(function (response) {
          dispatch({
            type: "UpdatePasswordSuccess",
            payload: response.data.message,
          });
        })
        .catch(function (error) {
          console.log("axios catch error : " + error);
          dispatch({
            type: "UpdatePasswordFailure",
            payload: error.response.data.message,
          });
        });
    } catch (error) {
      console.log("try catch error : " + error);
      dispatch({
        type: "UpdatePasswordFailure",
        payload: error.message,
      });
    }
  };
