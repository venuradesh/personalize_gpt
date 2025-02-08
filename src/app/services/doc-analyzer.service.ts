import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

export type ChatbotState = "open" | "minimized" | "closed";

@Injectable({
  providedIn: "root",
})
export class DocAnalyzerService {
  private analyzerStateSubject$ = new BehaviorSubject<ChatbotState>("closed");
  public analyzerState$ = this.analyzerStateSubject$.asObservable();

  setAnalyzerState(state: ChatbotState): void {
    localStorage.setItem("doc-analyzer", state);
    this.analyzerStateSubject$.next(state);
  }

  getAnalyzerState(): ChatbotState {
    return this.analyzerStateSubject$.value;
  }
}
