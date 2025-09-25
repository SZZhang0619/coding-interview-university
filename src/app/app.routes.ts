import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/learning',
    pathMatch: 'full'
  },
  {
    path: 'learning',
    loadComponent: () => import('./features/learning/learning.component').then(m => m.LearningComponent)
  },
  {
    path: 'progress',
    loadComponent: () => import('./features/progress/progress.component').then(m => m.ProgressComponent)
  },
  {
    path: 'roadmap',
    loadComponent: () => import('./features/roadmap/roadmap.component').then(m => m.RoadmapComponent)
  }
];
