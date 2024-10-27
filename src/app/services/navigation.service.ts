import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

export interface NavigateStructure {
  to: string;
  state?: Object;
}

@Injectable({
  providedIn: "root",
})
export class NavigationService {
  constructor(private router: Router) {}

  public navigate(event: NavigateStructure): void {
    this.router.navigate([event.to], { state: event.state });
  }
}
