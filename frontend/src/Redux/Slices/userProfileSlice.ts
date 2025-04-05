import { createSlice } from "@reduxjs/toolkit";

export interface userProfile {
  isAccount: boolean | undefined;
  walletAddress: `0x${string}`;
  username: string;
  age: number;
  online: boolean;
  followers: number;
  following: number;
  bio?: string;
}

const initialState: userProfile = {
  isAccount: undefined,
  walletAddress: "0x",
  username: "",
  age: 0,
  online: false,
  followers: 0,
  following: 0,
};
export const userProfileSlice = createSlice({
  name: "userProfile",
  initialState,
  reducers: {
    updateUserProfile: (state, action) => {
      state.isAccount = action.payload.isAccount;
      state.walletAddress = action.payload.walletAddress;
      state.username = action.payload.username;
      state.age = action.payload.age;
      state.online = action.payload.online;
      state.followers = action.payload.followers;
      state.following = action.payload.following;
    },
  },
});

export const { updateUserProfile } = userProfileSlice.actions;
export default userProfileSlice.reducer;
