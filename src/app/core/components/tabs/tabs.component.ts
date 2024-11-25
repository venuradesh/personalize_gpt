import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "pgpt-tabs",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./tabs.component.html",
  styleUrl: "./tabs.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsComponent {
  @Input({ required: true })
  tabs: string[] = [];

  @Input()
  activeIndex: number = 0;

  @Output()
  tabChange = new EventEmitter<number>();

  public onTabClick(index: number): void {
    this.tabChange.emit(index);
  }
}
