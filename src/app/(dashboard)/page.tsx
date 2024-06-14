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
      </div>
      <div className="pe-40">
        <IoGameController className="-rotate-12 text-[150px] mt-12 text-violet-500/60" />
      </div>
    </div>
  );
};

export default page;
