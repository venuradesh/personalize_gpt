import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

@Component({
  selector: "pgpt-panel-tile",
  standalone: true,
  imports: [],
  templateUrl: "./panel-tile.component.html",
  styleUrl: "./panel-tile.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PanelTileComponent {
  @Input() tileType: "fill" | "primary" | "base" = "base";
}
