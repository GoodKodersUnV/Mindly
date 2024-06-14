"use client";
import React, { Dispatch, SetStateAction } from "react";
import ThemeSwitch from "./ThemeSwitch";
import {  useRouter } from "next/navigation";
import { User } from "@/types/user";
import Image from "next/image";
interface Props {
  currentUser: User;
  menu: boolean;
  setMenu: Dispatch<SetStateAction<boolean>>;
}

const Navbar: React.FC<Props> = ({ currentUser, menu, setMenu }: Props) => {
  const router = useRouter();

  return (
    <div className="shadow-md px-2 z-50 sticky top-0 backdrop-blur-3xl">
      <div className="flex items-center justify-end px-16 py-3">
        <div className="flex gap-6 items-center">
          {currentUser?.role == "ADMIN" && (
            <h1 className="text-sm font-medium">ADMIN</h1>
          )}
          <div className="flex items-center gap-3 rounded-lg cursor-pointer p-2 px-3 hover:bg-secondary-800">
            <Image src="/diamond.png" width={20} height={20} alt="diamond" />
            <h1>{currentUser?.diamonds}</h1>
          </div>
          <div className="flex items-center gap-3 rounded-lg cursor-pointer p-2 px-3 hover:bg-secondary-800">
            <Image src="/heart.png" width={20} height={20} alt="heart" />
            <h1>{currentUser?.hearts}</h1>
          </div>
          <div className="flex items-center gap-3 rounded-lg cursor-pointer p-2 px-3 hover:bg-secondary-800">
            <Image src="/Supercoin.png" width={20} height={20} alt="heart" />
            <h1>{currentUser?.supercoins}</h1>
          </div>
          <ThemeSwitch />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
