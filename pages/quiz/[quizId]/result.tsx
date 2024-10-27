import { subtitle, title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import { Quiz } from "@/types";
import { Chip } from "@nextui-org/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function ScoreDetail() {
  const router = useRouter();
  const { query } = router;
  const [quiz, setQuiz] = useState<Quiz | undefined>(undefined);

  useEffect(() => {
    if (router.query.quizId) {
      loadQuiz(+router.query.quizId);
    }
  }, [router.query.quizId]);

  return (
    quiz && (
      <DefaultLayout>
        <section className="flex flex-col items-center align-middle justify-center gap-4 py-4 md:py-4 h-full">
          <div className="inline-block max-w-xl text-center justify-center">
            <span className={title()}>{quiz?.title}</span>
            <br />
            <div className={subtitle({ class: "mt-4" })}>
              {quiz?.description}
            </div>
            <br />
            <div className={subtitle({ class: "mt-4" })}>
              Your score is: ({query.score} points!) from{" "}
              {quiz?.questions?.length} points
            </div>
            <div>
              {+query?.score! >= quiz?.questions?.length! * 0.7 ? (
                <Chip color="success">You did a great job </Chip>
              ) : (
                <Chip color="danger">Try again</Chip>
              )}
            </div>
          </div>
        </section>
      </DefaultLayout>
    )
  );

  async function loadQuiz(quizId: number) {
    const request = await fetch(`http://localhost:3000/api/quiz/${quizId}`);
    const quiz = await request.json();

    setQuiz(quiz);
  }
}

export async function getServerSideProps(context: any) {
  const { quizId } = context.params;
  const quizzezRequest = await fetch(`http://localhost:3000/quizzes.json`);
  const quizzes: Quiz[] = await quizzezRequest.json();

  const quiz = quizzes.find((quiz) => quiz.id === parseInt(quizId));

  if (!quiz) {
    return {
      notFound: true,
    };
  }

  return {
    props: { quiz },
  };
}
