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
import { useCallback, useState, useMemo } from "react";
import { useAccount } from "wagmi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import thread from "../assets/thread.png";
import guide from "../assets/guides.png";

export const useCentriumHooks = () => {
  // console.log("hooking");
  const config = useMemo(() => {
    return createConfig({
      chains: [bscTestnet],
      transports: {
        [bscTestnet.id]: http(
          `https://data-seed-prebsc-2-s1.bnbchain.org:8545`
        ),
      },
    });
  }, []);
  const address = "0x101eB58C3141E309943B256C1680D16e91b12055";
  const navigate = useNavigate();
  const account = useAccount();
  const senderAddy = account.address;
  const { writeContractAsync } = useWriteContract();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);
  type profType = (string | number | boolean | string[])[];
  type postType = (string | number | boolean | string[])[];

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

  // Get Document Count
  const { data: DocumentCount } = useReadContract({
    abi,
    address: address,
    functionName: "getDocumentCount",
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
      } else {
        toast.success("Profile created successfully");
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
      toast.error("Create Profile Failed");
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
    } finally {
      // setIsLoading(false)
    }
  };

  //Function to getProfile
  const getProfile = useCallback(
    async (sender: `0x${string}`) => {
      try {
        const Profile = (await readContract(config, {
          abi,
          address,
          functionName: "getProfile",
          args: [sender],
        })) as profType;

        if (Profile[0]) {
          const ProfileData: userProfile = {
            isAccount: true,
            walletAddress: sender,
            username: String(Profile[0]),
            age: Number(String(Profile[1]).slice(0, String(Profile[1]).length)),
            online: Boolean(Profile[2]),
            following: (Profile[3] as []).length,
            followers: (Profile[4] as []).length,
            followingList: Profile[3] as `0x${string}`[],
            followersList: Profile[4] as `0x${string}`[],
            // following: Number(Array(Profile[3]).length),
            // followers: Number(Array(Profile[4]).length),
          };
          if (sender === senderAddy) {
            dispatch(updateUserProfile(ProfileData));
            sessionStorage.setItem("userSession", "true");
            return ProfileData;
          } else {
            return ProfileData;
          }
        } else {
          const ProfileData = {
            isAccount: false,
          };
          dispatch(updateUserProfile(ProfileData));
        }
        // console.log(Profile);
      } catch (error) {
        console.error("getProfile Error >>>>>>>" + error);
        // window.location.reload();
      } finally {
        // setIsLoading(false);
      }
    },
    [config, dispatch, senderAddy]
  );

  //Function to create ThreadPost
  const createThread = async (
    title: string,
    content: string,
    tags: string[]
  ) => {
    try {
      setIsInteracting(true);
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
      } else {
        toast.success("Thread created successfully");
      }
    } catch (error) {
      console.error("createPost Error >>>>>>>" + error);
      toast.error("Create thread failed");
    } finally {
      setIsInteracting(false);
    }
  };

  //Function to create GuidePOst
  const createGuide = async (
    title: string,
    content: string,
    description: string,
    tags: string[]
  ) => {
    try {
      setIsInteracting(true);
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
      } else {
        toast.success("Guide created successfully");
      }
    } catch (error) {
      console.error("createPost Error >>>>>>>" + error);
      toast.error("create guide failed");
    } finally {
      setIsInteracting(false);
    }
  };

  //Function to create comment
  const createComment = async (id: string, content: string) => {
    try {
      setIsInteracting(true);
      const hash = await writeContractAsync(
        {
          abi,
          address: address,
          functionName: "commentOnPost",
          args: [id, content],
        },
        {
          onError: (data) => {
            const message = data as unknown as { shortMessage: string };
            throw new Error("Failed: " + message.shortMessage);
          },
        }
      );
      // return "comment created";

      const receipt = await waitForTransactionReceipt(config, { hash });

      if (receipt.status === "reverted") {
        throw new Error("Create Comment Failed");
      } else {
        toast.success("comment created");
      }
    } catch (error) {
      console.error("createComment Error >>>>>>>" + error);
      toast.error("create comment failed");
    } finally {
      setIsInteracting(false);
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

  // Function to get Post Async
  const getPostAsync = useCallback(
    async (fileHash: string) => {
      try {
        const post = await readContract(config, {
          abi,
          address: address,
          functionName: "getDocumentByHash",
          args: [fileHash],
        });
        return post;
      } catch (error) {
        console.error("getPostAsync Error >>>>>>>" + error);
      }
    },
    [config]
  );

  //Function to save post to drafts
  const saveToDrafts = async (
    title: string,
    content: string | (string | number)[][],
    tags: string[],
    description: string,
    isGuide: boolean
  ) => {
    try {
      setIsInteracting(true);
      const hash = await writeContractAsync(
        {
          abi,
          address: address,
          functionName: "saveToDrafts",
          args: [title, content, tags, description, isGuide],
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
        throw new Error("Save to Drafts Failed");
      } else {
        toast.success("Saved to Drafts");
      }
    } catch (error) {
      console.error("saveDraft Error >>>>>>>" + error);
      toast.error("Couldn't save to drafts");
    } finally {
      setIsInteracting(false);
    }
  };

  //Like post
  const likePost = async (postHash: string) => {
    try {
      setIsInteracting(true);
      const hash = await writeContractAsync(
        {
          abi,
          address: address,
          functionName: "likePost",
          args: [postHash],
        },
        {
          onError: (data) => {
            const message = data as unknown as { shortMessage: string };
            throw new Error("Failed: " + message.shortMessage);
          },
          onSuccess: () => {
            toast.success("Post Liked");
          },
        }
      );

      const receipt = await waitForTransactionReceipt(config, { hash });

      if (receipt.status === "reverted") {
        throw new Error("Like Post Failed");
      }
      // else {
      //   toast.success("Post Liked");
      // }
    } catch (error) {
      console.error("likePost Error >>>>>>>" + error);
      toast.error("Couldn't like post");
    }
  };

  //Dislike Post
  const dislikePost = async (postHash: string) => {
    try {
      setIsInteracting(true);
      const hash = await writeContractAsync(
        {
          abi,
          address: address,
          functionName: "dislikePost",
          args: [postHash],
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
        throw new Error("Dislike Post Failed");
      } else {
        toast.success("Post disLiked");
      }
    } catch (error) {
      console.error("DislikePost Error >>>>>>>" + error);
      toast.error("Couldn't dislike post");
    }
  };

  //Follow User
  const follow = async (user: `0x${string}`) => {
    try {
      setIsInteracting(true);
      const hash = await writeContractAsync(
        {
          abi,
          address: address,
          functionName: "follow",
          args: [user],
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
        throw new Error("Follow User Failed");
      } else {
        getProfile(senderAddy!);
        toast.success("Following");
      }
    } catch (error) {
      console.error("Follow User Error >>>>>>>" + error);
      toast.error("Couldn't Follow");
    }
  };

  //unfollow User
  const unfollow = async (user: `0x${string}`) => {
    try {
      setIsInteracting(true);
      const hash = await writeContractAsync(
        {
          abi,
          address: address,
          functionName: "unfollow",
          args: [user],
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
        throw new Error("Unfollow User Failed");
      } else {
        getProfile(senderAddy!);
        toast.success("Unfollowed");
      }
    } catch (error) {
      console.error("Unfollow User Error >>>>>>>" + error);
      toast.error("Couldn't unfollow");
    }
  };

  // Get All Posts
  const getAllPosts = useCallback(
    async (offset: number = 1) => {
      try {
        if (DocumentCount) {
          const posts = (await readContract(config, {
            abi,
            address: address,
            functionName: "getAllDocuments",
            args: [DocumentCount, offset],
          })) as postType[];
          const postArray = [];
          for (let i = 0; i < posts[0].length; i++) {
            postArray.push(await getPostAsync(posts[0][i] as string));
          }
          const finalResult = postArray.map((res, i) => {
            const post = [...(res as unknown[]), posts[0][i]];
            return post;
          });
          return finalResult;
        }
      } catch (error) {
        console.error("getAllPosts Error >>>>>>>" + error);
      }
    },
    [DocumentCount, config, getPostAsync]
  );

  //format date
  const formatDate = useCallback((bigInt: number) => {
    const timestamp = Number(String(bigInt).slice(0, String(bigInt).length));
    const date = new Date(timestamp * 1000); // Convert seconds to milliseconds
    const day = String(date.getUTCDate()).padStart(2, "0");
    const month = date.toLocaleString("en-US", {
      month: "short",
      timeZone: "UTC",
    }); // Get short month name
    const year = date.getUTCFullYear();

    return `${day} ${month} ${year}`;
  }, []);

  //calculate estimated time to read
  const estTime = useCallback((content: string) => {
    const wordNum = content.trim().split(/\s+/).length;
    if (wordNum / 220 < 1) {
      return 1;
    } else {
      return Math.round(wordNum / 220);
    }
  }, []);

  //Format All Posts
  const formatAllPosts = useCallback(async () => {
    try {
      const result = (await getAllPosts()) as postType[];
      if (result) {
        const feedObject = result.map(async (post) => {
          const user = await getProfile(post[0] as `0x${string}`);
          const username = user!.username;
          const userAddr = user!.walletAddress;
          const date = formatDate(post[5] as number);
          const postType = post[4] ? guide : thread;
          const isGuide = post[4];
          const title = "Placeholder until Marv delivers";
          const desc = trimToFirst40Words(post[3] as string);
          const demo = trimToFirst40Words(post[1] as string);
          const tags = post[2] as string[];
          const duration = estTime(post[1] as string);
          const timestamp = post[5];
          const postHash = post[post.length - 1];

          return {
            username,
            userAddr,
            date,
            postType,
            title,
            desc,
            demo,
            tags,
            duration,
            timestamp,
            postHash,
            isGuide,
          };
        });
        const feed = await Promise.all(feedObject);
        const reverseIt = feed.sort(
          (a, b) => Number(b.timestamp) - Number(a.timestamp)
        );
        return reverseIt;
      }
    } catch (error) {
      console.error("formatAllPosts Error >>>>>>>" + error);
    }
  }, [estTime, formatDate, getAllPosts, getProfile]);

  //format big integer I guess
  const formatBigInt = useCallback((bigInt: number) => {
    const formatted = Number(String(bigInt).slice(0, String(bigInt).length));
    return formatted;
  }, []);
  //Trim to fiest 40 words to get content
  function trimToFirst40Words(essay: string) {
    return essay.split(/\s+/).slice(0, 40).join(" ");
  }

  //Truncate Address
  const truncateAddress = useCallback((address: `0x${string}`) => {
    const result = address.slice(0, 6) + "....." + address.slice(-5);
    return result;
  }, []);

  return {
    isLoading,
    setIsLoading,
    isInteracting,
    setIsInteracting,
    createProfile,
    updateProfile,
    createThread,
    createGuide,
    useGetPost,
    getProfile,
    createComment,
    getPostAsync,
    saveToDrafts,
    likePost,
    dislikePost,
    follow,
    unfollow,
    getAllPosts,
    DocumentCount,
    formatDate,
    estTime,
    formatBigInt,
    formatAllPosts,
    trimToFirst40Words,
    truncateAddress,
  };
};
