import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: "pgpt-loading-screen",
  standalone: true,
  imports: [],
  templateUrl: "./loading-screen.component.html",
  styleUrl: "./loading-screen.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingScreenComponent {}
