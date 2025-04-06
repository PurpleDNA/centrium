import { createSlice } from "@reduxjs/toolkit";

export interface userProfile {
  isAccount: boolean | undefined;
  walletAddress: `0x${string}` | "";
  username: string;
  age: number;
  online: boolean;
  followers: number;
  following: number;
  followersList?: `0x${string}`[];
  followingList?: `0x${string}`[];
  bio?: string;
}

const initialState: userProfile = {
  isAccount: undefined,
  walletAddress: "",
  username: "",
  age: 0,
  online: false,
  followers: 0,
  following: 0,
  followersList: [],
  followingList: [],
};
export const userProfileSlice = createSlice({
  name: "userProfile",
  initialState,
  reducers: {
    updateUserProfile: (state, action) => {
      // state.isAccount = action.payload.isAccount;
      // state.walletAddress = action.payload.walletAddress;
      // state.username = action.payload.username;
      // state.age = action.payload.age;
      // state.online = action.payload.online;
      // state.followers = action.payload.followers;
      // state.following = action.payload.following;
      return { ...state, ...action.payload };
    },
  },
});

export const { updateUserProfile } = userProfileSlice.actions;
export default userProfileSlice.reducer;
