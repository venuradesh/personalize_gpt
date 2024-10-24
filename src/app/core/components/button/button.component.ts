import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { Router } from "@angular/router";

interface NavigateStructure {
  to: string;
  state?: Object;
}

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
  buttonSize: "small" | "medium" | "large" = "small";

  @Input()
  navigateTo: NavigateStructure = { to: "" };

  constructor(private router: Router) {}

  public onButtonClick(): void {
    if (!this.navigateTo.to) return;
    this.router.navigate([this.navigateTo.to], { state: this.navigateTo.state });
  }
}
