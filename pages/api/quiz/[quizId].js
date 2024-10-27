import fs from "fs";
import path from "path";

export default async function quiz(req, res) {
  const quizId = req.query.quizId;
  const filePath = path.join(process.cwd(), "public", `quizzes.json`);

  if (req.method === "GET") {
    try {
      const request = await fetch(`http://localhost:3000/quizzes.json`);
      const quizzes = await request.json();
      const quiz = quizzes.find((q) => q.id == quizId);
      res.status(200).json(quiz);
    } catch (error) {
      res.status(500).json({ error: "Quiz not found." });
    }
  }

  if (req.method === "PUT") {
    try {
      const newQuestion = req.body;

      // Read the existing quizzes
      const fileData = fs.readFileSync(filePath, "utf8");
      const quizzes = JSON.parse(fileData);

      // Find the specific quiz by quizId
      const quiz = quizzes.find((q) => q.id == quizId);
      if (!quiz) {
        return res.status(404).json({ error: "Quiz not found." });
      }

      // Find the next question ID by checking the highest current question ID in the quiz
      const maxQuestionId = Math.max(0, ...quiz.questions.map((q) => q.id));
      newQuestion.id = maxQuestionId + 1;

      // Generate unique numeric IDs for each response
      const maxResponseId = Math.max(
        0,
        ...quiz.questions.flatMap((q) => q.responses.map((r) => r.id))
      );
      newQuestion.responses.forEach((response, index) => {
        response.id = maxResponseId + index + 1;
      });

      // Add the new question to the quiz
      quiz.questions.push(newQuestion);

      // Write the updated quizzes back to the file
      fs.writeFileSync(filePath, JSON.stringify(quizzes, null, 2));

      res.status(200).json(quiz);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Unable to update quiz." });
    }
  } else {
    res.setHeader("Allow", ["GET", "PUT"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
