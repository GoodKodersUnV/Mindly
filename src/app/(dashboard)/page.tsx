import getCurrentUser from "@/actions/getCurrentUser";
import React from "react";
import { MdOutlineNoteAlt } from "react-icons/md";
import { SiGoogleclassroom } from "react-icons/si";

const page = async() => {
  const currentUser = await getCurrentUser();
  return (
    <div className="h-60 bg-gradient-to-l from-blue-400 to-blue-600 m-2 rounded-lg">
      <div className="p-10">
        <h1 className="text-secondary-50 font-bold text-2xl">
          Welcome back {currentUser?.name} 👋
        </h1>
        <p className="text-secondary-50 font-medium text-base mt-3">
          Here is your report
        </p>
      </div>
      <div className="flex mb-10 p-2 text-center gap-4 justify-center flex-wrap">
        <div className="w-80 rounded-md shadow-xl p-2 bg-secondary-50 text-secondary-900">
          <MdOutlineNoteAlt className="m-auto h-24 w-24 text-blue-400" />
          <p className="text-primary-600 font-bold pt-2">5</p>
          <h1 className="p-1 text-sm font-bold">No of courses created</h1>
        </div>
        <div className="w-80 rounded-md shadow-xl bg-secondary-50 text-secondary-900 p-2">
          <SiGoogleclassroom className="m-auto h-24 w-24 text-blue-400" />
          <p className="text-primary-600 font-bold pt-2">6</p>
          <h1 className="p-1 text-sm font-bold">
            Total no of classes uploaded
          </h1>
        </div>
        <div className="w-80 rounded-md shadow-xl bg-secondary-50 text-secondary-900 p-2">
          {/* <PiStudentBold className="m-auto h-24 w-24 text-blue-400" /> */}icon
          <p className="text-primary-600 font-bold pt-2">5</p>
          <h1 className="p-1 text-sm font-bold">Total no of students</h1>
        </div>
      </div>
    </div>
  );
};

export default page;
