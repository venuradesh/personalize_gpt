import { CommonModule } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { ButtonComponent } from "../../components/button/button.component";
import { MatIconModule } from "@angular/material/icon";
import { ThemeService } from "../../../services/theme.service";
import { Router } from "@angular/router";

interface NavBarButtonStatus {
  loginButton: boolean;
  registerButton: boolean;
  themeButton: boolean;
}

@Component({
  selector: "pgpt-nav-bar",
  standalone: true,
  imports: [CommonModule, ButtonComponent, MatIconModule],
  templateUrl: "./nav-bar.component.html",
  styleUrl: "./nav-bar.component.scss",
})
export class NavBarComponent implements OnInit {
  public isDarkMode: boolean = false;
  public navBarButtonStatus: NavBarButtonStatus = {
    loginButton: true,
    registerButton: true,
    themeButton: true,
  };

  constructor(private themeService: ThemeService, private router: Router) {}

  ngOnInit(): void {
    this.checkButtonStatus();
  }

  //#region Check Button status
  checkButtonStatus(): void {
    if (this.router.url === "/start") {
      this.resetButtonStatus();
    }

    if (this.router.url === "login") {
      this.navBarButtonStatus.loginButton = false;
    }

    if (this.router.url === "/register") {
      this.navBarButtonStatus.registerButton = false;
    }
  }
  //#endregion

  //#region Reset Button Status
  resetButtonStatus(): void {
    this.navBarButtonStatus = {
      loginButton: true,
      registerButton: true,
      themeButton: true,
    };
  }
  //#endregion

  //#region Toggle theme
  toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;
    this.themeService.toggleTheme();
  }
  //#endregion
}
