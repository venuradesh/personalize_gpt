import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { FooterComponent } from "../../core/layout/footer/footer.component";
import { PgptTranslatePipe } from "../../core/Pipes/pgpt-translate.pipe";
import { FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule } from "@angular/forms";
import { ButtonComponent } from "../../core/components/button/button.component";
import { FormInputComponent } from "../../core/components/form-input/form-input.component";
import { FormValidator } from "../../core/helpers/validators/form-validators";
import { Common } from "../../core/helpers/common";
import { ActivatedRoute, RouterModule, RouterOutlet } from "@angular/router";
import { BehaviorSubject, catchError, Observable, of, Subject, switchMap, takeUntil } from "rxjs";
import { ForgotPasswordComponent } from "../../core/layout/forgot-password/forgot-password.component";
import { AuthService } from "../../services/auth.service";
import { ApiSource, ErrorSource } from "../../core/models/api_models";
import { TastrService } from '../../services/tastr.service'
import { AUTHENTICATION_FAILED, AUTHENTICATION_SUCCESS } from "../../core/Constants/api-constants";

@Component({
  selector: "pgpt-login-page",
  standalone: true,
  imports: [CommonModule, FooterComponent, PgptTranslatePipe, FormsModule, ReactiveFormsModule, ButtonComponent, FormInputComponent, RouterModule, ForgotPasswordComponent],
  templateUrl: "./login-page.component.html",
  styleUrl: "./login-page.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent implements OnDestroy {
  @ViewChild("loginForm") loginForm!: NgForm;
  public formGroup: FormGroup;
  
  email = new FormControl("", [FormValidator.emailValidator(), FormValidator.requiredValidator("Email is required")]);
  password = new FormControl("", [FormValidator.requiredValidator("Password is Required")]);
  
  public isForgotPasswordClicked$ = new BehaviorSubject<boolean>(false);
  public loading$ = new BehaviorSubject<boolean>(false); 
  
  private destroy$ = new Subject<void>

  constructor(private route: ActivatedRoute, private cdr: ChangeDetectorRef, private toastrService: TastrService, private authService: AuthService) {
    this.formGroup = new FormGroup({
      email: this.email,
      password: this.password,
    });
  }
  
  hasOutletContent(outlet: RouterOutlet): boolean {
    return outlet && outlet.isActivated;
  }

  onSubmitButtonClick(): void {
    if (!this.loginForm) return;
    else {
      Common.triggerFormChecks(this.formGroup);
      this.loginForm.ngSubmit.emit();
    }
  }

  onFormSubmit() {
    if(this.formGroup.status === 'INVALID') return

    this.login(this.formGroup.value.email, this.formGroup.value.password).pipe(takeUntil(this.destroy$)).subscribe({
      next: (val: ApiSource | null) => {
        if(val) this.toastrService.success(val.message, AUTHENTICATION_SUCCESS);
      },
    })
  }

  private login(email:string, password: string): Observable<ApiSource | null> {
    return this.authService.login(email, password).pipe(
      switchMap((value: any) => of({message: value.message, data: value.data, error: value.error})),
      catchError((err: ErrorSource) => {
        this.toastrService.error(err.error.message, AUTHENTICATION_FAILED)
        console.error(err)
        return of(null)
      })
    )
  }

  onForgotPasswordClick(): void {
    this.isForgotPasswordClicked$.next(true);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.isForgotPasswordClicked$.complete();
  }
}
