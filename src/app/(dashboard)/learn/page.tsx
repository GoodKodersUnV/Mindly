import { getAllQuizzes } from "@/actions/quizzes";
import React from "react";

export default async function Learn() {
  const quizzes = await getAllQuizzes();
  return <div>
    <div>
      <h1 className="text-3xl font-bold underline">Learn</h1>
      {
        quizzes.map((quiz) => <div key={quiz.id}>{quiz.title}</div>)
      }
    </div>
  </div>;
}
