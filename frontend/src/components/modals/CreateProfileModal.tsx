// import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "../ui/button";
type Inputs = {
  username: string;
  age: number;
};

function CreateProfileModal() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <div
      className={`w-screen h-screen bg-[#222226] fixed inset-0 top-0 left-0 z-50 flex justify-center items-center bg-opacity-80 backdrop-blur-sm`}
    >
      <div className="bg-[black] w-[70%] p-10 rounded-lg flex flex-col gap-8">
        <img
          src="/assets/Robot.png"
          alt=""
          className="h-[300px] w-full object-cover "
        />
        <h3 className="font-bold font-sofia text-4xl text-white text-center">
          CREATE YOUR CENTRIUM PROFILE
        </h3>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          <div className="flex justify-between ">
            <input
              className="w-96 bg-[#F1F1F1] p-1 outline-none font-sofia"
              {...register("username", { required: true })}
            />
            {errors.username && <span>This field is required</span>}
            <input
              {...register("age", { required: true })}
              className="w-96 bg-[#F1F1F1] p-1 outline-none font-sofia"
            />
            {errors.age && <span>This field is required</span>}
          </div>
          <Button type="submit">Create</Button>
        </form>
      </div>
    </div>
  );
}

export default CreateProfileModal;
