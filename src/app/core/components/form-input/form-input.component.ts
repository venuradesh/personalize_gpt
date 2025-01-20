import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, forwardRef, inject, Input, OnInit } from "@angular/core";
import { ControlContainer, FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from "@angular/forms";
import { ButtonComponent } from "../button/button.component";
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: "pgpt-form-input",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonComponent, MatIconModule],
  templateUrl: "./form-input.component.html",
  styleUrl: "./form-input.component.scss",
  viewProviders: [{ provide: ControlContainer, useFactory: () => inject(ControlContainer, { skipSelf: true }) }],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormInputComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormInputComponent implements OnInit {
  @Input()
  type: "text" | "number" | "password" = "text";

  @Input()
  inputBehaviorType: "submit" | "normal" = "normal";

  @Input()
  control!: FormControl;

  @Input()
  placeHolder: string = "";

  @Input()
  onSubmitClick: () => void = () => {};

  @Input()
  isReadOnly: boolean = false;

  public showPassword: boolean = false;
  public activatePreviewPassword: boolean = false;

  public ngOnInit(): void {
    if (this.type === "password") {
      this.activatePreviewPassword = true;
    }
  }

  public togglePassword(): void {
    this.showPassword = !this.showPassword;
    this.type = this.showPassword ? "text" : "password";
  }

  public onKeyUp(event: KeyboardEvent): void {
    if (event.code === "Enter" && this.inputBehaviorType === "submit") {
      this.onSubmitBtnClick();
    }
  }

  public onSubmitBtnClick(): void {
    this.onSubmitClick();
  }
}
