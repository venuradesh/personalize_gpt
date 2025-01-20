import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { ButtonComponent } from "../button/button.component";

@Component({
  selector: "pgpt-confirmation-dialog",
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: "./confirmation-dialog.component.html",
  styleUrl: "./confirmation-dialog.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmationDialogComponent {
  @Input() modelHeading: string = "";

  @Input() modelContent: string = "";

  @Input() modelApproveText: string = "Confirm";

  @Input() modelDelineText: string = "Decline";

  @Input() closeClick = () => {};

  @Input() confirmClick = () => {};

  @Input() declineClick = () => {};
}
