import { useWriteContract } from "wagmi";
import abi from "../ABI/lock-abi.json";

export const useCentriumHooks = () => {
  const { writeContract } = useWriteContract();
  const address = "0x1F10f7525C74d3804759ed6698176E4B0885B9Af";

  const createProfile = (name: string, age: number) => {
    try {
      writeContract({
        abi,
        address: address,
        functionName: "create_profile",
        args: [name, age],
      });
    } catch (error) {
      console.error(">>>>> Error >>>>>>>" + error);
    }
  };
  return {
    createProfile,
  };
};
