import { Injectable, OnDestroy } from "@angular/core";
import { BehaviorSubject, Subject, takeUntil } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class SidePanelService implements OnDestroy {
  public isOpen$: BehaviorSubject<boolean>;

  private SIDE_PANEL_VISIBILITY = "side-panel-visibility";
  private destroy$ = new Subject<void>();

  constructor() {
    this.isOpen$ = new BehaviorSubject<boolean>(this.getPreference());
    this.setLocalStorageValue();
  }

  public open(): void {
    this.isOpen$.next(true);
  }

  public close(): void {
    this.isOpen$.next(false);
  }

  public toggle(): void {
    this.isOpen$.next(!this.isOpen$.value);
  }

  private getPreference(): boolean {
    const side_panel_visibility: string | null = localStorage.getItem(this.SIDE_PANEL_VISIBILITY);
    return side_panel_visibility ? side_panel_visibility === "true" : true;
  }

  private setLocalStorageValue(): void {
    this.isOpen$.pipe(takeUntil(this.destroy$)).subscribe({
      next: (val: boolean) => localStorage.setItem(this.SIDE_PANEL_VISIBILITY, String(val)),
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
