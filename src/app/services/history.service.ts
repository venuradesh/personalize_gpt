import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

export type HistoryState = "open" | "minimized" | "closed";

@Injectable({
  providedIn: "root",
})
export class HistoryService {
  private HISTORY_KEY = "history";
  private historyStateSubject$ = new BehaviorSubject<HistoryState>("closed");
  public historyState$ = this.historyStateSubject$.asObservable();

  setHistoryState(state: HistoryState): void {
    localStorage.setItem(this.HISTORY_KEY, state);
    this.historyStateSubject$.next(state);
  }

  getHistoryState(): HistoryState {
    return this.historyStateSubject$.value;
  }
}
