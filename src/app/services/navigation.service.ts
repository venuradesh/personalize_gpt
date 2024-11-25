import { Location } from "@angular/common";
import { Injectable } from "@angular/core";
import { ActivatedRoute, Data, NavigationEnd, Router } from "@angular/router";
import { filter, Observable } from "rxjs";

export interface NavigateStructure {
  to: string;
  state?: Object;
  fragment?: string;
}

@Injectable({
  providedIn: "root",
})
export class NavigationService {
  constructor(private router: Router, private location: Location) {}

  public navigate(event: NavigateStructure): void {
    this.router.navigate([event.to], { state: event.state, fragment: event.fragment });
  }

  public navigateBack() {
    this.location.back();
  }

  public getState(): { [key: string]: any } | undefined {
    return this.router.getCurrentNavigation()?.extras?.state;
  }

  public getCurrentUrl(): string {
    return this.router.url.split("#")[0];
  }
}
