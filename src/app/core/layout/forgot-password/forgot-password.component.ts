import { CommonModule } from "@angular/common";
import { Component, Input, ViewChild } from "@angular/core";
import { PgptTranslatePipe } from "../../Pipes/pgpt-translate.pipe";
import { BehaviorSubject } from "rxjs";
import { FormInputComponent } from "../../components/form-input/form-input.component";
import { FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule } from "@angular/forms";
import { FormValidator } from "../../helpers/validators/form-validators";
import { ButtonComponent } from "../../components/button/button.component";
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: "pgpt-forgot-password",
  standalone: true,
  imports: [CommonModule, PgptTranslatePipe, FormInputComponent, FormsModule, ReactiveFormsModule, ButtonComponent, MatIconModule],
  templateUrl: "./forgot-password.component.html",
  styleUrl: "./forgot-password.component.scss",
})
export class ForgotPasswordComponent {
  @ViewChild("resetForm") resetForm!: NgForm;
  @Input({ required: true }) backToLogin: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  email = new FormControl("", [FormValidator.emailValidator(), FormValidator.requiredValidator("Email is required")]);
  formsGroup: FormGroup;
  constructor() {
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
    console.log(this.formsGroup);
  }
}
