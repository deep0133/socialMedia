import { configureStore } from "@reduxjs/toolkit";
import {
  userReducer,
  postOfFollowingUserReducer,
  allUserReducer,
  getAllMyPost,
  updateUserData,
  viewProfileReducer,
  followReducer,
} from "./Reducer/User";
import { PostReducer } from "./Reducer/Post";

const store = configureStore({
  reducer: {
    user: userReducer,
    posts: postOfFollowingUserReducer,
    allUser: allUserReducer,
    postAction: PostReducer,
    myPost: getAllMyPost,
    updateProfile: updateUserData,
    viewProfile: viewProfileReducer,
    followToUser: followReducer,
  },
});

export default store;
