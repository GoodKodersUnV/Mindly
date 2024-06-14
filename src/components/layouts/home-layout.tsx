"use client";
import Navbar from "../navbar/Navbar";
import Sidebar from "../sidebar/sidebar";
import { RxDashboard } from "react-icons/rx";
import { SiGooglegemini } from "react-icons/si";
import { FaShop } from "react-icons/fa6";
import { GiGraduateCap } from "react-icons/gi";
import { MdOutlineLeaderboard } from "react-icons/md";
import { Suspense, useState } from "react";
import Loading from "@/app/(dashboard)/loading";
import { User } from "@/types/user";

export default function HomeLayout({
  children,
  currentUser,
}: {
  children: React.ReactNode;
  currentUser: User;
}) {
  const [menu, setMenu] = useState<boolean>(true);
  const items = [
    {
      name: "Dashboard",
      icon: <RxDashboard />,
      path: "/",
    },
    {
      name: "Learn",
      icon: <GiGraduateCap />,
      path: "/learn",
    },
    {
      name: "Leaderboard",
      icon: <MdOutlineLeaderboard />,
      path: "/leaderboard/4d51951a-01f8-4b8c-b3bd-a90513a6be29",
    },
    {
      name: "Ai Quiz",
      icon: <SiGooglegemini />,
      path: "/ai",
    },
    {
      name: "Shop",
      icon: <FaShop />,
      path: "/shop",
    },
    {
      name: "Avatar",
      icon: <FaShop />,
      path: "/avatar",
    },
  ];
  return (
    <div className="w-full flex">
      <Sidebar items={items} menu={menu} setMenu={setMenu} currentUser={currentUser}/>
      <div className={`w-full`}>
        <Navbar currentUser={currentUser} menu={menu} setMenu={setMenu} />
        <Suspense fallback={<Loading />}>{children}</Suspense>
      </div>
    </div>
  );
}
