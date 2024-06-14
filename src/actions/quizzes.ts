import { db } from "@/lib/db";

export const getAllQuizzes = () => {
    const quizzes = db.quiz.findMany();
    return quizzes;
};