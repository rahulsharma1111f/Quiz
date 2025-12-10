import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizService } from '../../core/services/quiz.service';

@Component({
  selector: 'app-category-selection',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="welcome-container">
      <h2>Welcome to **QuizMania**</h2>
      <p class="subtitle">
        Please select a topic you want to start the quiz on.
      </p>

      <div class="category-list">
        <div
          *ngFor="let category of categories()"
          class="category-item"
          (click)="selectCategory(category.id)"
        >
          {{ category.name }}
          <span class="icon">➡️</span>
        </div>
      </div>

      <button class="start-button" (click)="openRules()">View Rules</button>
    </div>

    <div
      *ngIf="showRules"
      class="rules-modal-overlay"
      (click)="showRules = false"
    >
      <div class="rules-modal-content" (click)="$event.stopPropagation()">
        <h3>Quiz Rules</h3>
        <ul>
          <li>**Time Limit:** You have 10 seconds to answer each question.</li>
          <li>
            **Navigation:** You can use the 'Next' button or wait for the timer
            to expire.
          </li>
          <li>**Score:** Calculated based on correct answers.</li>
        </ul>
        <button class="modal-close" (click)="showRules = false">Got it!</button>
      </div>
    </div>
  `,
  styles: [
    `
      .welcome-container {
        text-align: center;
      }
      h2 {
        color: #d6336c;
        margin-bottom: 5px;
      }
      .subtitle {
        color: #555;
        margin-bottom: 30px;
      }
      .category-list {
        display: flex;
        flex-direction: column;
        gap: 15px;
        max-width: 400px;
        margin: 0 auto 30px;
      }
      .category-item {
        background: #f7e6e9;
        color: #d6336c;
        padding: 15px 20px;
        border-radius: 10px;
        cursor: pointer;
        font-weight: bold;
        display: flex;
        justify-content: space-between;
        align-items: center;
        transition: background-color 0.2s, box-shadow 0.2s;
      }
      .category-item:hover {
        background: #f0cdd4;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      }
      .start-button {
        background-color: #333;
        color: white;
      }

      .rules-modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.6);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
      }
      .rules-modal-content {
        background: white;
        padding: 30px;
        border-radius: 10px;
        max-width: 400px;
        width: 90%;
        text-align: left;
      }
      .rules-modal-content h3 {
        color: #d6336c;
      }
      .rules-modal-content ul {
        list-style: disc;
        margin-left: 20px;
      }
      .modal-close {
        margin-top: 20px;
        display: block;
        width: 100%;
      }
    `,
  ],
})
export class CategorySelectionComponent {
  private quizService = inject(QuizService);
  public categories = this.quizService.categories;
  public showRules = false;

  selectCategory(categoryId: string): void {
    this.quizService.selectCategory(categoryId);
  }

  openRules(): void {
    this.showRules = true;
  }
}
