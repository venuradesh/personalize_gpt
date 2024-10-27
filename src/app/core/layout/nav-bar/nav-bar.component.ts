import { CommonModule, Location } from "@angular/common";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { ButtonComponent } from "../../components/button/button.component";
import { MatIconModule } from "@angular/material/icon";
import { ThemeService } from "../../../services/theme.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Subject, takeUntil } from "rxjs";
import { NavigationService } from "../../../services/navigation.service";
import { PgptTranslatePipe } from "../../Pipes/pgpt-translate.pipe";

interface NavBarButtonStatus {
  loginButton: boolean;
  registerButton: boolean;
  themeButton: boolean;
}

@Component({
  selector: "pgpt-nav-bar",
  standalone: true,
  imports: [CommonModule, ButtonComponent, MatIconModule, PgptTranslatePipe],
  templateUrl: "./nav-bar.component.html",
  styleUrl: "./nav-bar.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavBarComponent implements OnInit, OnDestroy {
  public isDarkMode: boolean = false;
  public navBarButtonStatus: NavBarButtonStatus = {
    loginButton: true,
    registerButton: true,
    themeButton: true,
  };

  private desctroy$ = new Subject<void>

  constructor(private themeService: ThemeService, private cdr: ChangeDetectorRef, private location: Location, private navigationService: NavigationService) {}

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

    this.cdr.markForCheck();
  }
  //#endregion

  //#region Reset Button Status
  private resetButtonStatus(): void {
    this.navBarButtonStatus = {
      loginButton: true,
      registerButton: true,
      themeButton: true,
    };
    this.cdr.markForCheck();
  }
  //#endregion

  //#region Toggle theme
  toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;
    this.themeService.toggleTheme();
    this.cdr.markForCheck();
  }
  //#endregion

  //#region Nagite to Login
  onLoginClick(): void {
    this.navigationService.navigate({to: '/login'})
  }
  //#endregion

  //#region Navigate to Regsiter
  onRegisterClick():void {
    this.navigationService.navigate({to: '/register'});
  }
  //#endregion

  ngOnDestroy(): void {
    this.desctroy$.next();
    this.desctroy$.complete();    
  }
}
