export interface LearningItem {
  id: number;
  title: string;
  category: string;
  completed: boolean;
  description?: string;
  priority?: 'low' | 'medium' | 'high';
  estimatedHours?: number;
  resources?: string[];
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  items: LearningItem[];
}

export interface ProgressStats {
  completed: number;
  total: number;
  percentage: number;
}

export interface CategoryProgress extends ProgressStats {
  categoryId: string;
  categoryName: string;
}
