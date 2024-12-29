import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from "@angular/core";
import { FormInputComponent } from "../form-input/form-input.component";
import { FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from "@angular/forms";
import { FormValidator } from "../../helpers/validators/form-validators";
import { PgptTranslatePipe } from "../../Pipes/pgpt-translate.pipe";
import { FormDateInputComponent } from "../form-date-input/form-date-input.component";
import { ButtonComponent } from "../button/button.component";
import { asyncScheduler, BehaviorSubject, take, timer } from "rxjs";
import { RegisterUserModel } from "../../models/user_models";
import { ActivatedRoute, Router } from "@angular/router";
import { TastrService } from "../../../services/tastr.service";
import { UserService } from "../../../services/user.service";
import { ApiSource, ErrorSource } from "../../models/api_models";
import { Common } from "../../helpers/common";
import { TOAST_DELAY } from "../../models/toastr-model";
import { InternalLoaderComponent } from "../internal-loader/internal-loader.component";

@Component({
  selector: "pgpt-profile",
  standalone: true,
  imports: [CommonModule, FormInputComponent, FormDateInputComponent, ButtonComponent, ReactiveFormsModule, FormsModule, PgptTranslatePipe, InternalLoaderComponent],
  templateUrl: "./profile.component.html",
  styleUrl: "./profile.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent implements OnInit {
  @ViewChild("profileForm") profileForm!: NgForm;

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
  public loading$ = new BehaviorSubject<boolean>(false);

  private initialState: RegisterUserModel | undefined;

  constructor(private route: ActivatedRoute, private toast: TastrService, private userService: UserService, private router: Router) {
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
        this.mapStates(val["user"]);
        this.initialState = this.profileState.value;
      },
    });
  }

  public onSubmitButtonClick(): void {
    if (this.loading$.value) return;
    const isDirty = this.isDirty(this.profileState.value);
    if (isDirty && this.profileForm) {
      this.profileForm.ngSubmit.emit();
    } else {
      this.toast.info("Everything looks good! No changes to save.");
    }
  }

  public onFormsSubmit(): void {
    const changedData: Partial<RegisterUserModel> = this.getChangedItems(this.profileState.value);
    this.loading$.next(true);
    this.userService
      .updateUser(changedData)
      .pipe(take(1))
      .subscribe({
        next: (val: ApiSource) => {
          if (val.error) {
            this.toast.error(val.message);
          } else {
            this.toast.success(val.message);
            asyncScheduler.schedule(() => {
              this.loading$.next(false);
              window.location.reload();
            }, TOAST_DELAY);
          }
        },
        error: (err: ErrorSource) => {
          this.toast.error(err.error.message);
          this.loading$.next(false);
        },
      });
  }

  private getChangedItems(formItems: Record<string, any>): Partial<RegisterUserModel> {
    const changedItems = Object.keys(formItems).reduce((acc, key) => {
      const typekey = key as keyof RegisterUserModel;
      if (formItems[typekey] !== this.initialState?.[typekey]) {
        acc[typekey] = formItems[typekey];
      }

      return acc;
    }, {} as Partial<RegisterUserModel>);

    return Common.convertToPartialRegisterUserModel(changedItems);
  }

  private isDirty(user: Record<string, any>): boolean {
    return JSON.stringify(user) !== JSON.stringify(this.initialState);
  }

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
