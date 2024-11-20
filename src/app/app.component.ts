import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterOutlet } from "@angular/router";
import { ThemeService } from "./services/theme.service";
import { NavBarComponent } from "./core/layout/nav-bar/nav-bar.component";
import { ToastrComponent } from "./core/components/toastr/toastr.component";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavBarComponent, ToastrComponent],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent {
  constructor() {}
}
