import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: "pgpt-form-date-input",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatIconModule],
  templateUrl: "./form-date-input.component.html",
  styleUrl: "./form-date-input.component.scss",
})
export class FormDateInputComponent {
  @Input()
  control!: FormControl;

  @Input()
  placeHolder: string = "";

  public activatePlaceholder: boolean = true;
  public inputValue: string = "";

  public onDateInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.inputValue = input.value;
    this.activatePlaceholder = false;
  }
}
