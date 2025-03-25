// import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "../ui/button";
import { useCentriumHooks } from "../../AppServices/CentriumHooks";
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

  const { createProfile } = useCentriumHooks();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    createProfile(data.username, data.age).then((res) =>
      console.log("The transaction hash is: " + res)
    );
    console.log(data);
  };
  return (
    <div
      className={`w-screen h-screen bg-[#222226] fixed inset-0 top-0 left-0 z-50 flex justify-center items-center bg-opacity-80 backdrop-blur-sm`}
    >
      <div
        className="w-[70%] p-10 rounded-lg flex flex-col gap-5"
        style={{ backgroundImage: `url(${"/Landing2.png"})` }}
      >
        <img
          src="/assets/Robot.png"
          alt=""
          className="h-[300px] w-full rounded-lg object-cover"
        />
        <h3 className="font-bold font-sofia text-4xl text-black [text-shadow:_-1px_-1px_0_#3800A7,1px_-1px_0_#3800A7,-1px_1px_0_#3800A7,1px_1px_0_#3800A7] text-center">
          CREATE YOUR CENTRIUM PROFILE
        </h3>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          <div className="flex justify-between ">
            <input
              placeholder="Username"
              className="w-96 bg-[#F1F1F1] px-2 py-1 rounded-sm font-sofia border focus:border-2 border-[#3800A7] outline-none"
              {...register("username", { required: true })}
            />
            {/* {errors.username && <span>This field is required</span>} */}
            <input
              placeholder="Age"
              {...register("age", { required: true })}
              className="w-96 bg-[#F1F1F1] px-2 py-1 rounded-sm font-sofia  border focus:border-2 border-[#3800A7] outline-none"
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
    </div>
  );
}

export default CreateProfileModal;
