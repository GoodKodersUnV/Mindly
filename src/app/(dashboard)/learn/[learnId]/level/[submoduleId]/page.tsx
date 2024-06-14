import { getQuestionsBySubmoduleId } from '@/actions/quizzes'
import React from 'react'

const page = async ({ params }: {
  params: { submoduleId: string }
}) => {
  const submodule = await getQuestionsBySubmoduleId(params.submoduleId);
  return (
    <pre>
      {JSON.stringify(submodule, null, 2)}
    </pre>
  )
}
export default page