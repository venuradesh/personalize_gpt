import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { PgptTranslatePipe } from "../../Pipes/pgpt-translate.pipe";
import { PanelTileComponent } from "../../components/panel-tile/panel-tile.component";
import { ButtonComponent } from "../../components/button/button.component";
import { MatIconModule } from "@angular/material/icon";
import { SidePanelService } from "../../../services/side-panel.service";
import { BehaviorSubject } from "rxjs";
import { UserModel } from "../../models/user_models";

@Component({
  selector: "pgpt-side-panel",
  standalone: true,
  imports: [CommonModule, PgptTranslatePipe, PanelTileComponent, ButtonComponent, MatIconModule],
  templateUrl: "./side-panel.component.html",
  styleUrl: "./side-panel.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidePanelComponent {
  @Input()
  user: UserModel | undefined = undefined;

  isOpen$: BehaviorSubject<boolean> = this.sidePanel.isOpen$;

  constructor(private sidePanel: SidePanelService) {}

  togglePanel(): void {
    this.sidePanel.toggle();
  }
}
