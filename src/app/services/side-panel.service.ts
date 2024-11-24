import { HostListener, Injectable, OnDestroy } from "@angular/core";
import { BehaviorSubject, debounceTime, fromEvent, map, Subject, takeUntil } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class SidePanelService implements OnDestroy {
  private SIDE_PANEL_VISIBILITY = "side-panel-visibility";
  private MEDIUM_SCREEN_WIDTH: number = 768;

  public isOpen$: BehaviorSubject<boolean>;

  private windowWidth: number = window.innerWidth;
  private destroy$ = new Subject<void>();

  constructor() {
    this.isOpen$ = new BehaviorSubject<boolean>(this.getPreference());
    this.setLocalStorageValue();
    this.onResize();
  }

  // Listen to window resize event
  private onResize(): void {
    fromEvent(window, "resize")
      .pipe(
        map(() => window.innerWidth),
        takeUntil(this.destroy$)
      )
      .subscribe((width: number) => this.handleWidth(width));
  }

  private handleWidth(width: number) {
    this.windowWidth = width;
    if (width <= this.MEDIUM_SCREEN_WIDTH) this.close();
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
    const isMediumScreen: boolean = this.windowWidth <= this.MEDIUM_SCREEN_WIDTH;
    const side_panel_visibility: string | null = localStorage.getItem(this.SIDE_PANEL_VISIBILITY);
    return side_panel_visibility ? side_panel_visibility === "true" : isMediumScreen ? false : true;
  }

  private setLocalStorageValue(): void {
    this.isOpen$.pipe(takeUntil(this.destroy$)).subscribe({
      next: (val: boolean) => {
        if (this.windowWidth > this.MEDIUM_SCREEN_WIDTH) localStorage.setItem(this.SIDE_PANEL_VISIBILITY, String(val));
        else localStorage.removeItem(this.SIDE_PANEL_VISIBILITY);
      },
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
