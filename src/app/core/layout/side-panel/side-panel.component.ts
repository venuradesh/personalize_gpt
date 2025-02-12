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
import { ChatbotState, DocAnalyzerService } from "../../../services/doc-analyzer.service";
import { NewChatService } from "../../../services/new-chat.service";
import { ChatTileComponent } from "../../components/chat-tile/chat-tile.component";

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

  constructor(private sidePanel: SidePanelService, private navigationService: NavigationService, private analyzer: DocAnalyzerService, private newChat: NewChatService) {}

  public ngOnInit(): void {
    this.currentRoute = this.navigationService.getCurrentUrl();
    this.setAnalyzer();
  }

  togglePanel(): void {
    this.sidePanel.toggle();
  }

  public onStartNewChat(): void {
    this.newChat.createANewChat();
  }

  public onDocAnalyzerClick(): void {
    this.analyzer.setAnalyzerState("open");
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

  public onChatHistoryClick(): void {}

  private setAnalyzer(): void {
    const analyzerState = localStorage.getItem("doc-analyzer");
    if (analyzerState) this.analyzer.setAnalyzerState(analyzerState as ChatbotState);
  }
}
