import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { ButtonComponent } from "../../core/components/button/button.component";
import { FormInputComponent } from "../../core/components/form-input/form-input.component";
import { PgptTranslatePipe } from "../../core/Pipes/pgpt-translate.pipe";
import { FormValidator } from "../../core/helpers/validators/form-validators";
import { FormDateInputComponent } from "../../core/components/form-date-input/form-date-input.component";

@Component({
  selector: "pgpt-register-page",
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ButtonComponent, FormInputComponent, FormDateInputComponent, PgptTranslatePipe],
  templateUrl: "./register-page.component.html",
  styleUrl: "./register-page.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterPageComponent implements OnInit {
  firstName = new FormControl("", [FormValidator.requiredValidator("First Name is required")]);
  lastName = new FormControl("", [FormValidator.requiredValidator("Last Name is required")]);
  dob = new FormControl("", [FormValidator.requiredValidator()]);
  designation = new FormControl("");
  organizationName = new FormControl("");
  country = new FormControl("");
  email = new FormControl("", [FormValidator.emailValidator(), FormValidator.requiredValidator()]);
  personality = new FormControl("");
  password = new FormControl("");
  confPassword = new FormControl("");
  openAiToken = new FormControl("");
  replicateToken = new FormControl("");

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
        replicateToken: this.replicateToken,
      }),
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    console.log(this.registerState);
  }
}
