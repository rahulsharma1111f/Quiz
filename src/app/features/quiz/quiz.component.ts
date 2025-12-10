import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizService } from '../../core/services/quiz.service';
import { QuizQuestionComponent } from './quiz-question/quiz-question.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule, QuizQuestionComponent],
  template: `
    <div class="quiz-container" *ngIf="quizService.currentQuestion()">
      <p class="question-tracker">
        Question {{ quizService.currentQuestionNumber() }} of {{ quizService.totalQuestions() }}
      </p>
      
      <app-quiz-question
        [question]="quizService.currentQuestion()!"
        [initialSelection]="quizService.currentAnswer()"
        (nextQuestion)="handleNextQuestion($event)">
      </app-quiz-question>

    </div>
    <div class="error-state" *ngIf="!quizService.currentQuestion()">
      <h2>Quiz not started</h2>
      <p>Please select a category to begin the quiz.</p>
      <button (click)="router.navigate(['/'])">Go to Category Selection</button>
    </div>
  `,
  styles: [`
    .quiz-container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .question-tracker {
      text-align: center;
      margin-bottom: 20px;
      font-size: 1.1em;
      color: #D6336C;
    }
    .error-state {
      text-align: center;
      padding: 50px;
    }
  `]
})
export class QuizComponent {
  public quizService = inject(QuizService);
  public router = inject(Router);
  handleNextQuestion(selectedOption: string | null): void {
    this.quizService.submitAnswer(selectedOption);
  }
}
