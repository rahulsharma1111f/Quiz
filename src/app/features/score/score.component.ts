import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizService } from '../../core/services/quiz.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-score',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="score-container" *ngIf="result()">
      <div class="celebration">🎉 CONGRATULATIONS 🎉</div>
      
      <div class="score-card">
        <p class="feedback">{{ result()!.feedback }}</p>
        <p class="score-text">Your Score</p>
        <p class="percentage">{{ result()!.scorePercentage | number:'1.0-0' }}%</p>
      </div>

      <div class="stats-card">
        <h3>Performance Summary</h3>
        <div class="stat-item">
          <span class="label">Total Questions:</span>
          <span class="value">{{ result()!.totalQuestions }}</span>
        </div>
        <div class="stat-item correct">
          <span class="label">Correct Answers:</span>
          <span class="value">{{ result()!.correctAnswers }}</span>
        </div>
        <div class="stat-item unanswered">
          <span class="label">Unanswered:</span>
          <span class="value">{{ result()!.unanswered }}</span>
        </div>
      </div>

      <div class="actions">
        <button (click)="retakeQuiz()">Retake Quiz</button>
      </div>
    </div>
    <div *ngIf="!result()" class="error-state">
      <p>No quiz results found. Starting over...</p>
      <button (click)="router.navigate(['/'])">Go Home</button>
    </div>
  `,
  styles: [`
    .score-container { text-align: center; max-width: 400px; margin: 0 auto; }
    .celebration {
      font-size: 1.5em;
      font-weight: bold;
      color: #D6336C;
      margin-bottom: 20px;
    }
    .score-card {
      background: #f7e6e9;
      padding: 30px;
      border-radius: 15px;
      margin-bottom: 30px;
    }
    .feedback {
      font-size: 1.8em;
      color: #D6336C;
      margin-bottom: 10px;
    }
    .score-text {
      font-size: 1.2em;
      color: #777;
    }
    .percentage {
      font-size: 4em;
      font-weight: bold;
      color: #D6336C;
      line-height: 1;
    }
    .stats-card {
      background: #fff;
      border: 1px solid #eee;
      padding: 20px;
      border-radius: 10px;
      text-align: left;
    }
    .stats-card h3 {
      color: #D6336C;
      border-bottom: 2px solid #eee;
      padding-bottom: 10px;
      margin-top: 0;
    }
    .stat-item {
      display: flex;
      justify-content: space-between;
      padding: 8px 0;
      border-bottom: 1px dashed #f0f0f0;
    }
    .stat-item:last-child {
      border-bottom: none;
    }
    .label { font-weight: 500; }
    .correct .value { color: green; font-weight: bold; }
    .unanswered .value { color: orange; font-weight: bold; }
    .actions { margin-top: 30px; }
  `]
})
export class ScoreComponent {
  private quizService = inject(QuizService);
  public router = inject(Router);

  public result = this.quizService.result;

  retakeQuiz(): void {
    this.quizService.resetQuiz();
    this.router.navigate(['/']);
  }
}