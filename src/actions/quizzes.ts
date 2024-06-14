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

  const modules = await db.module.findMany({
    where: {
      quizId: quizId,
    },
    include: {
      submodules: {
        include: {
          score: true,
        },
      },
    },
  });

  modules.map((module) => {
    module.submodules.map((submodule) => {
      submodule.score = submodule.score.filter(
        (score) => score.userId === currentUser.id
      );
    });

    module.submodules.sort((a, b) => a.level - b.level);
  });

  let currentLevel = 1;
  for (let i = 0; i < modules.length; i++) {
    let found = false;
    for (let j = 0; j < modules[i].submodules.length; j++) {
      if (modules[i].submodules[j].score.length > 0) {
        found = true;
        currentLevel = modules[i].submodules[j].level + 1;
        modules[i].submodules[j].isUnlocked = true;
      }
    }
    if (!found) {
      break;
    }
  }

  return { modules, currentLevel };
};

export const getQuestionsByModuleId = async (moduleId: string) => {
  const questions = await db.submodule.findMany({
    where: {
      moduleId: moduleId,
    },
  });
  return questions;
};

export const getQuestionsBySubmoduleId = async (submoduleId: string) => {
  const questions = await db.submodule.findUnique({
    where: {
      id: submoduleId,
    },
  });
  return questions;
};
