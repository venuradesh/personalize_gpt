import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

@Component({
  selector: "pgpt-button",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./button.component.html",
  styleUrl: "./button.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  @Input()
  buttonType: "base" | "primary" | "disabled" | "fill" = "base";

  @Input()
  buttonSize: "small" | "medium" | "large" | "basic" = "small";

  @Input()
  type: string = "";

  @Input()
  isBorderAdded: boolean = false;

  @Input()
  onClick: () => void = () => {};

  public onButtonClick(): void {
    this.onClick();
  }
}
