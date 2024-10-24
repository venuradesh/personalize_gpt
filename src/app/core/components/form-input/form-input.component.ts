import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: "pgpt-form-input",
  standalone: true,
  imports: [],
  templateUrl: "./form-input.component.html",
  styleUrl: "./form-input.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormInputComponent {}
