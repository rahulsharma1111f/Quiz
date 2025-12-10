import { Routes } from '@angular/router';
import { CategorySelectionComponent } from './features/category-selection/category-selection.component';
import { QuizComponent } from './features/quiz/quiz.component';
import { ScoreComponent } from './features/score/score.component';

export const routes: Routes = [
  { path: '', component: CategorySelectionComponent, title: 'Welcome to QuizMania' },
  { path: 'quiz', component: QuizComponent, title: 'Quiz in Progress' },
  { path: 'score', component: ScoreComponent, title: 'Your Score' },
  { path: '**', redirectTo: '' }
];