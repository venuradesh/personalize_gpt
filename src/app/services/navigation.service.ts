import { Location } from "@angular/common";
import { Injectable } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { filter, Observable } from "rxjs";

export interface NavigateStructure {
  to: string;
  state?: Object;
}

@Injectable({
  providedIn: "root",
})
export class NavigationService {
  constructor(private router: Router, private location: Location) {}

  public navigate(event: NavigateStructure): void {
    this.router.navigate([event.to], { state: event.state });
  }

  public navigateBack() {
    this.location.back();
  }
}
