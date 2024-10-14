import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class ThemeService {
  private readonly LIGHT_THEME_CLASS = "light-theme";
  private readonly DARK_THEME_CLASS = "dark-theme";
  private readonly THEME_KEY = "app-theme";

  constructor() {
    this.checkStorages();
  }

  private checkStorages(): void {
    const savedTheme = localStorage.getItem(this.THEME_KEY);
    switch (savedTheme) {
      case this.LIGHT_THEME_CLASS:
        this.enableLIghtTheme();
        break;
      case this.DARK_THEME_CLASS:
        this.enableDarkTheme();
        break;
      default:
        this.enableDarkTheme();
    }
  }

  public isDarkTheme(): boolean {
    return document.body.classList.contains(this.DARK_THEME_CLASS);
  }

  public enableDarkTheme(): void {
    document.body.classList.add(this.DARK_THEME_CLASS);
    localStorage.setItem(this.THEME_KEY, this.DARK_THEME_CLASS);
  }

  public enableLIghtTheme(): void {
    document.body.classList.remove(this.DARK_THEME_CLASS);
    localStorage.setItem(this.THEME_KEY, this.LIGHT_THEME_CLASS);
  }

  public toggleTheme() {
    if (this.isDarkTheme()) {
      this.enableLIghtTheme();
      return;
    }
    this.enableDarkTheme();
  }
}
