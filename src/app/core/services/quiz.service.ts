import { Injectable, signal, computed } from '@angular/core';
import {
  QuizData,
  Category,
  UserAnswer,
  QuizResult,
} from '../models/quiz.model';
import quizDataJson from '../../data/quiz-data.json';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  private quizData: QuizData = quizDataJson;
  private selectedCategory = signal<Category | null>(null);
  private currentQuestionIndex = signal<number>(0);
  private userAnswers = signal<UserAnswer[]>([]);
  private quizResult = signal<QuizResult | null>(null);
  public categories = computed(() => this.quizData.categories);
  public currentQuestion = computed(() => {
    const questions = this.selectedCategory()?.questions;
    const index = this.currentQuestionIndex();
    return questions ? questions[index] : null;
  });
  public totalQuestions = computed(
    () => this.selectedCategory()?.questions.length ?? 0
  );
  public currentQuestionNumber = computed(
    () => this.currentQuestionIndex() + 1
  );
  public currentAnswer = computed(() => {
    const currentQ = this.currentQuestion();
    return (
      this.userAnswers().find((a) => a.questionId === currentQ?.id)
        ?.selectedOption ?? null
    );
  });
  public result = computed(() => this.quizResult());

  constructor(private router: Router) {}

  selectCategory(categoryId: string): void {
    const category = this.quizData.categories.find((c) => c.id === categoryId);
    if (category) {
      this.selectedCategory.set(category);
      this.currentQuestionIndex.set(0);
      this.userAnswers.set([]);
      this.quizResult.set(null);
      this.router.navigate(['/quiz']);
    }
  }

  submitAnswer(selectedOption: string | null): void {
    const question = this.currentQuestion();
    if (!question) return;

    const newAnswer: UserAnswer = {
      questionId: question.id,
      selectedOption: selectedOption,
      isCorrect: selectedOption
        ? selectedOption[0] === question.correctAnswer
        : false,
    };

    this.userAnswers.update((answers) => {
      const existingIndex = answers.findIndex(
        (a) => a.questionId === question.id
      );
      if (existingIndex > -1) {
        answers[existingIndex] = newAnswer;
        return [...answers];
      }
      return [...answers, newAnswer];
    });

    this.goToNextQuestion();
  }

  goToNextQuestion(): void {
    if (this.currentQuestionIndex() < this.totalQuestions() - 1) {
      this.currentQuestionIndex.update((index) => index + 1);
    } else {
      this.calculateScoreAndFinish();
    }
  }

  private calculateScoreAndFinish(): void {
    const questions = this.selectedCategory()!.questions;
    const finalAnswers: UserAnswer[] = questions.map((q) => {
      const existingAnswer = this.userAnswers().find(
        (a) => a.questionId === q.id
      );
      if (existingAnswer) return existingAnswer;
      return {
        questionId: q.id,
        selectedOption: null,
        isCorrect: false,
      };
    });

    const correctAnswers = finalAnswers.filter(
      (a) => a.isCorrect === true
    ).length;
    const unanswered = finalAnswers.filter(
      (a) => a.selectedOption === null
    ).length;
    const totalQuestions = questions.length;
    const scorePercentage = (correctAnswers / totalQuestions) * 100;

    let feedback = '';
    if (scorePercentage >= 80) {
      feedback = 'Great job!';
    } else if (scorePercentage >= 50) {
      feedback = 'Keep practicing!';
    } else {
      feedback = 'Time to study!';
    }

    const result: QuizResult = {
      totalQuestions,
      correctAnswers,
      unanswered,
      scorePercentage,
      feedback,
    };

    this.quizResult.set(result);
    this.router.navigate(['/score']);
  }

  resetQuiz(): void {
    this.selectedCategory.set(null);
    this.currentQuestionIndex.set(0);
    this.userAnswers.set([]);
    this.quizResult.set(null);
  }
}
