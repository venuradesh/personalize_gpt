import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { ChatDataSource } from "../../models/chat-models";
import { PgptDatePipe } from "../../Pipes/pgpt-date.pipe";

@Component({
  selector: "pgpt-chat-tile",
  standalone: true,
  imports: [CommonModule, PgptDatePipe],
  templateUrl: "./chat-tile.component.html",
  styleUrl: "./chat-tile.component.scss",
})
export class ChatTileComponent {
  @Input({ required: true })
  tileContent!: ChatDataSource;
}
