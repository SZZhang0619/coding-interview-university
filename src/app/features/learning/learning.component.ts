import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { ProgressService } from '../../core/services/progress.service';
import { LearningItem, Category } from '../../core/models/learning-item.model';

@Component({
  selector: 'app-learning',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatCheckboxModule,
    MatProgressBarModule,
    MatIconModule,
    MatButtonModule
  ],
  template: `
    <div class="learning-container">
      <div class="learning-header">
        <h2>📚 學習內容</h2>
        <p>完整的程式面試準備課程，涵蓋所有重要主題</p>
      </div>
      
      <div class="categories-grid">
        <mat-card 
          *ngFor="let category of progressService.categories()" 
          class="category-card"
          [style.border-left]="'4px solid ' + category.color">
          
          <!-- Category Header -->
          <mat-card-header>
            <div class="category-icon">{{ category.icon }}</div>
            <mat-card-title>{{ category.name }}</mat-card-title>
            <mat-card-subtitle>{{ category.description }}</mat-card-subtitle>
          </mat-card-header>
          
          <!-- Progress Bar -->
          <div class="category-progress">
            <div class="progress-info">
              <span>{{ getCategoryProgress(category.id)?.completed || 0 }} / {{ category.items.length }}</span>
              <span>{{ getCategoryProgress(category.id)?.percentage || 0 }}%</span>
            </div>
            <mat-progress-bar 
              mode="determinate" 
              [value]="getCategoryProgress(category.id)?.percentage || 0"
              [color]="getProgressColor(getCategoryProgress(category.id)?.percentage || 0)">
            </mat-progress-bar>
          </div>
          
          <!-- Learning Items -->
          <mat-card-content>
            <div class="learning-items">
              <div 
                *ngFor="let item of category.items" 
                class="learning-item"
                [class.completed]="progressService.isItemCompleted(item.id)">
                
                <mat-checkbox 
                  [checked]="progressService.isItemCompleted(item.id)"
                  (change)="onItemToggle(item.id)"
                  [color]="'primary'">
                </mat-checkbox>
                
                <div class="item-content">
                  <span class="item-title">{{ item.title }}</span>
                  <span class="item-category">{{ item.category }}</span>
                </div>
                
                <div class="item-actions" *ngIf="progressService.isItemCompleted(item.id)">
                  <mat-icon class="completed-icon" color="primary">check_circle</mat-icon>
                </div>
              </div>
            </div>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .learning-container {
      max-width: 1200px;
      margin: 0 auto;
    }
    
    .learning-header {
      text-align: center;
      margin-bottom: 2rem;
    }
    
    .learning-header h2 {
      font-size: 2.5rem;
      font-weight: 700;
      color: var(--text);
      margin-bottom: 0.5rem;
    }
    
    .learning-header p {
      font-size: 1.125rem;
      color: var(--text-muted);
    }
    
    .categories-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
      gap: 2rem;
    }
    
    .category-card {
      transition: all 0.3s ease;
      
      &:hover {
        transform: translateY(-4px);
        box-shadow: 0 8px 25px rgba(0,0,0,0.15);
      }
    }
    
    .category-icon {
      font-size: 2rem;
      margin-right: 1rem;
    }
    
    .category-progress {
      padding: 1rem;
      background: rgba(0,0,0,0.02);
      margin: 1rem 0;
      border-radius: 8px;
    }
    
    .progress-info {
      display: flex;
      justify-content: space-between;
      margin-bottom: 0.5rem;
      font-weight: 500;
      color: var(--text);
    }
    
    .learning-items {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }
    
    .learning-item {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 0.75rem;
      border-radius: 8px;
      transition: all 0.2s ease;
      border: 1px solid transparent;
      
      &:hover {
        background: rgba(0,0,0,0.02);
        border-color: var(--border);
      }
      
      &.completed {
        background: rgba(76, 175, 80, 0.1);
        border-color: rgba(76, 175, 80, 0.3);
        
        .item-title {
          text-decoration: line-through;
          opacity: 0.7;
        }
      }
    }
    
    .item-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }
    
    .item-title {
      font-weight: 500;
      color: var(--text);
      line-height: 1.4;
    }
    
    .item-category {
      font-size: 0.75rem;
      color: var(--text-muted);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    
    .item-actions {
      display: flex;
      align-items: center;
    }
    
    .completed-icon {
      color: #4caf50;
    }
    
    @media (max-width: 768px) {
      .categories-grid {
        grid-template-columns: 1fr;
        gap: 1rem;
      }
      
      .learning-header h2 {
        font-size: 2rem;
      }
      
      .learning-item {
        padding: 0.5rem;
        gap: 0.75rem;
      }
    }
  `]
})
export class LearningComponent {
  progressService = inject(ProgressService);
  
  onItemToggle(itemId: number): void {
    this.progressService.toggleItemCompletion(itemId);
  }
  
  getCategoryProgress(categoryId: string) {
    return this.progressService.getCategoryProgress(categoryId);
  }
  
  getProgressColor(percentage: number): 'primary' | 'accent' | 'warn' {
    if (percentage >= 80) return 'primary';
    if (percentage >= 50) return 'accent';
    return 'warn';
  }
}
