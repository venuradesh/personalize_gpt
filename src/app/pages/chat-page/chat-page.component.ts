import { ChangeDetectionStrategy, Component } from "@angular/core";
import { SidePanelComponent } from "../../core/layout/side-panel/side-panel.component";
import { CommonModule } from "@angular/common";
import { ChatComponent } from "../../core/layout/chat/chat.component";
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: "pgpt-chat-page",
  standalone: true,
  imports: [CommonModule, SidePanelComponent, ChatComponent, MatIconModule],
  templateUrl: "./chat-page.component.html",
  styleUrl: "./chat-page.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatPageComponent {}