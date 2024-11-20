import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { TOAST_DELAY, Toastr } from "../../../models/toastr-model";
import { MatIconModule } from "@angular/material/icon";
import { animate, style, transition, trigger } from "@angular/animations";

@Component({
  selector: "pgpt-toastr-presentational",
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: "./toastr-presentational.component.html",
  styleUrl: "./toastr-presentational.component.scss",
  animations: [
    trigger("toastAnimation", [
      transition(":enter", [style({ transform: "translateY(100%)", opacity: 0 }), animate("300ms ease-in", style({ transform: "translateY(0)", opacity: 1 }))]),
      transition(":leave", [animate("300ms ease-out", style({ transform: "translateY(100%)", opacity: 0 }))]),
    ]),
  ],
})
export class ToastrPresentationalComponent implements OnInit {
  @Input({ required: true })
  toastrData!: Toastr;

  @Output()
  removeToast: EventEmitter<number> = new EventEmitter<number>();

  ngOnInit(): void {
    setTimeout(() => {
      this.onCloseClick(this.toastrData._id);
    }, TOAST_DELAY);
  }

  public onCloseClick(id: number): void {
    this.removeToast.emit(id);
  }
}
