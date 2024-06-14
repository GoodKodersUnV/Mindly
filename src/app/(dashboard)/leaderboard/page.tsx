import { getAllQuizzes } from "@/actions/quizzes"


const page = async () => {
  const quizzes = await getAllQuizzes()
  return (
    <div>
      <h1>Leaderboard</h1>
      <ul>
        {quizzes.map((quiz) => (
          <li key={quiz.id}>
            <a href={`/leaderboard/${quiz.id}`}>{quiz.category}</a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default page