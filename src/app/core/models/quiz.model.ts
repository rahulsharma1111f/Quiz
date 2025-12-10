export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  timeLimit: number;
}

export interface Category {
  id: string;
  name: string;
  questions: Question[];
}

export interface QuizData {
  categories: Category[];
}

export interface UserAnswer {
  questionId: string;
  selectedOption: string | null; 
  isCorrect: boolean | null;
}

export interface QuizResult {
  totalQuestions: number;
  correctAnswers: number;
  unanswered: number;
  scorePercentage: number;
  feedback: string;
}