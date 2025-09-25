import { Injectable, signal, computed, effect } from '@angular/core';
import { LearningItem, Category, ProgressStats, CategoryProgress } from '../models/learning-item.model';

@Injectable({
  providedIn: 'root'
})
export class ProgressService {
  private readonly PROGRESS_KEY = 'learning-progress';
  
  // Signals for state management
  private _categories = signal<Category[]>(this.getInitialData());
  private _completedItems = signal<Set<number>>(this.getCompletedItems());
  
  // Public readonly signals
  readonly categories = this._categories.asReadonly();
  readonly completedItems = this._completedItems.asReadonly();
  
  // Computed signals for derived state
  readonly allItems = computed(() => {
    return this._categories().flatMap(category => category.items);
  });
  
  readonly overallProgress = computed((): ProgressStats => {
    const items = this.allItems();
    const completed = items.filter(item => this._completedItems().has(item.id)).length;
    return {
      completed,
      total: items.length,
      percentage: items.length > 0 ? Math.round((completed / items.length) * 100) : 0
    };
  });
  
  readonly categoryProgress = computed((): CategoryProgress[] => {
    return this._categories().map(category => {
      const completed = category.items.filter(item => this._completedItems().has(item.id)).length;
      return {
        categoryId: category.id,
        categoryName: category.name,
        completed,
        total: category.items.length,
        percentage: category.items.length > 0 ? Math.round((completed / category.items.length) * 100) : 0
      };
    });
  });
  
  constructor() {
    // Auto-save progress when completed items change
    effect(() => {
      this._completedItems(); // Track signal
      this.saveProgress();
    });
  }
  
  private getInitialData(): Category[] {
    return [
      {
        id: 'algorithm',
        name: '演算法複雜度',
        description: '學習 Big-O 記號和演算法分析',
        icon: '📊',
        color: '#3b82f6',
        items: [
          { id: 1, title: '學習演算法複雜度 / Big-O / 漸進分析', category: 'algorithm', completed: false },
          { id: 2, title: '了解時間複雜度和空間複雜度', category: 'algorithm', completed: false },
          { id: 3, title: '練習分析演算法效率', category: 'algorithm', completed: false },
          { id: 4, title: '掌握常見複雜度類別', category: 'algorithm', completed: false }
        ]
      },
      {
        id: 'datastructure',
        name: '資料結構',
        description: '基本資料結構的實作和應用',
        icon: '🏗️',
        color: '#10b981',
        items: [
          { id: 5, title: '實作動態陣列', category: 'datastructure', completed: false },
          { id: 6, title: '了解陣列的時間複雜度', category: 'datastructure', completed: false },
          { id: 7, title: '實作單向 Linked List', category: 'datastructure', completed: false },
          { id: 8, title: '實作雙向 Linked List', category: 'datastructure', completed: false },
          { id: 9, title: '實作 Stack 資料結構', category: 'datastructure', completed: false },
          { id: 10, title: '實作 Queue 資料結構', category: 'datastructure', completed: false },
          { id: 11, title: '實作 Hash Table', category: 'datastructure', completed: false },
          { id: 12, title: '了解 Hash 碰撞處理', category: 'datastructure', completed: false }
        ]
      },
      {
        id: 'sorting',
        name: '排序演算法',
        description: '各種排序演算法的實作和比較',
        icon: '🔄',
        color: '#f59e0b',
        items: [
          { id: 13, title: '實作泡沫排序', category: 'sorting', completed: false },
          { id: 14, title: '實作選擇排序', category: 'sorting', completed: false },
          { id: 15, title: '實作插入排序', category: 'sorting', completed: false },
          { id: 16, title: '實作合併排序', category: 'sorting', completed: false },
          { id: 17, title: '實作快速排序', category: 'sorting', completed: false },
          { id: 18, title: '實作堆積排序', category: 'sorting', completed: false }
        ]
      },
      {
        id: 'tree',
        name: '樹狀結構',
        description: '二元樹、BST、平衡樹等結構',
        icon: '🌳',
        color: '#8b5cf6',
        items: [
          { id: 19, title: '了解二元樹基本概念', category: 'tree', completed: false },
          { id: 20, title: '實作二元搜尋樹 (BST)', category: 'tree', completed: false },
          { id: 21, title: '樹的遍歷 (前序、中序、後序)', category: 'tree', completed: false },
          { id: 22, title: '實作 AVL 樹', category: 'tree', completed: false },
          { id: 23, title: '了解紅黑樹', category: 'tree', completed: false }
        ]
      },
      {
        id: 'graph',
        name: '圖論',
        description: '圖的表示和基本演算法',
        icon: '🕸️',
        color: '#ef4444',
        items: [
          { id: 24, title: '圖的表示方法 (鄰接矩陣、鄰接串列)', category: 'graph', completed: false },
          { id: 25, title: '廣度優先搜尋 (BFS)', category: 'graph', completed: false },
          { id: 26, title: '深度優先搜尋 (DFS)', category: 'graph', completed: false },
          { id: 27, title: 'Dijkstra 最短路徑演算法', category: 'graph', completed: false },
          { id: 28, title: '最小生成樹 (Kruskal, Prim)', category: 'graph', completed: false }
        ]
      },
      {
        id: 'dynamic',
        name: '動態規劃',
        description: '動態規劃的思想和經典問題',
        icon: '🧩',
        color: '#06b6d4',
        items: [
          { id: 29, title: '理解動態規劃基本概念', category: 'dynamic', completed: false },
          { id: 30, title: '背包問題', category: 'dynamic', completed: false },
          { id: 31, title: '最長公共子序列 (LCS)', category: 'dynamic', completed: false },
          { id: 32, title: '最長遞增子序列 (LIS)', category: 'dynamic', completed: false },
          { id: 33, title: '編輯距離問題', category: 'dynamic', completed: false }
        ]
      }
    ];
  }
  
  private getCompletedItems(): Set<number> {
    const saved = localStorage.getItem(this.PROGRESS_KEY);
    if (saved) {
      try {
        const data = JSON.parse(saved);
        return new Set(data.completedItems || []);
      } catch (e) {
        console.warn('Failed to parse saved progress:', e);
      }
    }
    return new Set();
  }
  
  private saveProgress(): void {
    const data = {
      completedItems: Array.from(this._completedItems()),
      lastUpdated: new Date().toISOString()
    };
    localStorage.setItem(this.PROGRESS_KEY, JSON.stringify(data));
  }
  
  toggleItemCompletion(itemId: number): void {
    const current = new Set(this._completedItems());
    if (current.has(itemId)) {
      current.delete(itemId);
    } else {
      current.add(itemId);
    }
    this._completedItems.set(current);
  }
  
  isItemCompleted(itemId: number): boolean {
    return this._completedItems().has(itemId);
  }
  
  getCategoryProgress(categoryId: string): CategoryProgress | undefined {
    return this.categoryProgress().find(cp => cp.categoryId === categoryId);
  }
  
  exportProgress(format: 'json' | 'markdown'): string {
    const progress = this.overallProgress();
    const categoryProgress = this.categoryProgress();
    const completedItems = Array.from(this._completedItems());
    
    if (format === 'json') {
      return JSON.stringify({
        exportDate: new Date().toISOString(),
        overallProgress: progress,
        categoryProgress,
        completedItems,
        categories: this._categories()
      }, null, 2);
    } else {
      // Markdown format
      let markdown = `# Coding Interview University 學習進度\n\n`;
      markdown += `**匯出日期**: ${new Date().toLocaleDateString('zh-TW')}\n`;
      markdown += `**整體進度**: ${progress.completed}/${progress.total} (${progress.percentage}%)\n\n`;
      
      markdown += `## 各類別進度\n\n`;
      categoryProgress.forEach(cp => {
        markdown += `### ${cp.categoryName}\n`;
        markdown += `- 進度: ${cp.completed}/${cp.total} (${cp.percentage}%)\n\n`;
      });
      
      markdown += `## 已完成項目\n\n`;
      this._categories().forEach(category => {
        const completedInCategory = category.items.filter(item => this._completedItems().has(item.id));
        if (completedInCategory.length > 0) {
          markdown += `### ${category.name}\n`;
          completedInCategory.forEach(item => {
            markdown += `- [x] ${item.title}\n`;
          });
          markdown += `\n`;
        }
      });
      
      return markdown;
    }
  }
  
  resetProgress(): void {
    this._completedItems.set(new Set());
    localStorage.removeItem(this.PROGRESS_KEY);
  }
}