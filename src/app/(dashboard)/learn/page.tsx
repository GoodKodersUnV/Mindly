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
          <Link href={`/learn/${quiz.id}`} key={quiz.id} className="bg-white p-2 max-w-sm rounded overflow-hidden shadow-lg" >
              <img className="w-[300px]" src="https://v1.tailwindcss.com/img/card-top.jpg" alt="image not available"/>
              <div className="pt-4">
                <span className="inline-block bg-gray-200 rounded-full px-3 py-2 text-sm font-semibold text-gray-700 mr-2 mb-2">#{quiz.category}</span>
              </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
