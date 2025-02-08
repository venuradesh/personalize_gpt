import { CommonModule } from "@angular/common";
import { Component, importProvidersFrom, Input } from "@angular/core";
import { ChatDataSource } from "../../models/chat-models";
import { PgptDatePipe } from "../../Pipes/pgpt-date.pipe";

import { MarkdownModule } from "ngx-markdown";
import { HttpClientModule } from "@angular/common/http";

@Component({
  selector: "pgpt-chat-tile",
  standalone: true,
  imports: [CommonModule, PgptDatePipe, MarkdownModule],

  templateUrl: "./chat-tile.component.html",
  styleUrl: "./chat-tile.component.scss",
})
export class ChatTileComponent {
  @Input({ required: true })
  tileContent!: ChatDataSource;

  @Input()
  isAnalyzer: boolean = false;
}
