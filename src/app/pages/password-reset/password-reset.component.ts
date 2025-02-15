import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { BehaviorSubject, finalize, take } from "rxjs";
import { FormValidator } from "../../core/helpers/validators/form-validators";
import { FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { FormInputComponent } from "../../core/components/form-input/form-input.component";
import { ButtonComponent } from "../../core/components/button/button.component";
import { PgptTranslatePipe } from "../../core/Pipes/pgpt-translate.pipe";
import { FooterComponent } from "../../core/layout/footer/footer.component";
import { InternalLoaderComponent } from "../../core/components/internal-loader/internal-loader.component";
import { Common } from "../../core/helpers/common";
import { TastrService } from "../../services/tastr.service";
import { UserService } from "../../services/user.service";
import { ApiSource, ErrorSource } from "../../core/models/api_models";
import { NavigationService } from "../../services/navigation.service";

interface UserDetails {
  email: string;
  user_id: string;
}

@Component({
  selector: "pgpt-password-reset",
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, FormInputComponent, ButtonComponent, PgptTranslatePipe, FooterComponent, InternalLoaderComponent],
  templateUrl: "./password-reset.component.html",
  styleUrl: "./password-reset.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PasswordResetComponent implements OnInit {
  @ViewChild("resetForm") resetForm!: NgForm;

  userDetails: UserDetails | undefined = undefined;

  password = new FormControl("", [FormValidator.passwordValidator(), FormValidator.requiredValidator("Password is Required")]);
  confPassword = new FormControl("", [FormValidator.passwordMatcher(this.password), FormValidator.requiredValidator("Confirm Password is Required")]);
  resetFormGroup: FormGroup;

  loading$ = new BehaviorSubject<boolean>(false);

  constructor(private route: ActivatedRoute, private toast: TastrService, private userService: UserService, private navigation: NavigationService) {
    this.resetFormGroup = new FormGroup({
      password: this.password,
      confPassword: this.confPassword,
    });
  }

  public ngOnInit(): void {
    this._getResolverData();
  }

  public onSubmitButtonClick() {
    if (this.resetForm) {
      Common.triggerFormChecks(this.resetFormGroup);
      this.resetForm.ngSubmit.emit();
    }
  }

  public onFormSubmit() {
    if (this.resetFormGroup.status === "VALID") {
      const password = this.resetFormGroup.value.password;
      this._resetPassword(password);
    } else {
      this.toast.error("Please enter a valid password", "Password Error");
    }
  }

  private _resetPassword(password: string): void {
    const user_id = this.userDetails?.user_id;
    if (!user_id) {
      this.toast.error("Invalid reset token found.");
      return;
    }
    this._callResetPasswordAPI(user_id, password);
  }

  private _callResetPasswordAPI(user_id: string, password: string): void {
    this.loading$.next(true);
    this.userService
      .resetPassword(user_id, password)
      .pipe(
        take(1),
        finalize(() => this.loading$.next(false))
      )
      .subscribe({
        next: (res: ApiSource) => {
          this.toast.success(res.message);
          this.navigation.navigate({ to: "/login" });
        },
        error: (err: ErrorSource) => {
          this.toast.error(err.error.message);
          console.error(err);
        },
      });
  }

  private _getResolverData(): void {
    this.route.data.pipe(take(1)).subscribe({
      next: (val: { [data: string]: UserDetails }) => (this.userDetails = val["data"]),
    });
  }
}
