/* eslint-disable @typescript-eslint/no-explicit-any */
import { useReadContract, useWriteContract } from "wagmi";
import abi from "../ABI/lock-abi.json";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  updateUserProfile,
  userProfile,
} from "@/Redux/Slices/userProfileSlice";

export const useCentriumHooks = () => {
  const { writeContractAsync } = useWriteContract();
  const address = "0x101eB58C3141E309943B256C1680D16e91b12055";
  const navigate = useNavigate();
  const dispatch = useDispatch();
  type profType = (string | number | boolean | string[])[];

  // Get Document Count
  const { data } = useReadContract({
    abi,
    address: address,
    functionName: "getDocumentCount",
  });
  const getDocumentCount = () => {
    if (data) {
      const count = data;
      return count;
    }
  };

  // Function to create Profile
  const createProfile = async (
    name: string,
    age: number,
    sender: `0x${string}`
  ) => {
    try {
      await writeContractAsync(
        {
          abi,
          address: address,
          functionName: "createProfile",
          args: [name, age],
        },
        {
          onError: (data) => {
            console.log(data);
            throw new Error("Create Profile Failed");
          },
        }
      ).then(() => {
        updateProfile({
          isAccount: true,
          walletAddress: sender,
          username: name,
          age,
          online: true,
          followers: 0,
          following: 0,
          bio: "",
        });
      });
    } catch (error) {
      console.error(">>>>> createProfile Error >>>>>>>" + error);
    }
  };

  //Function to updateProfile
  const updateProfile = ({
    isAccount,
    walletAddress,
    username,
    age,
    online,
    followers,
    following,
    bio,
  }: userProfile) => {
    try {
      dispatch(
        updateUserProfile({
          isAccount,
          walletAddress,
          username,
          age,
          online,
          followers,
          following,
          bio,
        })
      );
      console.log("User Profile Succesfully Updated");
      // window.location.reload();
    } catch (error) {
      console.error(">>>>> updateProfile Error >>>>>>>" + error);
    }
  };

  const useGetProfile = (sender: `0x${string}`) => {
    try {
      const Profile = useReadContract({
        abi,
        address,
        functionName: "getProfile",
        args: [sender],
      });

      const User = Profile.data as profType;
      if (User) {
        const ProfileData: userProfile = {
          isAccount: true,
          walletAddress: sender,
          username: String(User[0]),
          age: Number(String(User[1]).slice(0, String(User[1]).length)),
          online: Boolean(User[2]),
          following: Number(Array(User[3]).length),
          followers: Number(Array(User[4]).length),
        };
        updateProfile(ProfileData);
      }
      console.log(User);
      return User;
    } catch (error) {
      console.error(">>>>> getProfile Error >>>>>>>" + error);
    }
  };

  //Function to create Document/Post
  const createPost = async (title: string, content: string) => {
    try {
      return await writeContractAsync(
        {
          abi,
          address: address,
          functionName: "store",
          args: [title, content],
        }
        // {
        //   onSuccess: (data) => {
        //     console.log(data);
        //   },
        // }
      ).then(() => {
        const count = data;
        navigate(`/post/${count}`);
        return count;
      });
    } catch (error) {
      console.error(">>>>> createPost Error >>>>>>>" + error);
    }
  };

  //Function to get Thread Post
  const useGetThread = (index: number) => {
    const post = useReadContract({
      abi,
      address: address,
      functionName: "getDocument",
      args: [index],
    });
    console.log(post);
    return post.data;
  };

  return {
    createProfile,
    updateProfile,
    createPost,
    getDocumentCount,
    useGetThread,
    useGetProfile,
  };
};
