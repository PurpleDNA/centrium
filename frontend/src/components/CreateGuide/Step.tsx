// import React from 'react'
import { X } from "lucide-react";
import { FC, useContext } from "react";
import Editor from "../Editor/Editor2";
import { Context } from "@/Contexts/Context";
interface Props {
  number: number;
}
export const Step: FC<Props> = (props) => {
  const useSafeContext = () => {
    const context = useContext(Context);
    if (!context) {
      throw new Error("useSafeContext must be used within a ContextProvider");
    }
    return context;
  };
  const { steps, setSteps } = useSafeContext();
  const removeStep = (value: number) => {
    if (steps.length === 1) {
      return;
    } else {
      const newSteps = steps.filter((_step, i) => i + 1 !== value);
      setSteps(newSteps);
      console.log(newSteps);
    }
  };
  return (
    <div className="px-4 pt-1 pb-4 w-4/5 flex flex-col gap-3 mx-auto bg-slate-50 border border-[#3800A7] rounded-md mb-5">
      <div className="flex justify-end">
        <X
          onClick={() => removeStep(props.number)}
          className="w-4 ml-2 cursor-pointer"
        />
      </div>
      <div className="flex gap-2 items-start">
        <div className="w-max  rounded-sm px-1 bg-slate-300 text-sm font-sofia text-[#FA9631]">
          {props.number}
        </div>
        <div className="w-full">
          <Editor editorIndex={props.number - 1}/>
        </div>
      </div>
    </div>
  );
};

export default Step;
