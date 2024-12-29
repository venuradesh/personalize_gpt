import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: "pgpt-internal-loader",
  standalone: true,
  imports: [],
  templateUrl: "./internal-loader.component.html",
  styleUrl: "./internal-loader.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InternalLoaderComponent {}
