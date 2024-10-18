import DefaultLayout from "@/layouts/default";
import {
  Card,
  Link,
  CardHeader,
  CardBody,
  Divider,
  CardFooter,
} from "@nextui-org/react";
import { useRouter } from "next/router";
import { title } from "@/components/primitives";
import { Quiz } from "@/types";
import { useEffect, useState } from "react";

export default function IndexPage() {
  const router = useRouter();

  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  useEffect(() => {
    loadQuizzes();
    return () => {};
  }, []);

  const goToQuiz = (quizId: number) => {
    router.push(`/quiz/${quizId}`);
  };

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
          <h1 className={title()}>Quizzez</h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-10">
          {quizzes.map((quiz) => (
            <Card key={quiz.id}>
              <CardHeader className="flex gap-3">
                <div className="flex flex-col">
                  <p className="text-md">{quiz.title}</p>
                  <p className="text-small text-default-500">
                    Category: {quiz.category.name}
                  </p>
                </div>
              </CardHeader>
              <Divider />
              <CardBody>
                <div className="flex flex-col gap-3">
                  <p className="text-small text-default-500">
                    {quiz.description}
                  </p>
                </div>
              </CardBody>
              <Divider />
              <CardFooter>
                <Link
                  id={quiz.title}
                  onClick={() => goToQuiz(quiz.id)}
                  showAnchorIcon
                >
                  Try, try, try!
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </DefaultLayout>
  );
  async function loadQuizzes() {
    const request = await fetch(`http://localhost:3000/api/quiz`);
    const quizzes: Quiz[] = await request.json();

    setQuizzes(quizzes);
  }
}
