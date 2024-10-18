import { subtitle, title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import { Quiz } from "@/types";
import { useRouter } from "next/router";
import { Button } from "@nextui-org/button";
import { useEffect, useState } from "react";
import { useQuizContext } from "@/contexts/quiz/quizContext";
import AddQuestionForm from "@/components/add-question";

export interface QuizPageProps {
  quiz: Quiz;
}

export default function QuizDetail() {
  const router = useRouter();
  const [quiz, setQuiz] = useState<Quiz | undefined>(undefined);
  const [showAddForm, setShowAddForm] = useState(false);
  const { setSharedQuiz } = useQuizContext();

  useEffect(() => {
    if (router.query.quizId) {
      loadQuiz(+router.query.quizId);
    }
  }, [router.query.quizId]);

  const startQuiz = () => {
    router.push(`/quiz/${quiz?.id}/question/${quiz?.questions[0].id}`);
  };

  if (!quiz) return <p>Quiz not found</p>;

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center align-middle justify-center gap-4 py-8 md:py-10 h-full">
        <div className="inline-block max-w-xl text-center justify-center">
          <span className={title()}>{quiz.title}</span>
          <br />
          <div className={subtitle({ class: "mt-4" })}>{quiz.description}</div>
        </div>

        <Button onClick={startQuiz} color="success" size="lg">
          Start quiz!
        </Button>

        <Button
          onClick={() => setShowAddForm((show) => !show)}
          color="primary"
          size="lg"
        >
          Add question
        </Button>

        {showAddForm && <AddQuestionForm onSubmit={async () => {}} />}
      </section>
    </DefaultLayout>
  );

  async function loadQuiz(quizId: number) {
    const request = await fetch(`http://localhost:3000/api/quiz/${quizId}`);
    const quiz = await request.json();

    setQuiz(quiz);
    setSharedQuiz({ quiz });
  }
}
