import { getQuestionsBySubmoduleId } from '@/actions/quizzes'
import React from 'react'
import Quiz from './Quiz';

const page = async ({ params }: {
  params: { submoduleId: string }
}) => {
  const submodule = await getQuestionsBySubmoduleId(params.submoduleId);
  return (
    <Quiz questions={submodule?.questions?.questions! } />
  )
}
export default page