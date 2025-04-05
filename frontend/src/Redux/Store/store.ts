import { configureStore } from "@reduxjs/toolkit";
import userProfileReducer from "../Slices/userProfileSlice";
export default configureStore({
  reducer: {
    userProfile: userProfileReducer,
  },
});
