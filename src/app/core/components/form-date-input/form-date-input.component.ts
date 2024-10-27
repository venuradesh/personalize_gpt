import { CommonModule } from "@angular/common";
import { Component, ElementRef, Input, ViewChild } from "@angular/core";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";
import { ButtonComponent } from "../button/button.component";
import { FormValidator } from "../../helpers/validators/form-validators";

@Component({
  selector: "pgpt-form-date-input",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatIconModule, ButtonComponent],
  templateUrl: "./form-date-input.component.html",
  styleUrl: "./form-date-input.component.scss",
})
export class FormDateInputComponent {
  @ViewChild("dateInput") dateInput!: ElementRef;

  @Input()
  control!: FormControl;

  @Input()
  placeHolder: string = "";

  public onDateInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.control.setValue(input.value, { emitEvent: true });
    this.control.markAsTouched();
    this.control.updateValueAndValidity();
  }

  public triggerShowPicker(): void {
    this.dateInput?.nativeElement?.showPicker();
  }
}
