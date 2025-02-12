import { Injectable } from "@angular/core";
import { BehaviorSubject, take, timer } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class NewChatService {
  private startNewChatSubject$ = new BehaviorSubject<boolean>(false);
  startNewChat$ = this.startNewChatSubject$.asObservable();

  createANewChat(): void {
    this.startNewChatSubject$.next(true);
    timer(100)
      .pipe(take(1))
      .subscribe({
        next: () => this.setToDefault(),
      });
  }

  setToDefault(): void {
    this.startNewChatSubject$.next(false);
  }
}
