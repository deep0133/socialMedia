import { createReducer } from "@reduxjs/toolkit";

const initialState = {};

export const userReducer = createReducer(initialState, {
  RegisterRequest: (state) => {
    state.loading = true;
    state.isAuthenticated = false;
  },
  RegisterSuccess: (state, action) => {
    state.loading = false;
    state.user = action.payload;
    state.isAuthenticated = true;
  },
  RegisterFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.isAuthenticated = false;
  },

  loginRequest: (state) => {
    state.loading = true;
    state.isAuthenticated = false;
  },
  loginSuccess: (state, action) => {
    state.loading = false;
    state.user = action.payload;
    state.isAuthenticated = true;
  },
  loginFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.isAuthenticated = false;
  },

  loadUserRequest: (state) => {
    state.loading = true;
    state.isAuthenticated = false;
  },
  loadUsertSuccess: (state, action) => {
    state.loading = false;
    state.user = action.payload;
    state.isAuthenticated = true;
  },
  loadUserFailure: (state, action) => {
    state.loading = false;
    state.isAuthenticated = false;
  },

  LogoutUserRequest: (state) => {
    state.loading = true;
    state.isAuthenticated = false;
  },
  LogoutUsertSuccess: (state, action) => {
    state.loading = false;
    state.isAuthenticated = false;
    state.message = action.payload;
    state.user = null;
  },
  LogoutUserFailure: (state, action) => {
    state.loading = false;
    state.isAuthenticated = true;
    state.error = action.payload;
  },

  DeleteProfileRequest: (state) => {
    state.loading = true;
  },
  DeleteProfileSuccess: (state, action) => {
    state.loading = false;
    state.user = null;
    state.message = action.payload;
    state.isAuthenticated = false;
  },
  DeleteProfileFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.isAuthenticated = false;
  },

  ClearUserMessage: (state, action) => {
    state.message = null;
  },
  ClearUserError: (state, action) => {
    state.error = null;
  },
});

export const postOfFollowingUserReducer = createReducer(initialState, {
  postOfFollowingUserRequest: (state) => {
    state.loading = true;
  },
  postOfFollowingUserSuccess: (state, action) => {
    state.loading = false;
    state.posts = action.payload;
  },
  postOfFollowingUserFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
});

export const allUserReducer = createReducer(initialState, {
  GetAllUserRequest: (state) => {
    state.loading = true;
  },
  GetAllUserSuccess: (state, action) => {
    state.loading = false;
    state.users = action.payload;
  },
  GetAllUserFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  clearError: (state) => {
    state.error = null;
  },
});

export const getAllMyPost = createReducer(initialState, {
  AllMyPostRequest: (state) => {
    state.allMyPostLoading = true;
  },
  AllMyPostSuccess: (state, action) => {
    state.allMyPostLoading = false;
    state.allMyPost = action.payload;
  },
  AllMyPostFailure: (state, action) => {
    state.allMyPostLoading = false;
    state.allMyPostError = action.payload;
  },
});

export const updateUserData = createReducer(initialState, {
  UpdateProfileRequest: (state) => {
    state.udpateLoading = true;
  },
  UpdateProfileSuccess: (state, action) => {
    state.udpateLoading = false;
    state.updateMessage = action.payload;
  },
  UpdateProfileFailure: (state, action) => {
    state.udpateLoading = false;
    state.updateError = action.payload;
  },

  UpdatePasswordRequest: (state) => {
    state.udpateLoading = true;
  },
  UpdatePasswordSuccess: (state, action) => {
    state.udpateLoading = false;
    state.updateMessage = action.payload;
  },
  UpdatePasswordFailure: (state, action) => {
    state.udpateLoading = false;
    state.updateError = action.payload;
  },

  ForgotPasswordRequest: (state) => {
    state.udpateLoading = true;
  },
  ForgotPasswordSuccess: (state, action) => {
    state.udpateLoading = false;
    state.updateMessage = action.payload;
  },
  ForgotPasswordFailure: (state, action) => {
    state.udpateLoading = false;
    state.updateError = action.payload;
  },

  ClearUpdateMessage: (state) => {
    state.updateMessage = null;
  },
  ClearUpdateError: (state) => {
    state.updateError = null;
  },
});

export const viewProfileReducer = createReducer(initialState, {
  ViewProfileRequest: (state) => {
    state.loading = true;
  },
  ViewProfileSuccess: (state, action) => {
    state.loading = false;
    state.viewUser = action.payload;
  },
  ViewProfileFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  ClearViewProfileError: (state) => {
    state.error = null;
  },
});

export const followReducer = createReducer(initialState, {
  FollowRequest: (state) => {
    state.loading = true;
  },
  FollowSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  FollowFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  ClearFollowMessage: (state) => {
    state.message = null;
  },
  ClearFollowError: (state) => {
    state.error = null;
  },
});
