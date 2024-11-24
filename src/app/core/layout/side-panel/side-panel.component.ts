import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from "@angular/core";
import { PgptTranslatePipe } from "../../Pipes/pgpt-translate.pipe";
import { PanelTileComponent } from "../../components/panel-tile/panel-tile.component";
import { ButtonComponent } from "../../components/button/button.component";
import { MatIconModule } from "@angular/material/icon";
import { SidePanelService } from "../../../services/side-panel.service";
import { BehaviorSubject, take } from "rxjs";
import { UserModel } from "../../models/user_models";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "pgpt-side-panel",
  standalone: true,
  imports: [CommonModule, PgptTranslatePipe, PanelTileComponent, ButtonComponent, MatIconModule],
  templateUrl: "./side-panel.component.html",
  styleUrl: "./side-panel.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidePanelComponent implements OnInit {
  isOpen$: BehaviorSubject<boolean> = this.sidePanel.isOpen$;
  user: UserModel | undefined = undefined;

  constructor(private sidePanel: SidePanelService, private route: ActivatedRoute) {}

  public ngOnInit(): void {
    this.route.data.pipe(take(1)).subscribe({
      next: (val: { [user: string]: UserModel }) => (this.user = val["user"]),
    });
  }

  togglePanel(): void {
    this.sidePanel.toggle();
  }
}
