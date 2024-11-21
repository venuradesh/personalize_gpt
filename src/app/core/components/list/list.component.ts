import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";

@Component({
  selector: "pgpt-list",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./list.component.html",
  styleUrl: "./list.component.scss",
})
export class ListComponent {
  @Input()
  orientation: "horizontal" | "vertical" = "vertical";
}
