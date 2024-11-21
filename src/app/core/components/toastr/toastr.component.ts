import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ToastrPresentationalComponent } from "./toastr-presentational/toastr-presentational.component";
import { CommonModule } from "@angular/common";
import { Toastr } from "../../models/toastr-model";
import { ListComponent } from "../list/list.component";
import { TastrService } from "../../../services/tastr.service";
import { BehaviorSubject, Observable } from "rxjs";

@Component({
  selector: "pgpt-toastr",
  standalone: true,
  imports: [CommonModule, ToastrPresentationalComponent, ListComponent],
  templateUrl: "./toastr.component.html",
  styleUrl: "./toastr.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastrComponent {
  toastrData$: Observable<Toastr[]> = this.toastrService.toasts$;

  constructor(private toastrService: TastrService) {}

  onToastCloseClick(id: number): void {
    this.toastrService.remove(id);
  }
}
