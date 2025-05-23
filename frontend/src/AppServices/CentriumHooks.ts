import { useNavigate } from "react-router-dom";
import {
  http,
  createConfig,
  waitForTransactionReceipt,
  // watchContractEvent,
} from "@wagmi/core";
import { bscTestnet } from "@wagmi/core/chains";
import {
  useReadContract,
  useWriteContract,
  useWatchContractEvent,
} from "wagmi";
import { readContract } from "@wagmi/core";
import abi from "../ABI/lock-abi.json";
import { useDispatch } from "react-redux";
import {
  updateUserProfile,
  userProfile,
} from "@/Redux/Slices/userProfileSlice";
import { useState } from "react";
import { useAccount } from "wagmi";

export const useCentriumHooks = () => {
  const navigate = useNavigate();
  const account = useAccount();
  const senderAddy = account.address;
  type profType = (string | number | boolean | string[])[];
  const { writeContractAsync } = useWriteContract();
  const address = "0x101eB58C3141E309943B256C1680D16e91b12055";
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const config = createConfig({
    chains: [bscTestnet],
    transports: {
      [bscTestnet.id]: http(`https://data-seed-prebsc-2-s1.bnbchain.org:8545`),
    },
  });

  useWatchContractEvent({
    abi,
    address,
    eventName: "PostCreated",
    onLogs(logs) {
      const logArgs = logs[0] as unknown as {
        args: { author: string; postHash: string };
      };
      console.log("Return value:", logArgs.args);
      const args = logArgs.args;
      if (args.author === senderAddy) {
        navigate(`/post/${args.postHash}`);
      }
    },
    pollingInterval: 1_000,
  });

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
            const message = data as unknown as { shortMessage: string };
            throw new Error("Failed: " + message.shortMessage);
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
    // setIsLoading(true)
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
    } finally {
      // setIsLoading(false)
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
      // console.log(Profile);
    } catch (error) {
      console.error("getProfile Error >>>>>>>" + error);
      window.location.reload();
    } finally {
      setIsLoading(false);
    }
  };

  //Function to create ThreadPost
  const createThread = async (
    title: string,
    content: string,
    tags: string[]
  ) => {
    try {
      const hash = await writeContractAsync(
        {
          abi,
          address: address,
          functionName: "createPost",
          args: [title, content, tags],
        },
        {
          onError: (data) => {
            const message = data as unknown as { shortMessage: string };
            throw new Error("Failed: " + message.shortMessage);
          },
        }
      );

      const receipt = await waitForTransactionReceipt(config, { hash });

      if (receipt.status === "reverted") {
        throw new Error("Create Thread Failed");
      }
    } catch (error) {
      console.error("createPost Error >>>>>>>" + error);
    }
  };

  const createGuide = async (
    title: string,
    content: (string | number)[][],
    description: string,
    tags: string[]
  ) => {
    try {
      const hash = await writeContractAsync(
        {
          abi,
          address: address,
          functionName: "createGuidePost",
          args: [title, content, description, tags],
        },
        {
          onError: (data) => {
            const message = data as unknown as { shortMessage: string };
            throw new Error("Failed: " + message.shortMessage);
          },
        }
      );

      const receipt = await waitForTransactionReceipt(config, { hash });

      if (receipt.status === "reverted") {
        throw new Error("Create Guide Failed");
      }
    } catch (error) {
      console.error("createPost Error >>>>>>>" + error);
    }
  };

  //Function to get Thread Post
  const useGetPost = (fileHash: string) => {
    return useReadContract({
      abi,
      address: address,
      functionName: "getDocumentByHash",
      args: [fileHash],
    });
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
    createGuide,
    useGetPost,
    getProfile,
    // getDocumentCount,
  };
};
