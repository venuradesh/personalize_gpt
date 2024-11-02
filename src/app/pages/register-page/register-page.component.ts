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

  constructor() {
    this.registerState = new FormGroup({
      firstName: this.firstName,
      lastName: this.lastName,
      dob: this.dob,
      designation: this.designation,
      organizationName: this.organizationName,
      country: this.country,
      email: this.email,
      personality: this.personality,
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
    }

    if (this.registerState.status === "INVALID") {
      console.log(this.registerState);
      // this.registerState.
    }
  }
}
