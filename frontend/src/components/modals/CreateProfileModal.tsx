// import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "../ui/button";
import { useCentriumHooks } from "../../AppServices/CentriumHooks";
import { useAccount } from "wagmi";
import { motion } from "motion/react";

type Inputs = {
  username: string;
  age: number;
};

function CreateProfileModal() {
  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm<Inputs>();
  const { address } = useAccount();

  const { createProfile } = useCentriumHooks();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (address) {
      await createProfile(data.username, data.age, address);
      console.log(data);
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, x: 100 }}
      className={`w-screen h-screen bg-[#222226] fixed inset-0 top-0 left-0 z-50 flex justify-center items-center bg-opacity-80 backdrop-blur-sm`}
    >
      <div
        className="w-[70%] p-10 rounded-lg flex flex-col gap-3"
        style={{ backgroundImage: `url(${"/Landing2.png"})` }}
      >
        <img
          src="/assets/Robot.png"
          alt=""
          className="h-[200px] lg:h-[300px] w-full rounded-lg object-cover"
        />
        <p className="font-bold font-sofia text-sm  text-white [text-shadow:_-1px_-1px_0_#3800A7,1px_-1px_0_#3800A7,-1px_1px_0_#3800A7,1px_1px_0_#3800A7] text-center">
          {" "}
          You are only a step away{" "}
        </p>
        <h3 className="font-bold font-sofia text-lg lg:text-4xl  text-black [text-shadow:_-1px_-1px_0_#3800A7,1px_-1px_0_#3800A7,-1px_1px_0_#3800A7,1px_1px_0_#3800A7] text-center">
          CREATE YOUR CENTRIUM ACCOUNT
        </h3>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          <div className="flex justify-between flex-col md:flex-row items-center gap-3">
            <input
              placeholder="Username"
              className="w-2/3 bg-[#F1F1F1] px-2 py-1 text-sm rounded-sm font-sofia border focus:border-2 border-[#3800A7] outline-none"
              {...register("username", { required: true })}
            />
            {/* {errors.username && <span>This field is required</span>} */}
            <input
              placeholder="Age"
              {...register("age", { required: true })}
              className="w-2/3 text-sm bg-[#F1F1F1] px-2 py-1 rounded-sm font-sofia  border focus:border-2 border-[#3800A7] outline-none"
            />
            {/* {errors.age && (
              <span className="text-white">This field is required</span>
            )} */}
          </div>
          <Button
            className=" bg-[#3800A7] hover:bg-[#1e0846] text-white w-max mx-auto hover:-translate-y-1 transition-all duration-300 mt-1"
            type="submit"
          >
            Create
          </Button>
        </form>
      </div>
    </motion.div>
  );
}

export default CreateProfileModal;
