import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <div class="app-container">
      <header class="app-header">
        <h1>QuizMania</h1>
      </header>
      <main>
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [`
    .app-container {
      max-width: 1000px;
      margin: 0 auto;
      padding: 20px;
      font-family: Arial, sans-serif;
      color: #333;
    }
    .app-header {
      background-color: #f7e6e9; 
      color: #D6336C; 
      padding: 10px 20px;
      margin-bottom: 20px;
      border-radius: 5px;
      text-align: center;
    }
    .app-header h1 {
      margin: 0;
      font-size: 2em;
    }
    main {
      padding: 20px;
      background: white;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    button {
      background-color: #D6336C;
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 20px;
      cursor: pointer;
      font-size: 1em;
      transition: background-color 0.3s;
      min-width: 120px;
      text-transform: uppercase;
      font-weight: bold;
    }
    button:hover {
      background-color: #b82b5e;
    }
    button:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }
  `]
})
export class AppComponent { }