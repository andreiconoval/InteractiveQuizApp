import { subtitle, title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import { Question, Quiz } from "@/types";
import { Button, Radio, RadioGroup } from "@nextui-org/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
export interface QuizPageProps {
  question: Question;
  nextQuestionId: number;
  quizId: number;
}

export default function QuestionDetail({
  quizId,
  nextQuestionId,
  question,
}: QuizPageProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const router = useRouter();

  if (!question) {
    return <p>Question not found</p>;
  }

  useEffect(() => {
    if (shouldRedirect) {
      router.push({
        pathname: `/quiz/${quizId}/result`,
        query: { score: score },
      });
    }
  }, [score, shouldRedirect, quizId, router]);

  // Check the answer and update score
  const handleSubmit = (event: any) => {
    event.preventDefault();

    if (hasSubmitted) return;
    setHasSubmitted(true);

    const isCorrect = question.correctResponseId == selectedAnswer;

    if (isCorrect) {
      alert("Correct!");
      setScore((prevScore) => prevScore + 1);
    } else {
      alert("Incorrect answer!");
    }

    setSelectedAnswer(null);
    if (nextQuestionId) {
      redirectNextQuestion();
    } else {
      setShouldRedirect(true);
    }
  };

  const redirectNextQuestion = () => {
    setHasSubmitted(false);
    router.push(`/quiz/${quizId}/question/${nextQuestionId}`);
  };

  return (
    <>
      <DefaultLayout>
        <section className="flex flex-col items-center align-middle justify-center gap-4 py-8 md:py-10">
          <div className="inline-block max-w-xl text-center justify-center">
            <div className={subtitle({ class: "mt-8" })}>{question.text}</div>
          </div>
          <RadioGroup
            value={`${selectedAnswer}`}
            onValueChange={(strAns) => setSelectedAnswer(+strAns)}
          >
            {question.responses.map((response) => (
              <Radio key={response.id} value={`${response.id}`}>
                {response.text}
              </Radio>
            ))}
          </RadioGroup>
          {!!selectedAnswer ? (
            <Button onClick={handleSubmit} color="primary" size="lg">
              Continue
            </Button>
          ) : (
            <></>
          )}
        </section>
      </DefaultLayout>
    </>
  );
}

export async function getServerSideProps(context: any) {
  try {
    const { quizId, questionId } = context.params;
    const quizzezRequest = await fetch(`http://localhost:3000/quizzes.json`);
    const quizzes: Quiz[] = await quizzezRequest.json();

    const quiz = quizzes.find((quiz) => quiz.id === parseInt(quizId));
    const question = quiz?.questions.find(({ id }) => id == questionId);
    if (!question) {
      return {
        notFound: true,
      };
    }

    const currentQuestionIndex = quiz?.questions.indexOf(question!);
    const nextQuestionIndex = currentQuestionIndex! + 1;
    let nextQuestionId = null;

    if (nextQuestionIndex < quiz!.questions.length) {
      nextQuestionId = quiz!.questions[nextQuestionIndex].id;
    }

    return {
      props: {
        question,
        nextQuestionId,
        quizId: quizId,
      },
    };
  } catch (error) {
    console.error("Error fetching quiz data:", error);
    return {
      notFound: true,
    };
  }
}
