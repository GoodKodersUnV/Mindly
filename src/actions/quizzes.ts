import { db } from "@/lib/db";

export const getAllQuizzes = () => {
  const quizzes = db.quiz.findMany({});
  return quizzes;
};


export const getModulesbyQuizId = (quizId: string) => {
  const modules = db.module.findMany({
    where: {
      quizId: quizId,
    },
    include: {
      submodules: true,
    },
  });
  return modules;
}

export const getQuestionsByModuleId = (moduleId: string) => {
  const questions = db.submodule.findMany({
    where: {
      moduleId: moduleId,
    },
  });
  return questions;
}

export const getQuestionsBySubmoduleId = (submoduleId: string) => {
  const questions = db.submodule.findUnique({
    where: {
      id: submoduleId,
    },
  });
  return questions;
}