import { Component } from "@angular/core";
import { ToastrPresentationalComponent } from "./toastr-presentational/toastr-presentational.component";
import { CommonModule } from "@angular/common";
import { Toastr } from "../../models/toastr-model";

@Component({
  selector: "pgpt-toastr",
  standalone: true,
  imports: [CommonModule, ToastrPresentationalComponent],
  templateUrl: "./toastr.component.html",
  styleUrl: "./toastr.component.scss",
})
export class ToastrComponent {
  toastrData: Toastr = {
    _id: 1,
    type: "info",
    message: "Your Password has been successfully changed.",
    title: "Successfully Created",
  };
}
