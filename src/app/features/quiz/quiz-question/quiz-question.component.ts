import {
  Component,
  input,
  output,
  effect,
  signal,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Question } from '../../../core/models/quiz.model';

@Component({
  selector: 'app-quiz-question',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="quiz-question-container">
      <div class="timer-bar-wrapper">
        <div class="timer-bar" [style.width.%]="timerProgress()"></div>
      </div>
      <p class="timer-text">{{ timeLeft() }}s left</p>

      <div class="question-content">
        <p class="question-text">
          {{ question().question }}
        </p>
      </div>

      <div class="options-list">
        <button
          *ngFor="let option of question().options; let i = index"
          class="option-button"
          [class.selected]="selectedOption() === option"
          (click)="selectOption(option)"
        >
          <span class="option-letter">{{ option.charAt(0) }}.</span>
          {{ option.substring(3) }}
        </button>
      </div>

      <div class="quiz-actions">
        <button
          (click)="handleManualNext()"
          [disabled]="selectedOption() === null"
        >
          Next
        </button>
      </div>
    </div>
  `,
  styles: [
    `
      .quiz-question-container {
        text-align: center;
      }

      .timer-bar-wrapper {
        background: #eee;
        height: 8px;
        margin-bottom: 10px;
        border-radius: 4px;
      }
      .timer-bar {
        height: 100%;
        background-color: #d6336c;
        transition: width 1s linear;
        border-radius: 4px;
      }
      .timer-text {
        font-weight: bold;
        color: #d6336c;
        margin-bottom: 20px;
      }

      .question-content {
        background: #f7e6e9;
        padding: 20px;
        border-radius: 8px;
        margin-bottom: 30px;
      }
      .question-text {
        font-size: 1.2em;
        font-weight: 500;
        color: #333;
        margin: 0;
      }

      .options-list {
        display: flex;
        flex-direction: column;
        gap: 15px;
      }
      .option-button {
        background: #fff;
        color: #333;
        border: 2px solid #ccc;
        padding: 15px;
        border-radius: 10px;
        text-align: left;
        width: 100%;
        cursor: pointer;
        transition: background-color 0.2s, border-color 0.2s;
      }
      .option-button:hover {
        background: #f9f9f9;
        border-color: #d6336c;
      }
      .option-button.selected {
        background: #d6336c;
        color: white;
        border-color: #d6336c;
      }
      .option-letter {
        font-weight: bold;
        margin-right: 10px;
      }

      .quiz-actions {
        margin-top: 30px;
        text-align: right;
      }
    `,
  ],
})
export class QuizQuestionComponent implements OnDestroy {
  question = input.required<Question>();
  initialSelection = input<string | null>(null);
  nextQuestion = output<string | null>();
  selectedOption = signal<string | null>(null);
  timeLeft = signal<number>(10);
  timerProgress = signal<number>(100);
  private timer: any;
  private readonly MAX_TIME = 10;

  constructor() {
    effect(() => {
      const q = this.question();
      if (q) {
        this.selectedOption.set(this.initialSelection());
        this.resetTimer();
        this.startTimer();
      }
    });

    effect(() => {
      this.selectedOption.set(this.initialSelection());
    });
  }

  selectOption(option: string): void {
    this.selectedOption.set(option);
  }

  handleManualNext(): void {
    this.resetTimer();
    this.nextQuestion.emit(this.selectedOption());
  }

  private resetTimer(): void {
    clearInterval(this.timer);
    this.timeLeft.set(this.MAX_TIME);
    this.timerProgress.set(100);
  }

  private startTimer(): void {
    this.resetTimer();
    this.timer = setInterval(() => {
      this.timeLeft.update((time) => time - 1);
      const newProgress = (this.timeLeft() / this.MAX_TIME) * 100;
      this.timerProgress.set(Math.max(0, newProgress));

      if (this.timeLeft() <= 0) {
        this.handleTimeout();
      }
    }, 1000);
  }

  handleTimeout(): void {
    this.resetTimer();
    this.nextQuestion.emit(this.selectedOption());
  }
  ngOnDestroy(): void {
    clearInterval(this.timer);
  }
}
