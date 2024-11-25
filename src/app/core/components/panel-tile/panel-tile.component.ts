import { ChangeDetectionStrategy, Component, Input, Output } from "@angular/core";

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

  @Input()
  onTileClick: () => void = () => {};

  onTileItemClick(): void {
    this.onTileClick();
  }
}
