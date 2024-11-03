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
import { BehaviorSubject, Subject } from "rxjs";
import { ForgotPasswordComponent } from "../../core/layout/forgot-password/forgot-password.component";

@Component({
  selector: "pgpt-login-page",
  standalone: true,
  imports: [CommonModule, LoginPageComponent, FooterComponent, PgptTranslatePipe, FormsModule, ReactiveFormsModule, ButtonComponent, FormInputComponent, RouterModule, ForgotPasswordComponent],
  templateUrl: "./login-page.component.html",
  styleUrl: "./login-page.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent implements OnDestroy {
  @ViewChild("loginForm") loginForm!: NgForm;
  public formGroup: FormGroup;
  
  
  email = new FormControl("", [FormValidator.emailValidator(), FormValidator.requiredValidator("Email is required")]);
  password = new FormControl("", [FormValidator.requiredValidator("Password is Required")]);
  
  public isForgotPasswordClicked = new BehaviorSubject<boolean>(false);
  
  private destroy$ = new Subject<void>

  constructor(private route: ActivatedRoute, private cdr: ChangeDetectorRef) {
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
    console.log(this.formGroup);
  }

  onForgotPasswordClick(): void {
    this.isForgotPasswordClicked.next(true);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.isForgotPasswordClicked.complete();
  }
}
