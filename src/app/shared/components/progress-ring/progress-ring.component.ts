import { Component, Input, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-progress-ring',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="progress-ring" [style.width.px]="size()" [style.height.px]="size()">
      <svg [attr.width]="size()" [attr.height]="size()" class="progress-svg">
        <!-- Background circle -->
        <circle
          [attr.cx]="center()"
          [attr.cy]="center()"
          [attr.r]="radius()"
          class="progress-bg"
          [style.stroke-width]="strokeWidth()">
        </circle>
        
        <!-- Progress circle -->
        <circle
          [attr.cx]="center()"
          [attr.cy]="center()"
          [attr.r]="radius()"
          class="progress-bar"
          [style.stroke-width]="strokeWidth()"
          [style.stroke-dasharray]="circumference()"
          [style.stroke-dashoffset]="offset()"
          [style.stroke]="getProgressColor()">
        </circle>
      </svg>
      
      <div class="progress-content">
        <div class="progress-percentage">{{ percentage() }}%</div>
        <div class="progress-label">{{ label() }}</div>
      </div>
    </div>
  `,
  styles: [`
    .progress-ring {
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }
    
    .progress-svg {
      transform: rotate(-90deg);
      filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));
    }
    
    .progress-bg {
      fill: none;
      stroke: var(--border);
      opacity: 0.3;
    }
    
    .progress-bar {
      fill: none;
      stroke-linecap: round;
      transition: stroke-dashoffset 0.6s ease-in-out, stroke 0.3s ease;
    }
    
    .progress-content {
      position: absolute;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
    }
    
    .progress-percentage {
      font-size: 1.5rem;
      font-weight: bold;
      color: var(--text);
      line-height: 1;
    }
    
    .progress-label {
      font-size: 0.75rem;
      color: var(--text-muted);
      margin-top: 0.25rem;
    }
    
    /* Responsive sizing */
    @media (max-width: 768px) {
      .progress-percentage {
        font-size: 1.25rem;
      }
      
      .progress-label {
        font-size: 0.7rem;
      }
    }
  `]
})
export class ProgressRingComponent {
  // Inputs using the new input() function
  percentage = input.required<number>();
  size = input(120);
  label = input('進度');
  strokeWidth = input(8);
  
  // Computed values
  center = computed(() => this.size() / 2);
  radius = computed(() => (this.size() - this.strokeWidth()) / 2);
  circumference = computed(() => 2 * Math.PI * this.radius());
  
  offset = computed(() => {
    const progress = Math.max(0, Math.min(100, this.percentage()));
    return this.circumference() - (progress / 100) * this.circumference();
  });
  
  getProgressColor(): string {
    const progress = this.percentage();
    if (progress >= 90) return '#4caf50'; // Green
    if (progress >= 70) return '#2196f3'; // Blue
    if (progress >= 40) return '#ff9800'; // Orange
    if (progress > 0) return '#ffc107';   // Yellow
    return '#9e9e9e'; // Gray
  }
}
