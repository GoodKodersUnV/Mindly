import { leaderboard } from "@/actions/quizzes"

const page = async (
  { params }: { params: { id: string } }
) => {
  const leaderboardData = await leaderboard(params.id)
  return (
    <div>
      <h1>Leaderboard</h1>
      <pre>
        {JSON.stringify(leaderboardData, null, 2)}
      </pre>
    </div>
  )
}

export default page