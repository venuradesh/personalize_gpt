import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ButtonComponent } from "../../core/components/button/button.component";
import { FormInputComponent } from "../../core/components/form-input/form-input.component";
import { PgptTranslatePipe } from "../../core/Pipes/pgpt-translate.pipe";

@Component({
  selector: "pgpt-register-page",
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ButtonComponent, FormInputComponent, PgptTranslatePipe],
  templateUrl: "./register-page.component.html",
  styleUrl: "./register-page.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterPageComponent {
  firstName = new FormControl("");
  lastName = new FormControl("");
  dob = new FormControl("");
  designation = new FormControl("");
  organizationName = new FormControl("");
  country = new FormControl("");
  email = new FormControl("");
  personality = new FormControl("");
  password = new FormControl("");
  confPassword = new FormControl("");
  openAiToken = new FormControl("");
  replicateToken = new FormControl("");

  registerState: FormGroup;

  constructor(private fb: FormBuilder) {
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

  onSubmit(): void {
    console.log(this.registerState);
  }
}
