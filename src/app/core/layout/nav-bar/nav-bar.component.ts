import { CommonModule, Location } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { ButtonComponent } from "../../components/button/button.component";
import { MatIconModule } from "@angular/material/icon";
import { ThemeService } from "../../../services/theme.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Subject, takeUntil } from "rxjs";

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
export class NavBarComponent implements OnInit, OnDestroy {
  public isDarkMode: boolean = false;
  public navBarButtonStatus: NavBarButtonStatus = {
    loginButton: true,
    registerButton: true,
    themeButton: true,
  };

  private desctroy$ = new Subject<void>

  constructor(private themeService: ThemeService, private router: Router, private location: Location) {}

  ngOnInit(): void {
    this.location.onUrlChange((route) => {
      this.setButtonStatus(route);
    })
  }

  //#region Check Button status
  public setButtonStatus(route: string): void {
    switch(route){
      case '/start':
        this.resetButtonStatus();
        break;

      case '/login':
        this.navBarButtonStatus = {
          loginButton :false,
          registerButton :true,
          themeButton: true
        }
        break;

      case '/register':
        this.navBarButtonStatus = {
          loginButton :true,
          registerButton :false,
          themeButton: true
        }
        break;
    }
  }
  //#endregion

  //#region Reset Button Status
  private resetButtonStatus(): void {
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

  ngOnDestroy(): void {
    this.desctroy$.next();
    this.desctroy$.complete();    
  }
}
