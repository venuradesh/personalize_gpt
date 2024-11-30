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
import { catchError, Observable, of, Subject, switchMap, take, takeUntil } from "rxjs";
import { NavigationService } from "../../services/navigation.service";
import { ActivatedRoute } from "@angular/router";
import { ModelActivationStaus } from "../../core/models/llm-models";

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

  public isOpenAIActivated: boolean = false;
  public isLlamaActivated: boolean = false;

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
  llamaApiToken = new FormControl("", [FormValidator.requiredValidator("Llama API Key is required")]);

  registerState: FormGroup;

  private destroy$ = new Subject<void>();

  constructor(private toast: TastrService, private userService: UserService, private loading: LoadingService, private navigationService: NavigationService, private route: ActivatedRoute) {
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

      apiTokens: new FormGroup({}),
    });
  }

  public ngOnInit(): void {
    this.route.params.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      this.setModelStatus(params["model"]);
    });
  }

  onSubmitButtonClick(): void {
    if (this.registerForm) {
      Common.triggerFormChecks(this.registerState);
      this.registerForm.ngSubmit.emit();
    }
  }

  private setModelStatus(modelType: string): void {
    const apiTokenGroup = this.registerState.get("apiTokens") as FormGroup;

    if (!apiTokenGroup) {
      this.toast.error("apiTokens group is not initialized.", "Client Error!");
      return;
    }

    this.isOpenAIActivated = modelType === ModelActivationStaus.OPENAI;
    this.isLlamaActivated = modelType === ModelActivationStaus.LLAMA;

    if (this.isOpenAIActivated) {
      apiTokenGroup.addControl("openAiToken", this.openAiToken);
      apiTokenGroup.removeControl("llamaApiToken");
    } else if (this.isLlamaActivated) {
      apiTokenGroup.addControl("llamaApiToken", this.llamaApiToken);
      apiTokenGroup.removeControl("openAiToken");
    } else {
      this.toast.error("Please Select a Model");
    }
  }

  onFormSubmit(): void {
    if (this.registerState.status === "VALID") {
      this.loading.enableLoading();

      const modelSelected: string = this.isOpenAIActivated ? ModelActivationStaus.OPENAI : ModelActivationStaus.LLAMA;
      const registerUserModel: RegisterUserModel | null = Common.convertToRegisterUserModel(this.registerState, modelSelected);

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

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
