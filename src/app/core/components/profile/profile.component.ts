import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { FormInputComponent } from "../form-input/form-input.component";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { FormValidator } from "../../helpers/validators/form-validators";
import { PgptTranslatePipe } from "../../Pipes/pgpt-translate.pipe";
import { FormDateInputComponent } from "../form-date-input/form-date-input.component";
import { ButtonComponent } from "../button/button.component";
import { take } from "rxjs";
import { RegisterUserModel, UserModel } from "../../models/user_models";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "pgpt-profile",
  standalone: true,
  imports: [CommonModule, FormInputComponent, FormDateInputComponent, ButtonComponent, ReactiveFormsModule, FormsModule, PgptTranslatePipe],
  templateUrl: "./profile.component.html",
  styleUrl: "./profile.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent implements OnInit {
  firstName = new FormControl("", [FormValidator.requiredValidator("First Name is required")]);
  lastName = new FormControl("", [FormValidator.requiredValidator("Last Name is required")]);
  organizationName = new FormControl("");
  email = new FormControl("", [FormValidator.emailValidator(), FormValidator.requiredValidator("Email is required")]);
  designation = new FormControl("", [FormValidator.requiredValidator("Job Title is required")]);
  dob = new FormControl("", [FormValidator.dobFieldValidator(), FormValidator.dobValueValidator(), FormValidator.requiredValidator("DOB is required")]);
  country = new FormControl("", [FormValidator.requiredValidator("Country is requireed")]);
  password = new FormControl("", [FormValidator.passwordValidator()]);
  describe = new FormControl("", [Validators.maxLength(60)]);
  personality = new FormControl("", [FormValidator.requiredValidator("Personality is required"), Validators.maxLength(20)]);

  public profileState: FormGroup;

  constructor(private route: ActivatedRoute) {
    this.profileState = new FormGroup({
      firstName: this.firstName,
      lastName: this.lastName,
      dob: this.dob,
      email: this.email,
      organizationName: this.organizationName,
      designation: this.designation,
      country: this.country,
      personality: this.personality,
      description: this.describe,
    });
  }

  public ngOnInit(): void {
    this.route.data.pipe(take(1)).subscribe({
      next: (val: { [user: string]: RegisterUserModel }) => {
        // console.log(val["user"]);
        this.mapStates(val["user"]);
      },
    });
  }

  public onFormsSubmit(): void {}

  public onSubmitButtonClick(): void {}

  private mapStates(user: RegisterUserModel): void {
    this.profileState.setValue({
      firstName: user.first_name,
      lastName: user.last_name,
      dob: user.date_of_birth,
      email: user.email,
      organizationName: user.company_name,
      designation: user.job_title,
      country: user.country,
      personality: user.personality,
      description: user.description,
    });
  }
}
