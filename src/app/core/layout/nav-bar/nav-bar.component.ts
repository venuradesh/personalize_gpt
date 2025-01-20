import { CommonModule, Location } from "@angular/common";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { ButtonComponent } from "../../components/button/button.component";
import { MatIconModule } from "@angular/material/icon";
import { ThemeService } from "../../../services/theme.service";
import { ActivatedRoute, Router } from "@angular/router";
import { BehaviorSubject, Subject, takeUntil } from "rxjs";
import { NavigationService } from "../../../services/navigation.service";
import { PgptTranslatePipe } from "../../Pipes/pgpt-translate.pipe";

interface NavBarButtonStatus {
  loginButton: boolean;
  registerButton: boolean;
  themeButton: boolean;
  backButton: boolean;
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
    backButton: false,
  };
  public removeNavBar: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  private desctroy$ = new Subject<void>

  constructor(private themeService: ThemeService, private cdr: ChangeDetectorRef, private location: Location, private navigationService: NavigationService) {}

  ngOnInit(): void {
    this.location.onUrlChange((route) => {
      this.setButtonStatus(route);
    })
  }

  //#region Check Button status
  public setButtonStatus(route: string): void {
    if(route.startsWith('/start')){
      this.resetButtonStatus();
    }else if(route.startsWith('/login')){
      this.removeNavBar.next(false);
      this.navBarButtonStatus = {
        loginButton :false,
        registerButton :true,
        themeButton: true,
        backButton: true,
      }
    }else if(route.startsWith('/register')){
      this.removeNavBar.next(false);
      this.navBarButtonStatus = {
        loginButton :true,
        registerButton :false,
        themeButton: true,
        backButton: true,
      }
    }else if(route.startsWith('/model-selection')){
      this.removeNavBar.next(false);
      this.navBarButtonStatus = {
        loginButton :true,
        registerButton :false,
        themeButton: true,
        backButton: true,
      }
    } else {
      this.removeNavBar.next(true);
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
      backButton: false
    };
    this.removeNavBar.next(false);
    this.cdr.markForCheck();
  }
  //#endregion

  //#region Toggle theme
  public toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;
    this.themeService.toggleTheme();
    this.cdr.markForCheck();
  }
  //#endregion

  //#region Nagite to Login
  public onLoginClick(): void {
    this.navigationService.navigate({to: '/login'})
  }
  //#endregion

  //#region Navigate to Previous-page
  public navigateToPreviousPage(): void {
    this.navigationService.navigateBack();
  }
  //#endregion

  //#region Navigate to Regsiter
  public onRegisterClick():void {
    this.navigationService.navigate({to: '/model-selection'});
  }
  //#endregion

  public ngOnDestroy(): void {
    this.desctroy$.next();
    this.desctroy$.complete();    
  }
}
