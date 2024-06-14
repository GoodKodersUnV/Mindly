import { getModulesbyQuizId } from '@/actions/quizzes'
import Link from 'next/link'
import React from 'react'

const page = async ({ params }: {
  params: { learnId: string }
}) => {
  const modules = await getModulesbyQuizId(params.learnId);
  return (
    <div>
      {modules.map((module) => (
        <div key={module.id}>
          <div>
            {module.title}
            {module.submodules.map((submodule) => (
              <div key={submodule.id}>
                <Link href={`${params.learnId}/level/${submodule.id}`} >{submodule.level}</Link>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
export default page