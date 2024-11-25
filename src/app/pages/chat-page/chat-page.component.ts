import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { SidePanelComponent } from "../../core/layout/side-panel/side-panel.component";
import { CommonModule } from "@angular/common";
import { ChatComponent } from "../../core/layout/chat/chat.component";
import { MatIconModule } from "@angular/material/icon";
import { SidePanelService } from "../../services/side-panel.service";
import { BehaviorSubject, Observable, of, Subject, switchMap, take, takeUntil } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { UserModel } from "../../core/models/user_models";
import { OptionsComponent } from "../../screens/options/options.component";

@Component({
  selector: "pgpt-chat-page",
  standalone: true,
  imports: [CommonModule, SidePanelComponent, ChatComponent, MatIconModule, OptionsComponent],
  templateUrl: "./chat-page.component.html",
  styleUrl: "./chat-page.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatPageComponent implements OnInit, OnDestroy {
  public isOpen$: BehaviorSubject<boolean> = this.sidePanel.isOpen$;
  public user: UserModel | undefined = undefined;
  public isOptionsApplied: boolean | null = false;

  private destroy$ = new Subject<void>();

  constructor(private sidePanel: SidePanelService, private cdr: ChangeDetectorRef, private route: ActivatedRoute) {}

  public ngOnInit(): void {
    this.setResolverData();
    this.setSettingsActivated();
  }

  private setResolverData(): void {
    this.route.data.pipe(take(1)).subscribe({
      next: (val: { [user: string]: UserModel }) => {
        this.user = val["user"];
      },
    });
  }

  private setSettingsActivated(): void {
    this.route.fragment
      .pipe(
        switchMap((fragment) => of(fragment !== null)),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (val) => {
          this.isOptionsApplied = val;
          this.cdr.markForCheck();
        },
      });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
