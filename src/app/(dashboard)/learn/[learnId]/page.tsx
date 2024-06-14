import { getModulesbyQuizId } from "@/actions/quizzes";
import Link from "next/link";
import React from "react";

const page = async ({ params }: { params: { learnId: string } }) => {
  const modules = await getModulesbyQuizId(params.learnId);
  return (
    <div className="w-1/2 p-4">
      {modules.map((module) => (
        <div key={module.id}>
          <div>
            <div className="rounded-xl bg-primary-700 border-b-4 border-l-4 text-primary-200 border-primary-900 flex justify-between items-center p-4">
              <div>
                <h1 className="text-2xl font-semibold">{module.title}</h1>
                <h1>Description</h1>
              </div>
              <div>
                <button className="p-2 px-4 rounded-lg border border-b-4 border-l-4 border-primary-800 hover:bg-primary-600 hover:scale-105 duration-500">Continue</button>
              </div>
            </div>
            <div className="my-10  ">
              {module.submodules.map((submodule, index) => {
                // it should be curved like a game candy crush or something roadmap like curved
                const pad = index % 2 === 0 ? "8" : "2";
                return (
                  <div
                    key={submodule.id}
                    className={`my-6 p-${pad} mx-[300px] `}
                  >
                    <Link
                      className="rounded-full border p-2"
                      href={`${params.learnId}/level/${submodule.id}`}
                    >
                      {submodule.level}
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default page;
