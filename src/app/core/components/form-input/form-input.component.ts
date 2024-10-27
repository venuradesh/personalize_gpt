import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, forwardRef, inject, Input, OnInit } from "@angular/core";
import { ControlContainer, FormControl, FormGroup, NG_VALUE_ACCESSOR, ReactiveFormsModule } from "@angular/forms";

@Component({
  selector: "pgpt-form-input",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
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
export class FormInputComponent {
  @Input()
  type: "text" | "number" = "text";

  @Input()
  control!: FormControl;

  @Input()
  placeHolder: string = "";
}
