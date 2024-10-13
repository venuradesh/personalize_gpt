import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";

@Component({
  selector: "pgpt-button",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./button.component.html",
  styleUrl: "./button.component.scss",
})
export class ButtonComponent {
  @Input()
  buttonType: "base" | "primary" | "disabled" | "fill" = "base";

  @Input()
  buttonSize: "small" | "medium" | "large" = "small";
}
