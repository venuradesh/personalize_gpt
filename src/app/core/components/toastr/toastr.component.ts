import { Component } from "@angular/core";
import { ToastrPresentationalComponent } from "./toastr-presentational/toastr-presentational.component";
import { CommonModule } from "@angular/common";
import { Toastr } from "../../models/toastr-model";
import { ListComponent } from "../list/list.component";

@Component({
  selector: "pgpt-toastr",
  standalone: true,
  imports: [CommonModule, ToastrPresentationalComponent, ListComponent],
  templateUrl: "./toastr.component.html",
  styleUrl: "./toastr.component.scss",
})
export class ToastrComponent {
  toastrData: Array<Toastr> = [
    {
      _id: 1,
      type: "info",
      message: "Your Password has been successfully changed.",
      title: "Successfully Created",
    },

    {
      _id: 2,
      type: "error",
      message: "Your Password has been successfully changed.",
      title: "Error Occured",
    },
  ];

  onToastCloseClick(id: number): void {
    this.toastrData = this.toastrData.filter((toast) => toast._id !== id);
  }
}
