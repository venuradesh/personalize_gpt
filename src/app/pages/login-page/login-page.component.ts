import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { NavBarComponent } from "../../core/layout/nav-bar/nav-bar.component";

@Component({
  selector: "pgpt-login-page",
  standalone: true,
  imports: [CommonModule, NavBarComponent],
  templateUrl: "./login-page.component.html",
  styleUrl: "./login-page.component.scss",
})
export class LoginPageComponent {}
