import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, Input, OnInit } from "@angular/core";
import { PgptTranslatePipe } from "../../Pipes/pgpt-translate.pipe";
import { PanelTileComponent } from "../../components/panel-tile/panel-tile.component";
import { ButtonComponent } from "../../components/button/button.component";
import { MatIconModule } from "@angular/material/icon";
import { SidePanelService } from "../../../services/side-panel.service";
import { BehaviorSubject } from "rxjs";
import { UserModel } from "../../models/user_models";
import { NavigationService } from "../../../services/navigation.service";

@Component({
  selector: "pgpt-side-panel",
  standalone: true,
  imports: [CommonModule, PgptTranslatePipe, PanelTileComponent, ButtonComponent, MatIconModule],
  templateUrl: "./side-panel.component.html",
  styleUrl: "./side-panel.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidePanelComponent implements OnInit {
  @Input()
  user: UserModel | undefined = undefined;

  private currentRoute: string = "";
  isOpen$: BehaviorSubject<boolean> = this.sidePanel.isOpen$;

  constructor(private sidePanel: SidePanelService, private navigationService: NavigationService) {}

  public ngOnInit(): void {
    this.currentRoute = this.navigationService.getCurrentUrl();
  }

  togglePanel(): void {
    this.sidePanel.toggle();
  }

  public onProfileClick(): void {
    this.navigationService.navigate({ to: this.currentRoute, fragment: "options/profile" });
  }

  public onChangeLlmClick(): void {
    this.navigationService.navigate({ to: this.currentRoute, fragment: "options/llm" });
  }

  public onGeneralSettingsClick(): void {
    this.navigationService.navigate({ to: this.currentRoute, fragment: "options/general" });
  }
}
