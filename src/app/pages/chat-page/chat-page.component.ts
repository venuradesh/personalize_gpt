import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { SidePanelComponent } from "../../core/layout/side-panel/side-panel.component";
import { CommonModule } from "@angular/common";
import { ChatComponent } from "../../core/layout/chat/chat.component";
import { MatIconModule } from "@angular/material/icon";
import { SidePanelService } from "../../services/side-panel.service";
import { BehaviorSubject, take } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { UserModel } from "../../core/models/user_models";

@Component({
  selector: "pgpt-chat-page",
  standalone: true,
  imports: [CommonModule, SidePanelComponent, ChatComponent, MatIconModule],
  templateUrl: "./chat-page.component.html",
  styleUrl: "./chat-page.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatPageComponent implements OnInit {
  public isOpen$: BehaviorSubject<boolean> = this.sidePanel.isOpen$;
  public user: UserModel | undefined = undefined;

  constructor(private sidePanel: SidePanelService, private route: ActivatedRoute) {}

  public ngOnInit(): void {
    this.route.data.pipe(take(1)).subscribe({
      next: (val: { [user: string]: UserModel }) => {
        this.user = val["user"];
      },
    });
  }
}
