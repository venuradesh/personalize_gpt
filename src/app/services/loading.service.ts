import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class LoadingService {
  private loadingState = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingState.asObservable();

  public enableLoading(): void {
    this.loadingState.next(true);
  }

  public disbaleLoading(): void {
    this.loadingState.next(false);
  }
}
