import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { ButtonComponent } from "../../core/components/button/button.component";
import { PgptTranslatePipe } from "../../core/Pipes/pgpt-translate.pipe";
import { HistoryService, HistoryState } from "../../services/history.service";
import { HistoryApiService } from "../../services/history-api.service";
import { BehaviorSubject, take } from "rxjs";
import { ApiSource, ErrorSource } from "../../core/models/api_models";
import { TastrService } from "../../services/tastr.service";
import { LoadChatService } from "../../services/load-chat.service";

interface HistoryItem {
  chat_id: string;
  chat_name: string;
}

@Component({
  selector: "pgpt-history",
  standalone: true,
  imports: [CommonModule, ButtonComponent, PgptTranslatePipe],
  templateUrl: "./history.component.html",
  styleUrl: "./history.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HistoryComponent implements OnInit {
  history$ = this.history.historyState$;
  historyList$ = new BehaviorSubject<HistoryItem[]>([]);

  constructor(private history: HistoryService, private historyAPI: HistoryApiService, private toast: TastrService, private loadChat: LoadChatService) {}

  ngOnInit(): void {
    this._getChatHistory();
  }

  onMinimize() {
    this.history.setHistoryState("minimized");
  }

  onClose() {
    this.history.setHistoryState("closed");
  }

  openHistoryContainer(historyState: HistoryState | null) {
    this.history.setHistoryState(historyState === "open" ? "minimized" : "open");
  }

  public onChatHistoryItemClick(chat_id: string) {
    this.onMinimize();
    this._loadChatById(chat_id);
  }

  private _getChatHistory(): void {
    this.historyAPI
      .getHistory()
      .pipe(take(1))
      .subscribe({
        next: (value: ApiSource) => this.historyList$.next(value.data),
        error: (err: ErrorSource) => {
          console.error(err);
          this.toast.error(err.error.message);
        },
      });
  }

  private _loadChatById(chat_id: string): void {
    this.historyAPI
      .loadChatByChatId(chat_id)
      .pipe(take(1))
      .subscribe({
        next: (response: ApiSource) => {
          this.toast.success("Chat loaded by Chat history");
          this.loadChat.setToDefault();
          this.loadChat.loadChatRetrievedByChatId(response.data);
        },
        error: (err: ErrorSource) => {
          console.log(err);
        },
      });
  }
}
