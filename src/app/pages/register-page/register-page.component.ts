import { CommonModule, NgFor } from "@angular/common";
import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from "@angular/core";
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from "@angular/forms";
import { ButtonComponent } from "../../core/components/button/button.component";
import { FormInputComponent } from "../../core/components/form-input/form-input.component";
import { PgptTranslatePipe } from "../../core/Pipes/pgpt-translate.pipe";
import { FormValidator } from "../../core/helpers/validators/form-validators";
import { FormDateInputComponent } from "../../core/components/form-date-input/form-date-input.component";
import { FooterComponent } from "../../core/layout/footer/footer.component";
import { Common } from "../../core/helpers/common";
import { TastrService } from "../../services/tastr.service";
import { RegisterUserModel } from "../../core/models/user_models";
import { UserService } from "../../services/user.service";
import { ApiSource, ErrorSource } from "../../core/models/api_models";
import { LoadingService } from "../../services/loading.service";
import { catchError, Observable, of, switchMap, take } from "rxjs";
import { NavigationService } from "../../services/navigation.service";

@Component({
  selector: "pgpt-register-page",
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, FooterComponent, ButtonComponent, FormInputComponent, FormDateInputComponent, PgptTranslatePipe],
  templateUrl: "./register-page.component.html",
  styleUrl: "./register-page.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterPageComponent implements OnInit {
  @ViewChild("registerForm") registerForm!: NgForm;

  firstName = new FormControl("", [FormValidator.requiredValidator("First Name is required")]);
  lastName = new FormControl("", [FormValidator.requiredValidator("Last Name is required")]);
  dob = new FormControl("", [FormValidator.dobFieldValidator(), FormValidator.dobValueValidator(), FormValidator.requiredValidator("DOB is required")]);
  designation = new FormControl("", [FormValidator.requiredValidator("Job Title is required")]);
  organizationName = new FormControl("");
  email = new FormControl("", [FormValidator.emailValidator(), FormValidator.requiredValidator("Email is required")]);
  personality = new FormControl("", [FormValidator.requiredValidator("Personality is required"), Validators.maxLength(20)]);
  country = new FormControl("", [FormValidator.requiredValidator("Country is requireed")]);
  password = new FormControl("", [FormValidator.passwordValidator(), FormValidator.requiredValidator("Password is Required")]);
  confPassword = new FormControl("", [FormValidator.passwordMatcher(this.password), FormValidator.requiredValidator("Confirmation password is required")]);
  describe = new FormControl("", [Validators.maxLength(60)]);
  openAiToken = new FormControl("", [FormValidator.requiredValidator("OpenAi API Key is required")]);

  registerState: FormGroup;

  constructor(private toast: TastrService, private userService: UserService, private loading: LoadingService, private navigationService: NavigationService) {
    this.registerState = new FormGroup({
      firstName: this.firstName,
      lastName: this.lastName,
      dob: this.dob,
      organizationName: this.organizationName,
      designation: this.designation,
      country: this.country,
      email: this.email,
      personality: this.personality,
      description: this.describe,
      password: this.password,
      confPassword: this.password,

      apiTokens: new FormGroup({
        openAiToken: this.openAiToken,
      }),
    });
  }

  ngOnInit(): void {}

  onSubmitButtonClick(): void {
    if (this.registerForm) {
      Common.triggerFormChecks(this.registerState);
      this.registerForm.ngSubmit.emit();
    }
  }

  onFormSubmit(): void {
    if (this.registerState.status === "VALID") {
      this.loading.enableLoading();
      const registerUserModel: RegisterUserModel | null = Common.convertToRegisterUserModel(this.registerState);
      this.registerUser(registerUserModel).subscribe({
        next: (val: ApiSource | null) => {
          this.loading.disbaleLoading();

          if (!val) return;
          this.toast.success(val.message);
          this.navigationService.navigate({ to: "/login" });
        },
      });
    }

    if (this.registerState.status === "INVALID") {
      this.toast.error("Please Fill all the required fields", "Registration Error");
    }
  }

  private registerUser(registerModel: RegisterUserModel | null): Observable<ApiSource | null> {
    if (!registerModel) return of(null);

    return this.userService.registerUser(registerModel).pipe(
      switchMap((val: any) => {
        if (!val) return of(null);
        return of({ message: val.message, data: val.data, error: val.error });
      }),
      catchError((err: ErrorSource) => {
        this.toast.error(err.error.message);
        console.error(err);
        return of(null);
      })
    );
  }
}
