import DefaultLayout from "@/layouts/default";
import {
  Card,
  Link,
  CardHeader,
  CardBody,
  Divider,
  Image,
} from "@nextui-org/react";
import { useRouter } from "next/router";
import { title } from "@/components/primitives";
import { getPluralizedText } from "@/utils/text";
import { Category, Quiz } from "@/types";

export interface CategoriesPageProps {
  categories: Category[];
  quizzes: Quiz[];
}

export default function IndexPage({
  categories,
  quizzes,
}: CategoriesPageProps) {
  const router = useRouter();

  const goToQuiz = (quizId: number) => {
    router.push(`/quiz/${quizId}`);
  };

  const renderCategoryQuestionsCountText = (category: Category) => {
    const categoryQuizzesCount = quizzes.filter(
      (q) => q.category.id === category.id
    ).length;
    return (
      <>
        {categoryQuizzesCount}{" "}
        {getPluralizedText(categoryQuizzesCount, "Question", "Questions")}
      </>
    );
  };

  const renderCategoryQuestions = (category: Category) => {
    const categoryQuizzes = quizzes.filter(
      (q) => q.category.id === category.id
    );
    return (
      <>
        {categoryQuizzes.map((quiz) => (
          <Link
            key={quiz.id}
            id={quiz.title}
            onClick={() => goToQuiz(quiz.id)}
            showAnchorIcon
          >
            {quiz.title}
          </Link>
        ))}
      </>
    );
  };

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
          <h1 className={title()}>Categories</h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4  mt-10">
          {categories.map((category) => (
            <Card key={category.id}>
              <CardHeader className="flex gap-3">
                <Image
                  alt="quiz logo"
                  height={40}
                  radius="sm"
                  src="https://thumbs.dreamstime.com/b/quiz-icon-simple-vector-170164971.jpg"
                  width={40}
                />
                <div className="flex flex-col">
                  <p className="text-md">{category.name}</p>
                  <p className="text-small text-default-500">
                    {renderCategoryQuestionsCountText(category)}
                  </p>
                </div>
              </CardHeader>
              <Divider />
              <CardBody>
                <div className="flex flex-col gap-3">
                  {renderCategoryQuestions(category)}
                </div>
              </CardBody>
              <Divider />
            </Card>
          ))}
        </div>
      </section>
    </DefaultLayout>
  );
}

export async function getServerSideProps() {
  const quizzezRequest = await fetch(`http://localhost:3000/quizzes.json`);
  const quizzes: Quiz[] = await quizzezRequest.json();

  const categoriesRequest = await fetch(
    `http://localhost:3000/categories.json`
  );
  const categories: Category[] = await categoriesRequest.json();

  return {
    props: { categories, quizzes },
  };
}
