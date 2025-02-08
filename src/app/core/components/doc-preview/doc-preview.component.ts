import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

@Component({
  selector: "pgpt-doc-preview",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./doc-preview.component.html",
  styleUrl: "./doc-preview.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocPreviewComponent {
  @Input({ required: true }) file: File | null = null;

  @Input() fileName!: string;
}
