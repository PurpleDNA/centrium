// import React from "react";

interface NotifProps {
  type: string;
  stats: string;
  info?: string;
  time: string;
}
function Notifs({ type, stats, info, time }: NotifProps) {
  return (
    <div className="flex w-full items-start gap-3 px-3 py-4 border-b border-slate-300 cursor-pointer hover:bg-slate-100">
      <div className="rounded-full bg-[#3800A7] p-2">
        <img src={type} alt="" className="w-5" />
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="font-sofia text-base font-semibold">{stats}</h1>
        <p className="font-poppins text-sm">{info}</p>
        <p className="text-[10px] font-sofia text-slate-600">
          {time} hours ago
        </p>
      </div>
    </div>
  );
}

export default Notifs;
