"use client";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import ThemeSwitch from "./ThemeSwitch";
import { User } from "@/types/user";
import Image from "next/image";
import useHeartsStore from "@/hooks/useHeartsStore";
import useDiamondsStore from "@/hooks/useDiamondsStore";
import useSuperCoinsStore from "@/hooks/useSuperCoinsStore";
import { useRouter } from "next/navigation";
interface Props {
  currentUser: User;
  menu: boolean;
  setMenu: Dispatch<SetStateAction<boolean>>;
}

const Navbar: React.FC<Props> = ({ currentUser, menu, setMenu }: Props) => {
  const router = useRouter();
  const { hearts,setHearts } = useHeartsStore();
  const { diamonds,setDiamonds } = useDiamondsStore();
  const { superCoins,setSuperCoins} = useSuperCoinsStore()



  useEffect(() => {
    setHearts(currentUser?.hearts);
    setDiamonds(currentUser?.diamonds);
    setSuperCoins(currentUser?.supercoins);

  } , []);
  

  return (
    <div className="shadow-md px-4 z-50 sticky top-0 backdrop-blur-3xl">
      <div className="flex items-center justify-end px-16 py-3">
        <div className="flex gap-2 items-center">
          {currentUser?.role == "ADMIN" && (
            <h1 className="text-sm font-medium">ADMIN</h1>
          )}
          <div
            className="flex items-center gap-3 rounded-lg cursor-pointer p-2 px-3 dark:hover:bg-secondary-800 hover:bg-secondary-300"
            onClick={() => router.push("/shop")}
          >
            <Image src="/diamond.png" width={20} height={20} alt="diamond" />
            <h1>{diamonds}</h1>
          </div>
          <div
            className="flex items-center gap-3 rounded-lg cursor-pointer p-2 px-3 dark:hover:bg-secondary-800 hover:bg-secondary-300"
            onClick={() => router.push("/shop")}
          >
            <Image src="/heart.png" width={20} height={20} alt="heart" />
            <h1>{hearts}</h1>
          </div>
          <div
            className="flex items-center gap-3 rounded-lg cursor-pointer p-2 px-3 dark:hover:bg-secondary-800 hover:bg-secondary-300"
            onClick={() => router.push("/shop")}
          >
            <Image src="/Supercoin.png" width={20} height={20} alt="heart" />
            <h1>{superCoins}</h1>
          </div>
          <ThemeSwitch />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
