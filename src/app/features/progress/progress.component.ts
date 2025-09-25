import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';

import { ProgressService } from '../../core/services/progress.service';
import { ProgressRingComponent } from '../../shared/components/progress-ring/progress-ring.component';

@Component({
  selector: 'app-progress',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatProgressBarModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    ProgressRingComponent
  ],
  template: `
    <div class="progress-container">
      <div class="progress-header">
        <h2>📊 進度統計</h2>
        <p>追蹤您的學習進度和成就</p>
      </div>
      
      <!-- Overall Progress -->
      <mat-card class="overall-progress-card">
        <mat-card-header>
          <mat-card-title>整體學習進度</mat-card-title>
        </mat-card-header>
        
        <mat-card-content>
          <div class="overall-stats">
            <div class="progress-ring-container">
              <app-progress-ring 
                [percentage]="progressService.overallProgress().percentage"
                [size]="160"
                label="完成">
              </app-progress-ring>
            </div>
            
            <div class="stats-grid">
              <div class="stat-item">
                <div class="stat-number">{{ progressService.overallProgress().completed }}</div>
                <div class="stat-label">已完成</div>
              </div>
              <div class="stat-item">
                <div class="stat-number">{{ progressService.overallProgress().total - progressService.overallProgress().completed }}</div>
                <div class="stat-label">待完成</div>
              </div>
              <div class="stat-item">
                <div class="stat-number">{{ progressService.categories().length }}</div>
                <div class="stat-label">學習類別</div>
              </div>
              <div class="stat-item">
                <div class="stat-number">{{ progressService.overallProgress().percentage }}%</div>
                <div class="stat-label">完成率</div>
              </div>
            </div>
          </div>
        </mat-card-content>
      </mat-card>
      
      <!-- Category Progress -->
      <div class="category-progress-section">
        <h3>各類別進度詳情</h3>
        
        <div class="category-progress-grid">
          <mat-card 
            *ngFor="let categoryProgress of progressService.categoryProgress()" 
            class="category-progress-card">
            
            <mat-card-header>
              <div class="category-info">
                <mat-card-title>{{ categoryProgress.categoryName }}</mat-card-title>
                <mat-card-subtitle>
                  {{ categoryProgress.completed }} / {{ categoryProgress.total }} 項目
                </mat-card-subtitle>
              </div>
              <div class="category-percentage">
                {{ categoryProgress.percentage }}%
              </div>
            </mat-card-header>
            
            <mat-card-content>
              <mat-progress-bar 
                mode="determinate" 
                [value]="categoryProgress.percentage"
                [color]="getProgressColor(categoryProgress.percentage)">
              </mat-progress-bar>
              
              <div class="progress-details">
                <span class="progress-text">
                  {{ getProgressText(categoryProgress.percentage) }}
                </span>
                <span class="progress-badge" [class]="getProgressBadgeClass(categoryProgress.percentage)">
                  {{ getProgressBadge(categoryProgress.percentage) }}
                </span>
              </div>
            </mat-card-content>
          </mat-card>
        </div>
      </div>
      
      <!-- Actions -->
      <div class="actions-section">
        <mat-card class="actions-card">
          <mat-card-header>
            <mat-card-title>進度管理</mat-card-title>
            <mat-card-subtitle>匯出進度或重設學習記錄</mat-card-subtitle>
          </mat-card-header>
          
          <mat-card-content>
            <div class="action-buttons">
              <button mat-raised-button color="primary" (click)="exportProgress('json')">
                <mat-icon>download</mat-icon>
                匯出 JSON
              </button>
              
              <button mat-raised-button color="accent" (click)="exportProgress('markdown')">
                <mat-icon>description</mat-icon>
                匯出 Markdown
              </button>
              
              <button mat-raised-button color="warn" (click)="resetProgress()">
                <mat-icon>refresh</mat-icon>
                重設進度
              </button>
            </div>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .progress-container {
      max-width: 1200px;
      margin: 0 auto;
    }
    
    .progress-header {
      text-align: center;
      margin-bottom: 2rem;
    }
    
    .progress-header h2 {
      font-size: 2.5rem;
      font-weight: 700;
      color: var(--text);
      margin-bottom: 0.5rem;
    }
    
    .progress-header p {
      font-size: 1.125rem;
      color: var(--text-muted);
    }
    
    .overall-progress-card {
      margin-bottom: 2rem;
    }
    
    .overall-stats {
      display: flex;
      align-items: center;
      gap: 3rem;
      flex-wrap: wrap;
    }
    
    .progress-ring-container {
      flex-shrink: 0;
    }
    
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 2rem;
      flex: 1;
      min-width: 300px;
    }
    
    .stat-item {
      text-align: center;
    }
    
    .stat-number {
      font-size: 2.5rem;
      font-weight: bold;
      color: var(--primary);
      line-height: 1;
    }
    
    .stat-label {
      font-size: 0.875rem;
      color: var(--text-muted);
      margin-top: 0.5rem;
    }
    
    .category-progress-section {
      margin-bottom: 2rem;
    }
    
    .category-progress-section h3 {
      font-size: 1.5rem;
      font-weight: 600;
      color: var(--text);
      margin-bottom: 1rem;
    }
    
    .category-progress-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 1.5rem;
    }
    
    .category-progress-card {
      transition: all 0.3s ease;
      
      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      }
    }
    
    .category-info {
      flex: 1;
    }
    
    .category-percentage {
      font-size: 1.5rem;
      font-weight: bold;
      color: var(--primary);
    }
    
    .progress-details {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 1rem;
    }
    
    .progress-text {
      font-size: 0.875rem;
      color: var(--text-muted);
    }
    
    .progress-badge {
      padding: 0.25rem 0.75rem;
      border-radius: 12px;
      font-size: 0.75rem;
      font-weight: 500;
      text-transform: uppercase;
      
      &.excellent {
        background: rgba(76, 175, 80, 0.2);
        color: #4caf50;
      }
      
      &.good {
        background: rgba(33, 150, 243, 0.2);
        color: #2196f3;
      }
      
      &.fair {
        background: rgba(255, 193, 7, 0.2);
        color: #ffc107;
      }
      
      &.poor {
        background: rgba(244, 67, 54, 0.2);
        color: #f44336;
      }
    }
    
    .actions-card {
      margin-bottom: 2rem;
    }
    
    .action-buttons {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
    }
    
    @media (max-width: 768px) {
      .overall-stats {
        flex-direction: column;
        text-align: center;
        gap: 2rem;
      }
      
      .stats-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 1rem;
      }
      
      .category-progress-grid {
        grid-template-columns: 1fr;
      }
      
      .action-buttons {
        flex-direction: column;
      }
      
      .progress-header h2 {
        font-size: 2rem;
      }
    }
  `]
})
export class ProgressComponent {
  progressService = inject(ProgressService);
  private dialog = inject(MatDialog);
  
  getProgressColor(percentage: number): 'primary' | 'accent' | 'warn' {
    if (percentage >= 80) return 'primary';
    if (percentage >= 50) return 'accent';
    return 'warn';
  }
  
  getProgressText(percentage: number): string {
    if (percentage >= 90) return '優秀！即將完成';
    if (percentage >= 70) return '進度良好，繼續加油';
    if (percentage >= 40) return '穩步前進中';
    if (percentage > 0) return '剛開始學習';
    return '尚未開始';
  }
  
  getProgressBadge(percentage: number): string {
    if (percentage >= 90) return '優秀';
    if (percentage >= 70) return '良好';
    if (percentage >= 40) return '一般';
    return '待加強';
  }
  
  getProgressBadgeClass(percentage: number): string {
    if (percentage >= 90) return 'excellent';
    if (percentage >= 70) return 'good';
    if (percentage >= 40) return 'fair';
    return 'poor';
  }
  
  exportProgress(format: 'json' | 'markdown'): void {
    const data = this.progressService.exportProgress(format);
    const blob = new Blob([data], { 
      type: format === 'json' ? 'application/json' : 'text/markdown' 
    });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `coding-interview-progress.${format === 'json' ? 'json' : 'md'}`;
    link.click();
    window.URL.revokeObjectURL(url);
  }
  
  resetProgress(): void {
    if (confirm('確定要重設所有學習進度嗎？此操作無法復原。')) {
      this.progressService.resetProgress();
    }
  }
}
