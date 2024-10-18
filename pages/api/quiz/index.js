import fs from "fs";
import path from "path";

export default async function quizzes(req, res) {
  if (req.method === "GET") {
    try {
      const request = await fetch(`http://localhost:3000/quizzes.json`);
      const quizzes = await request.json();
      res.status(200).json(quizzes);
    } catch (error) {
      res.status(500).json({ error: "Quizzes not found." });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
