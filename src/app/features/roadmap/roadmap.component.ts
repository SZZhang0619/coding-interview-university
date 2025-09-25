import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';

import { ProgressService } from '../../core/services/progress.service';

@Component({
  selector: 'app-roadmap',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatStepperModule
  ],
  template: `
    <div class="roadmap-container">
      <div class="roadmap-header">
        <h2>🗺️ 學習路線</h2>
        <p>建議的學習順序和路線規劃，幫助您有系統地掌握所有知識點</p>
      </div>
      
      <!-- Learning Path Stepper -->
      <mat-card class="roadmap-card">
        <mat-card-header>
          <mat-card-title>推薦學習路徑</mat-card-title>
          <mat-card-subtitle>按照難度和依賴關係排序的學習順序</mat-card-subtitle>
        </mat-card-header>
        
        <mat-card-content>
          <mat-stepper orientation="vertical" #stepper>
            <mat-step 
              *ngFor="let phase of learningPhases; let i = index"
              [completed]="isPhaseCompleted(phase.categoryIds)"
              [state]="getStepState(phase.categoryIds)">
              
              <ng-template matStepLabel>
                <div class="step-label">
                  <span class="phase-title">{{ phase.title }}</span>
                  <span class="phase-duration">{{ phase.estimatedWeeks }} 週</span>
                </div>
              </ng-template>
              
              <div class="phase-content">
                <p class="phase-description">{{ phase.description }}</p>
                
                <div class="phase-categories">
                  <div 
                    *ngFor="let categoryId of phase.categoryIds" 
                    class="category-item"
                    [class.completed]="isCategoryCompleted(categoryId)">
                    
                    <div class="category-info">
                      <span class="category-name">{{ getCategoryName(categoryId) }}</span>
                      <span class="category-progress">
                        {{ getCategoryProgress(categoryId)?.completed || 0 }} / 
                        {{ getCategoryProgress(categoryId)?.total || 0 }}
                      </span>
                    </div>
                    
                    <mat-icon 
                      *ngIf="isCategoryCompleted(categoryId)"
                      class="completed-icon">
                      check_circle
                    </mat-icon>
                  </div>
                </div>
                
                <div class="phase-tips" *ngIf="phase.tips">
                  <h4>💡 學習建議</h4>
                  <ul>
                    <li *ngFor="let tip of phase.tips">{{ tip }}</li>
                  </ul>
                </div>
                
                <div class="phase-resources" *ngIf="phase.resources">
                  <h4>📚 推薦資源</h4>
                  <div class="resource-links">
                    <a 
                      *ngFor="let resource of phase.resources"
                      [href]="resource.url"
                      target="_blank"
                      mat-button
                      color="primary">
                      <mat-icon>link</mat-icon>
                      {{ resource.title }}
                    </a>
                  </div>
                </div>
              </div>
            </mat-step>
          </mat-stepper>
        </mat-card-content>
      </mat-card>
      
      <!-- Study Tips -->
      <div class="tips-section">
        <h3>📝 學習建議</h3>
        
        <div class="tips-grid">
          <mat-card class="tip-card">
            <mat-card-header>
              <mat-icon mat-card-avatar>schedule</mat-icon>
              <mat-card-title>時間管理</mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <ul>
                <li>每天至少投入 2-3 小時學習</li>
                <li>將大主題分解成小任務</li>
                <li>設定每週學習目標</li>
                <li>定期回顧和複習</li>
              </ul>
            </mat-card-content>
          </mat-card>
          
          <mat-card class="tip-card">
            <mat-card-header>
              <mat-icon mat-card-avatar>code</mat-icon>
              <mat-card-title>實作練習</mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <ul>
                <li>理論學習後立即實作</li>
                <li>多寫程式碼，多做練習題</li>
                <li>參與開源專案</li>
                <li>建立個人作品集</li>
              </ul>
            </mat-card-content>
          </mat-card>
          
          <mat-card class="tip-card">
            <mat-card-header>
              <mat-icon mat-card-avatar>group</mat-icon>
              <mat-card-title>社群學習</mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <ul>
                <li>加入程式設計社群</li>
                <li>參加讀書會或學習小組</li>
                <li>分享學習心得</li>
                <li>向他人請教問題</li>
              </ul>
            </mat-card-content>
          </mat-card>
          
          <mat-card class="tip-card">
            <mat-card-header>
              <mat-icon mat-card-avatar>psychology</mat-icon>
              <mat-card-title>面試準備</mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <ul>
                <li>模擬面試練習</li>
                <li>準備常見問題答案</li>
                <li>練習白板編程</li>
                <li>了解公司文化和技術棧</li>
              </ul>
            </mat-card-content>
          </mat-card>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .roadmap-container {
      max-width: 1200px;
      margin: 0 auto;
    }
    
    .roadmap-header {
      text-align: center;
      margin-bottom: 2rem;
    }
    
    .roadmap-header h2 {
      font-size: 2.5rem;
      font-weight: 700;
      color: var(--text);
      margin-bottom: 0.5rem;
    }
    
    .roadmap-header p {
      font-size: 1.125rem;
      color: var(--text-muted);
    }
    
    .roadmap-card {
      margin-bottom: 2rem;
    }
    
    .step-label {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
    }
    
    .phase-title {
      font-weight: 600;
      font-size: 1.1rem;
    }
    
    .phase-duration {
      font-size: 0.875rem;
      color: var(--text-muted);
      background: rgba(0,0,0,0.05);
      padding: 0.25rem 0.75rem;
      border-radius: 12px;
    }
    
    .phase-content {
      margin-top: 1rem;
    }
    
    .phase-description {
      font-size: 1rem;
      color: var(--text-muted);
      margin-bottom: 1.5rem;
      line-height: 1.6;
    }
    
    .phase-categories {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      margin-bottom: 1.5rem;
    }
    
    .category-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.75rem;
      background: rgba(0,0,0,0.02);
      border-radius: 8px;
      border: 1px solid var(--border);
      transition: all 0.2s ease;
      
      &:hover {
        background: rgba(0,0,0,0.05);
      }
      
      &.completed {
        background: rgba(76, 175, 80, 0.1);
        border-color: rgba(76, 175, 80, 0.3);
      }
    }
    
    .category-info {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }
    
    .category-name {
      font-weight: 500;
      color: var(--text);
    }
    
    .category-progress {
      font-size: 0.875rem;
      color: var(--text-muted);
    }
    
    .completed-icon {
      color: #4caf50;
    }
    
    .phase-tips,
    .phase-resources {
      margin-top: 1.5rem;
    }
    
    .phase-tips h4,
    .phase-resources h4 {
      font-size: 1rem;
      font-weight: 600;
      color: var(--text);
      margin-bottom: 0.75rem;
    }
    
    .phase-tips ul {
      margin: 0;
      padding-left: 1.5rem;
    }
    
    .phase-tips li {
      margin-bottom: 0.5rem;
      color: var(--text-muted);
    }
    
    .resource-links {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }
    
    .tips-section {
      margin-top: 3rem;
    }
    
    .tips-section h3 {
      font-size: 1.5rem;
      font-weight: 600;
      color: var(--text);
      margin-bottom: 1.5rem;
      text-align: center;
    }
    
    .tips-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 1.5rem;
    }
    
    .tip-card {
      transition: all 0.3s ease;
      
      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      }
    }
    
    .tip-card ul {
      margin: 0;
      padding-left: 1.5rem;
    }
    
    .tip-card li {
      margin-bottom: 0.5rem;
      color: var(--text-muted);
      line-height: 1.4;
    }
    
    @media (max-width: 768px) {
      .roadmap-header h2 {
        font-size: 2rem;
      }
      
      .step-label {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.5rem;
      }
      
      .tips-grid {
        grid-template-columns: 1fr;
      }
      
      .resource-links {
        flex-direction: column;
      }
    }
  `]
})
export class RoadmapComponent {
  progressService = inject(ProgressService);
  
  learningPhases = [
    {
      title: '第一階段：基礎概念',
      description: '建立程式設計和演算法的基礎知識，理解複雜度分析的重要性。',
      estimatedWeeks: 2,
      categoryIds: ['algorithm'],
      tips: [
        '重點理解 Big-O 記號的意義',
        '練習分析簡單演算法的時間複雜度',
        '建立對效率的直觀認識'
      ],
      resources: [
        { title: 'Big-O Cheat Sheet', url: 'https://www.bigocheatsheet.com/' },
        { title: 'Algorithm Complexity', url: 'https://en.wikipedia.org/wiki/Algorithmic_complexity' }
      ]
    },
    {
      title: '第二階段：資料結構',
      description: '學習基本資料結構的實作和應用，這是所有演算法的基礎。',
      estimatedWeeks: 4,
      categoryIds: ['datastructure'],
      tips: [
        '親手實作每一種資料結構',
        '理解各種操作的時間複雜度',
        '思考不同資料結構的適用場景'
      ],
      resources: [
        { title: 'Data Structures Visualizations', url: 'https://www.cs.usfca.edu/~galles/visualization/Algorithms.html' }
      ]
    },
    {
      title: '第三階段：排序與搜尋',
      description: '掌握各種排序演算法，理解分治法等重要思想。',
      estimatedWeeks: 3,
      categoryIds: ['sorting'],
      tips: [
        '比較不同排序演算法的優缺點',
        '理解穩定性和原地排序的概念',
        '練習在不同情況下選擇合適的排序方法'
      ]
    },
    {
      title: '第四階段：樹狀結構',
      description: '學習樹的各種形式和應用，包括搜尋樹和平衡樹。',
      estimatedWeeks: 4,
      categoryIds: ['tree'],
      tips: [
        '理解樹的遞迴性質',
        '掌握各種遍歷方法',
        '學會分析樹操作的複雜度'
      ]
    },
    {
      title: '第五階段：圖論基礎',
      description: '學習圖的表示和基本演算法，為複雜問題做準備。',
      estimatedWeeks: 3,
      categoryIds: ['graph'],
      tips: [
        '理解圖的不同表示方法',
        '掌握 BFS 和 DFS 的應用',
        '學習最短路徑問題的解法'
      ]
    },
    {
      title: '第六階段：動態規劃',
      description: '學習動態規劃的思想，解決複雜的最佳化問題。',
      estimatedWeeks: 4,
      categoryIds: ['dynamic'],
      tips: [
        '理解重疊子問題和最佳子結構',
        '練習狀態轉移方程的建立',
        '從遞迴到動態規劃的思維轉換'
      ]
    }
  ];
  
  isPhaseCompleted(categoryIds: string[]): boolean {
    return categoryIds.every(id => this.isCategoryCompleted(id));
  }
  
  isCategoryCompleted(categoryId: string): boolean {
    const progress = this.getCategoryProgress(categoryId);
    return progress ? progress.percentage === 100 : false;
  }
  
  getCategoryProgress(categoryId: string) {
    return this.progressService.getCategoryProgress(categoryId);
  }
  
  getCategoryName(categoryId: string): string {
    const category = this.progressService.categories().find(c => c.id === categoryId);
    return category ? category.name : categoryId;
  }
  
  getStepState(categoryIds: string[]): string {
    if (this.isPhaseCompleted(categoryIds)) {
      return 'done';
    }
    
    const hasProgress = categoryIds.some(id => {
      const progress = this.getCategoryProgress(id);
      return progress && progress.completed > 0;
    });
    
    return hasProgress ? 'edit' : 'number';
  }
}
