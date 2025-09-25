import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router } from '@angular/router';

import { ThemeService } from './core/services/theme.service';
import { ProgressService } from './core/services/progress.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet
  ],
  template: `
    <div class="app-container" [attr.data-theme]="themeService.currentTheme()">
      <!-- Header -->
      <header class="app-header">
        <div class="header-content">
          <!-- Logo -->
          <div class="logo">
            <div class="logo-icon">CIU</div>
            <div class="logo-text">
              <h1>Coding Interview University</h1>
              <p>程式面試大學 - 完整學習路線</p>
            </div>
          </div>
          
          <!-- Progress Stats -->
          <div class="progress-stats">
            <div class="stat">
              <span class="number">{{ progressService.overallProgress().completed }}</span>
              <span class="label">已完成</span>
            </div>
            <div class="stat">
              <span class="number">{{ progressService.overallProgress().total }}</span>
              <span class="label">總項目</span>
            </div>
            <div class="stat">
              <span class="number">{{ progressService.overallProgress().percentage }}%</span>
              <span class="label">完成率</span>
            </div>
          </div>
          
          <!-- Actions -->
          <div class="header-actions">
            <button class="theme-toggle" (click)="themeService.toggleTheme()" 
                    [attr.aria-label]="'切換到' + (themeService.isDark() ? '淺色' : '深色') + '模式'">
              {{ themeService.isDark() ? '☀️' : '🌙' }}
            </button>
            
            <a class="github-link" href="https://github.com/SZZhang0619/coding-interview-university" target="_blank">
              💻 GitHub
            </a>
          </div>
        </div>
      </header>
      
      <!-- Navigation Tabs -->
      <nav class="nav-tabs">
        <button 
          class="nav-tab" 
          [class.active]="currentTab === 'learning'"
          (click)="switchTab('learning')">
          📚 學習內容
        </button>
        <button 
          class="nav-tab" 
          [class.active]="currentTab === 'progress'"
          (click)="switchTab('progress')">
          📊 進度統計
        </button>
        <button 
          class="nav-tab" 
          [class.active]="currentTab === 'roadmap'"
          (click)="switchTab('roadmap')">
          🗺️ 學習路線
        </button>
      </nav>
      
      <!-- Main Content -->
      <main class="main-content">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [`
    .app-container {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      background-color: var(--background);
      color: var(--text);
    }
    
    .app-header {
      background: var(--primary);
      color: white;
      padding: 1rem 0;
      box-shadow: var(--shadow);
    }
    
    .header-content {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 1rem;
      flex-wrap: wrap;
    }
    
    .logo {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }
    
    .logo-icon {
      width: 48px;
      height: 48px;
      background: rgba(255,255,255,0.2);
      color: white;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      font-size: 16px;
    }
    
    .logo-text h1 {
      font-size: 1.5rem;
      font-weight: 700;
      margin: 0;
    }
    
    .logo-text p {
      font-size: 0.875rem;
      margin: 0;
      opacity: 0.9;
    }
    
    .progress-stats {
      display: flex;
      gap: 2rem;
    }
    
    .stat {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    
    .stat .number {
      font-size: 1.5rem;
      font-weight: bold;
    }
    
    .stat .label {
      font-size: 0.75rem;
      opacity: 0.8;
    }
    
    .header-actions {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    
    .theme-toggle, .github-link {
      padding: 0.5rem 1rem;
      background: rgba(255,255,255,0.2);
      color: white;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      text-decoration: none;
      font-size: 0.875rem;
      transition: all 0.2s ease;
    }
    
    .theme-toggle:hover, .github-link:hover {
      background: rgba(255,255,255,0.3);
    }
    
    .nav-tabs {
      background: var(--surface);
      border-bottom: 1px solid var(--border);
      display: flex;
      padding: 0 1rem;
      max-width: 1200px;
      margin: 0 auto;
      width: 100%;
    }
    
    .nav-tab {
      padding: 1rem 1.5rem;
      background: none;
      border: none;
      color: var(--text-muted);
      cursor: pointer;
      font-size: 0.875rem;
      font-weight: 500;
      border-bottom: 2px solid transparent;
      transition: all 0.2s ease;
    }
    
    .nav-tab:hover {
      color: var(--text);
      background: rgba(0,0,0,0.05);
    }
    
    .nav-tab.active {
      color: var(--primary);
      border-bottom-color: var(--primary);
    }
    
    .main-content {
      flex: 1;
      padding: 2rem 1rem;
      max-width: 1200px;
      margin: 0 auto;
      width: 100%;
    }
    
    @media (max-width: 768px) {
      .header-content {
        flex-direction: column;
        gap: 0.5rem;
      }
      
      .progress-stats {
        gap: 1rem;
      }
      
      .logo-text h1 {
        font-size: 1.2rem;
      }
      
      .main-content {
        padding: 1rem 0.5rem;
      }
      
      .nav-tabs {
        padding: 0 0.5rem;
      }
      
      .nav-tab {
        padding: 0.75rem 1rem;
        font-size: 0.8rem;
      }
    }
  `]
})
export class AppComponent {
  themeService = inject(ThemeService);
  progressService = inject(ProgressService);
  private router = inject(Router);
  
  currentTab = 'learning';
  
  switchTab(tab: string): void {
    this.currentTab = tab;
    this.router.navigate([tab]);
  }
}