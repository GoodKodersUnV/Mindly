import { getAllQuizzes } from "@/actions/quizzes";
import Link from "next/link";
import React from "react";

export default async function Learn() {
  const quizzes = await getAllQuizzes();
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Start Learning</h1>
      <div className="flex flex-wrap gap-4 py-8">
        {quizzes.map((quiz) => (
          <Link href={`/learn/${quiz.id}`} key={quiz.id} className="rounded-2xl p-2 border w-[300px]">
            <div className="rounded border w-full h-[150px] text-center pt-16">Image</div>
            <h1 className="text-2xl pt-4 text-center">{quiz.category}</h1>
          </Link>
        ))}
      </div>
    </div>
  );
}
