// import { useNavigate } from "react-router-dom";
import { http, createConfig, waitForTransactionReceipt } from "@wagmi/core";
import { bscTestnet } from "@wagmi/core/chains";
import { useReadContract, useWriteContract } from "wagmi";
import { readContract } from "@wagmi/core";
import abi from "../ABI/lock-abi.json";
import { useDispatch } from "react-redux";
import {
  updateUserProfile,
  userProfile,
} from "@/Redux/Slices/userProfileSlice";
import { useState } from "react";

export const useCentriumHooks = () => {
  // const navigate = useNavigate();

  const config = createConfig({
    chains: [bscTestnet],
    transports: {
      [bscTestnet.id]: http(`https://data-seed-prebsc-2-s1.bnbchain.org:8545`),
    },
  });
  type profType = (string | number | boolean | string[])[];
  const { writeContractAsync } = useWriteContract();
  const address = "0x101eB58C3141E309943B256C1680D16e91b12055";
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  // Function to create Profile
  const createProfile = async (
    name: string,
    age: number,
    sender: `0x${string}`
  ) => {
    setIsLoading(true);
    try {
      const hash = await writeContractAsync(
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
      );

      const receipt = await waitForTransactionReceipt(config, { hash });

      if (receipt.status === "reverted") {
        throw new Error("Create Profile Failed");
      }

      if (receipt.status === "success") {
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
      }
    } catch (error) {
      console.error("createProfile Error >>>>>>>" + error);
    } finally {
      setIsLoading(false);
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
    } catch (error) {
      console.error("updateProfile Error >>>>>>>" + error);
    }
  };

  //Function to getProfile
  const getProfile = async (sender: `0x${string}`) => {
    try {
      setIsLoading(true);
      const Profile = (await readContract(config, {
        abi,
        address,
        functionName: "getProfile",
        args: [sender],
      })) as profType;

      if (Profile) {
        if (Profile[0]) {
          const ProfileData: userProfile = {
            isAccount: true,
            walletAddress: sender,
            username: String(Profile[0]),
            age: Number(String(Profile[1]).slice(0, String(Profile[1]).length)),
            online: Boolean(Profile[2]),
            following: Number(Array(Profile[3]).length),
            followers: Number(Array(Profile[4]).length),
          };
          dispatch(updateUserProfile(ProfileData));
          sessionStorage.setItem("userSession", "true");
        } else {
          const ProfileData: userProfile = {
            isAccount: false,
            walletAddress: "0x",
            username: "",
            age: 0,
            online: false,
            following: 0,
            followers: 0,
          };
          dispatch(updateUserProfile(ProfileData));
        }
      }
      console.log(Profile);
      return Profile;
    } catch (error) {
      console.error("getProfile Error >>>>>>>" + error);
    } finally {
      setIsLoading(false);
    }
  };

  //Function to create ThreadPost
  const createThread = async (title: string, content: string) => {
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
      );
      // .then(() => {
      //   const count = data;
      //   navigate(`/post/${count}`);
      //   return count;
      // });
    } catch (error) {
      console.error("createPost Error >>>>>>>" + error);
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

  // Get Document Count
  // const { data } = useReadContract({
  //   abi,
  //   address: address,
  //   functionName: "getDocumentCount",
  // });
  // const getDocumentCount = () => {
  //   if (data) {
  //     const count = data;
  //     return count;
  //   }
  // };

  return {
    isLoading,
    setIsLoading,
    createProfile,
    updateProfile,
    createThread,
    useGetThread,
    getProfile,
    // getDocumentCount,
  };
};
