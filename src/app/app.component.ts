import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterOutlet } from "@angular/router";
import { ThemeService } from "./services/theme.service";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent {
  constructor(private themeService: ThemeService) {}

  public toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}
