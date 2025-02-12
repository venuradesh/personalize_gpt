import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { UserRole } from "../core/models/chat-models";

export interface loadChatItem {
  content: string;
  role: UserRole;
  timestamp: string;
}

@Injectable({
  providedIn: "root",
})
export class LoadChatService {
  private loadChatSubject$ = new BehaviorSubject<loadChatItem[]>([]);
  public loadChat$ = this.loadChatSubject$.asObservable();

  loadChatRetrievedByChatId(chatContent: loadChatItem[]): void {
    this.loadChatSubject$.next(chatContent);
  }

  setToDefault(): void {
    this.loadChatSubject$.next([]);
  }

  getLoadedChat(): loadChatItem[] {
    return this.loadChatSubject$.value;
  }
}
