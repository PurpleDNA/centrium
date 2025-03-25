import { useReadContract, useWriteContract } from "wagmi";
import abi from "../ABI/lock-abi.json";
import { useNavigate } from "react-router-dom";
// import { bscTestnet } from "wagmi/chains";
// import { http } from "viem";

export const useCentriumHooks = () => {
  const { writeContractAsync } = useWriteContract();
  const address = "0x101eB58C3141E309943B256C1680D16e91b12055";
  const navigate = useNavigate();

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
  const createProfile = async (name: string, age: number) => {
    try {
      return await writeContractAsync(
        {
          abi,
          address: address,
          functionName: "createProfile",
          args: [name, age],
        }
        // {
        //   onSuccess: (data) => {
        //     console.log(data);
        //   },
        // }
      );
    } catch (error) {
      console.error(">>>>> createProfile Error >>>>>>>" + error);
    }
  };

  //Function to get Profile

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
    createPost,
    getDocumentCount,
    useGetThread,
  };
};
