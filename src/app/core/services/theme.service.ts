import { Injectable, signal, effect } from '@angular/core';

export type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly THEME_KEY = 'app-theme';
  
  // Signal for current theme
  private _currentTheme = signal<Theme>(this.getInitialTheme());
  
  // Public readonly signal
  readonly currentTheme = this._currentTheme.asReadonly();
  
  constructor() {
    // Effect to apply theme changes to DOM
    effect(() => {
      this.applyTheme(this._currentTheme());
    });
  }
  
  private getInitialTheme(): Theme {
    // Check localStorage first
    const savedTheme = localStorage.getItem(this.THEME_KEY) as Theme;
    if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
      return savedTheme;
    }
    
    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    
    return 'light';
  }
  
  private applyTheme(theme: Theme): void {
    const body = document.body;
    const html = document.documentElement;
    
    // Remove existing theme classes
    body.classList.remove('light-theme', 'dark-theme');
    html.removeAttribute('data-theme');
    
    // Apply new theme
    body.classList.add(`${theme}-theme`);
    html.setAttribute('data-theme', theme);
    
    // Save to localStorage
    localStorage.setItem(this.THEME_KEY, theme);
  }
  
  toggleTheme(): void {
    const newTheme: Theme = this._currentTheme() === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }
  
  setTheme(theme: Theme): void {
    this._currentTheme.set(theme);
  }
  
  isDark(): boolean {
    return this._currentTheme() === 'dark';
  }
  
  isLight(): boolean {
    return this._currentTheme() === 'light';
  }
}
