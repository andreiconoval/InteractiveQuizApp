import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface Response {
  id: number;
  text: string;
}

export interface Question {
  id: number;
  text: string;
  responses: Response[];
  correctResponseId: number;
}

export interface Quiz {
  id: number;
  title: string;
  description: string;
  category: Category;
  questions: Question[];
}

export interface Category {
  id: number;
  name: string;
}

export const categories: Category[] = [
  { id: 1, name: "General Knowledge" },
  { id: 2, name: "Science" },
  { id: 3, name: "Mathematics" },
  { id: 4, name: "History" },
];

export const quizzes: Quiz[] = [
  {
    id: 1,
    title: "World Capitals",
    category: categories[0], // General Knowledge
    description:
      "Test your knowledge of world capitals in this geography-based quiz.",
    questions: [
      {
        id: 1,
        text: "What is the capital of Japan?",
        responses: [
          { id: 1, text: "Tokyo" },
          { id: 2, text: "Seoul" },
          { id: 3, text: "Beijing" },
        ],
        correctResponseId: 1,
      },
      {
        id: 2,
        text: "Which city is the capital of Australia?",
        responses: [
          { id: 4, text: "Sydney" },
          { id: 5, text: "Melbourne" },
          { id: 6, text: "Canberra" },
        ],
        correctResponseId: 6,
      },
      {
        id: 3,
        text: "What is the capital of Canada?",
        responses: [
          { id: 7, text: "Toronto" },
          { id: 8, text: "Vancouver" },
          { id: 9, text: "Ottawa" },
        ],
        correctResponseId: 9,
      },
    ],
  },
  {
    id: 2,
    title: "Human Body",
    category: categories[1], // Science
    description:
      "Discover how much you know about the human body and its functions.",
    questions: [
      {
        id: 4,
        text: "How many bones are in the human body?",
        responses: [
          { id: 10, text: "206" },
          { id: 11, text: "205" },
          { id: 12, text: "210" },
        ],
        correctResponseId: 10,
      },
      {
        id: 5,
        text: "What is the largest organ in the human body?",
        responses: [
          { id: 13, text: "Liver" },
          { id: 14, text: "Skin" },
          { id: 15, text: "Heart" },
        ],
        correctResponseId: 14,
      },
      {
        id: 6,
        text: "Which blood type is known as the universal donor?",
        responses: [
          { id: 16, text: "A" },
          { id: 17, text: "O" },
          { id: 18, text: "AB" },
        ],
        correctResponseId: 17,
      },
    ],
  },
  {
    id: 3,
    title: "Algebra Basics",
    category: categories[2], // Mathematics
    description: "Brush up on your algebra skills with this introductory quiz.",
    questions: [
      {
        id: 7,
        text: "What is 5 + 3?",
        responses: [
          { id: 19, text: "7" },
          { id: 20, text: "8" },
          { id: 21, text: "9" },
        ],
        correctResponseId: 20,
      },
      {
        id: 8,
        text: "Solve for x: 2x = 10",
        responses: [
          { id: 22, text: "x = 5" },
          { id: 23, text: "x = 2" },
          { id: 24, text: "x = 10" },
        ],
        correctResponseId: 22,
      },
    ],
  },
  {
    id: 4,
    title: "World War II",
    category: categories[3], // History
    description:
      "Explore key events and figures from World War II in this history quiz.",
    questions: [
      {
        id: 9,
        text: "In which year did World War II begin?",
        responses: [
          { id: 25, text: "1937" },
          { id: 26, text: "1939" },
          { id: 27, text: "1941" },
        ],
        correctResponseId: 26,
      },
      {
        id: 10,
        text: "Which country was led by Adolf Hitler during World War II?",
        responses: [
          { id: 28, text: "Italy" },
          { id: 29, text: "Germany" },
          { id: 30, text: "Russia" },
        ],
        correctResponseId: 29,
      },
    ],
  },
  {
    id: 5,
    title: "Geometry Basics",
    category: categories[2], // Mathematics
    description: "Test your knowledge of basic geometry concepts and shapes.",
    questions: [
      {
        id: 11,
        text: "What is the sum of the angles in a triangle?",
        responses: [
          { id: 31, text: "90 degrees" },
          { id: 32, text: "180 degrees" },
          { id: 33, text: "360 degrees" },
        ],
        correctResponseId: 32,
      },
      {
        id: 12,
        text: "Which shape has three sides?",
        responses: [
          { id: 34, text: "Square" },
          { id: 35, text: "Triangle" },
          { id: 36, text: "Circle" },
        ],
        correctResponseId: 35,
      },
    ],
  },
  {
    id: 6,
    title: "Famous Scientists",
    category: categories[1], // Science
    description:
      "Learn more about the contributions of famous scientists through this quiz.",
    questions: [
      {
        id: 13,
        text: "Who developed the theory of relativity?",
        responses: [
          { id: 37, text: "Isaac Newton" },
          { id: 38, text: "Albert Einstein" },
          { id: 39, text: "Nikola Tesla" },
        ],
        correctResponseId: 38,
      },
      {
        id: 14,
        text: "Who is known as the father of modern physics?",
        responses: [
          { id: 40, text: "Galileo Galilei" },
          { id: 41, text: "James Clerk Maxwell" },
          { id: 42, text: "Albert Einstein" },
        ],
        correctResponseId: 40,
      },
    ],
  },
  {
    id: 7,
    title: "Ancient Civilizations",
    category: categories[3], // History
    description:
      "Test your knowledge of the ancient civilizations that shaped history.",
    questions: [
      {
        id: 15,
        text: "Which civilization built the pyramids?",
        responses: [
          { id: 43, text: "Romans" },
          { id: 44, text: "Greeks" },
          { id: 45, text: "Egyptians" },
        ],
        correctResponseId: 45,
      },
      {
        id: 16,
        text: "The Colosseum is located in which ancient city?",
        responses: [
          { id: 46, text: "Athens" },
          { id: 47, text: "Rome" },
          { id: 48, text: "Carthage" },
        ],
        correctResponseId: 47,
      },
    ],
  },
];
