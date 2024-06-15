import getCurrentUser from "@/actions/getCurrentUser";
import Image from "next/image";
import React from "react";
import { IoGameController } from "react-icons/io5";

const page = async () => {
  const currentUser = await getCurrentUser();
  return (
    <div className="h-60 bg-gradient-to-r from-blue-500 to-purple-400 m-2 rounded-lg flex justify-between items">
      <div className="p-10">
        <h1 className="text-secondary-50 font-bold text-2xl">
          Back to play {currentUser?.name} 👋
        </h1>
        <h1 className="font-semibold mt-4 text-3xl  text-slate-200 pe-8">
          Play. Learn. Excel: Where Gaming Meets Education!
        </h1>
      </div>
      <div className="pe-40">
        <Image
          src="https://cdn-icons-png.flaticon.com/512/5346/5346469.png"
          alt=""
          height="200"
          width="100"
          className="absolute right-10 top-20"
        />
        <Image
          src="https://i.pinimg.com/originals/9d/29/22/9d292240e7ec3d3b3c9d11cefbd4b23a.png"
          alt=""
          height="200"
          width="100"
          className="absolute right-80 top-24 rotate-45"
        />
        <IoGameController className="-rotate-12 text-[150px] mt-12 text-violet-500/60" />
        <Image
          src="https://lordicon.com/icons/wired/gradient/1416-triangle.svg"
          alt=""
          height="200"
          width="100"
          className="absolute right-10 top-52 rotate-12"
        />
        <Image
          src="https://cdn0.iconfinder.com/data/icons/thin-line-color-2/21/22_1-512.png"
          alt=""
          height="200"
          width="100"
          className="absolute right-[340px] top-52 rotate-45"
        />
      </div>
    </div>
  );
};

export default page;
