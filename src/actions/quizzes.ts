import { db } from "@/lib/db";
import getCurrentUser from "./getCurrentUser";

export const getAllQuizzes = async () => {
  const quizzes = await db.quiz.findMany({});
  return quizzes;
};


export const getModulesbyQuizId = async (quizId: string) => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return null;
  }

  const modules =  await db.module.findMany({
    where: {
      quizId: quizId,
    },
    include: {
      submodules: {
        include:{
          score:true,
        }
      }
    },
  });

  // sort by level 

  // unlock the first module by default and unlock the next module if the previous module is completed

  const score = await db.score.findMany({
    where: {
      userId: currentUser.id,
    },
    distinct: ['submoduleId'],
  });



  return modules;
}

export const getQuestionsByModuleId = async (moduleId: string) => {
  const questions = await db.submodule.findMany({
    where: {
      moduleId: moduleId,
    },
  });
  return questions;
}

export const getQuestionsBySubmoduleId = async (submoduleId: string) => {
  const questions = await db.submodule.findUnique({
    where: {
      id: submoduleId,
    },
  });
  return questions;
}

export const updateHeartsDiamonds = async (hearts: number, diamonds: number ) => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return null;
  }

  

  const updatedUser = await db.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      hearts: hearts,
      diamonds: diamonds,
    },
  });

  return updatedUser;
}

export const updateScore = async (submoduleId: string, score: number) => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return null;
  }

  const updatedScore = await db.score.create({
    data: {
      userId: currentUser.id,
      submoduleId: submoduleId,
      score: score,
    },
  })
  return updatedScore;
}