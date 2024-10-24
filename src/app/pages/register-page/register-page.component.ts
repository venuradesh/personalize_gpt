import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: "pgpt-register-page",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./register-page.component.html",
  styleUrl: "./register-page.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterPageComponent {}
