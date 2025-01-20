import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class NewChatService {
  private startNewChatSubject$ = new BehaviorSubject<void>(undefined);
  startNewChat$ = this.startNewChatSubject$.asObservable();

  createANewChat(): void {
    this.startNewChatSubject$.next();
  }
}
