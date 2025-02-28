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
import { DocumentAnalyzerComponent } from "../../screens/document-analyzer/document-analyzer.component";
import { DocAnalyzerService } from "../../services/doc-analyzer.service";
import { HistoryComponent } from "../../screens/history/history.component";
import { HistoryService } from "../../services/history.service";

@Component({
  selector: "pgpt-chat-page",
  standalone: true,
  imports: [CommonModule, SidePanelComponent, ChatComponent, MatIconModule, OptionsComponent, DocumentAnalyzerComponent, HistoryComponent],
  templateUrl: "./chat-page.component.html",
  styleUrl: "./chat-page.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatPageComponent implements OnInit, OnDestroy {
  public isOpen$: BehaviorSubject<boolean> = this.sidePanel.isOpen$;
  public user: UserModel | undefined = undefined;
  public isOptionsApplied: boolean | null = false;
  public analyzerState$ = this.analyzer.analyzerState$;
  public historyState$ = this.history.historyState$;

  private destroy$ = new Subject<void>();

  constructor(private sidePanel: SidePanelService, private cdr: ChangeDetectorRef, private route: ActivatedRoute, private analyzer: DocAnalyzerService, private history: HistoryService) {}

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
