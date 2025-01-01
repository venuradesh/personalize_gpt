import { ChangeDetectionStrategy, Component, ElementRef, HostListener, OnDestroy, OnInit } from "@angular/core";
import { TabsComponent } from "../../core/components/tabs/tabs.component";
import { CommonModule } from "@angular/common";
import { ActivatedRoute } from "@angular/router";
import { NavigationService } from "../../services/navigation.service";
import { Subject, takeUntil } from "rxjs";
import { MatIconModule } from "@angular/material/icon";
import { ButtonComponent } from "../../core/components/button/button.component";
import { ProfileComponent } from "../../core/components/profile/profile.component";
import { LlmChangeComponent } from "../../core/components/llm-change/llm-change.component";
import { GeneralSettingsComponent } from "../../core/components/general-settings/general-settings.component";

@Component({
  selector: "pgpt-options",
  standalone: true,
  imports: [TabsComponent, CommonModule, MatIconModule, ButtonComponent, ProfileComponent, LlmChangeComponent, GeneralSettingsComponent],
  templateUrl: "./options.component.html",
  styleUrl: "./options.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OptionsComponent implements OnInit, OnDestroy {
  public tabs = ["General", "Change LLM", "Profile"];
  public activeIndex: number = 0;

  private currentRoutePath = "";
  private destroy$ = new Subject<void>();

  constructor(private naviagtionService: NavigationService, private elementRef: ElementRef, private route: ActivatedRoute) {}

  public ngOnInit(): void {
    this.currentRoutePath = this.naviagtionService.getCurrentUrl();
    this.subscribeToFragments();
  }

  @HostListener("document:click", ["$event"])
  onBackgroundClick(event: MouseEvent): void {
    const componentClick = this.elementRef.nativeElement.contains(event.target);
    const clickInside = this.elementRef.nativeElement.querySelector(".options-container").contains(event.target);
    if (!clickInside && componentClick) {
      this.onCloseClick();
    }
  }

  private subscribeToFragments(): void {
    const fragmentToIndex = new Map<string, number>([
      ["options/general", 0],
      ["options/llm", 1],
      ["options/profile", 2],
    ]);

    this.route.fragment.pipe(takeUntil(this.destroy$)).subscribe({
      next: (fragment) => {
        this.activeIndex = fragmentToIndex.get(fragment || "") ?? -1;
      },
    });
  }

  public onTabChange(index: number): void {
    const routes = ["options/general", "options/llm", "options/profile"];
    this.naviagtionService.navigate({ to: this.currentRoutePath, fragment: routes[index] });
  }

  public onCloseClick(): void {
    this.naviagtionService.navigate({ to: this.currentRoutePath, fragment: undefined });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
