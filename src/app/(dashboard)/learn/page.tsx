import { getAllQuizzes } from "@/actions/quizzes";
import Link from "next/link";
import React from "react";

export default async function Learn() {
  const quizzes = await getAllQuizzes();
  return <div>
    <div>
      <h1 className="text-3xl font-bold underline">Learn</h1>
      {
        quizzes.map((quiz) => <Link href={`/learn/${quiz.id}`} key={quiz.id}>{quiz.category}</Link>)
      }
    </div>
  </div>;
}
