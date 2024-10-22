import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterOutlet } from "@angular/router";
import { ThemeService } from "./services/theme.service";
import { NavBarComponent } from "./core/layout/nav-bar/nav-bar.component";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavBarComponent],
  templateUrl: "./app.component.html",
})
export class AppComponent {
  constructor() {}
}
