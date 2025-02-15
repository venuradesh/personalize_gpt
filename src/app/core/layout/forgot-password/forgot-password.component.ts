import { CommonModule } from "@angular/common";
import { Component, Input, ViewChild } from "@angular/core";
import { PgptTranslatePipe } from "../../Pipes/pgpt-translate.pipe";
import { BehaviorSubject, take } from "rxjs";
import { FormInputComponent } from "../../components/form-input/form-input.component";
import { FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule } from "@angular/forms";
import { FormValidator } from "../../helpers/validators/form-validators";
import { ButtonComponent } from "../../components/button/button.component";
import { MatIconModule } from "@angular/material/icon";
import { TastrService } from "../../../services/tastr.service";
import { AuthService } from "../../../services/auth.service";
import { ApiSource, ErrorSource } from "../../models/api_models";
import { InternalLoaderComponent } from "../../components/internal-loader/internal-loader.component";

@Component({
  selector: "pgpt-forgot-password",
  standalone: true,
  imports: [CommonModule, PgptTranslatePipe, FormInputComponent, FormsModule, ReactiveFormsModule, ButtonComponent, MatIconModule, InternalLoaderComponent],
  templateUrl: "./forgot-password.component.html",
  styleUrl: "./forgot-password.component.scss",
})
export class ForgotPasswordComponent {
  @ViewChild("resetForm") resetForm!: NgForm;
  @Input({ required: true }) backToLogin: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  email = new FormControl("", [FormValidator.emailValidator(), FormValidator.requiredValidator("Email is required")]);
  formsGroup: FormGroup;

  loading$ = new BehaviorSubject<boolean>(false);
  isResetEmailSent$ = new BehaviorSubject<boolean>(false);

  constructor(private authService: AuthService, private toast: TastrService) {
    this.formsGroup = new FormGroup({
      email: this.email,
    });
  }

  public onBackClick(): void {
    this.backToLogin.next(false);
  }

  public onResetClick(): void {
    if (this.resetForm) {
      this.resetForm.ngSubmit.emit();
    }
  }

  public onSubmit(): void {
    if (this.formsGroup.status === "VALID") {
      const email = this.formsGroup.value.email;
      this._sendResetEmail(email);
    } else {
      this.toast.warning("Please enter a valid email");
    }
  }

  private _sendResetEmail(email: string): void {
    this.authService
      .forgotPassword(email)
      .pipe(take(1))
      .subscribe({
        next: (response: ApiSource) => {
          this.toast.success(response.message);
          this.isResetEmailSent$.next(true);
        },
        error: (err: ErrorSource) => {
          console.error(err);
          this.toast.error(err.error.message);
        },
        complete: () => this.loading$.next(false),
      });
  }
}
