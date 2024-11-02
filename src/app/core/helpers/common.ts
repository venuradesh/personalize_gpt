import { AbstractControl, FormGroup } from "@angular/forms";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { filter, map, Observable } from "rxjs";
import { NavigationService } from "../../services/navigation.service";
import { Inject, Injector } from "@angular/core";

export class Common {
  constructor() {}

  private static checkForChildRoutes(route: ActivatedRoute): boolean {
    return route.firstChild != null;
  }

  public static triggerFormChecks(formState: FormGroup) {
    Object.keys(formState.controls).forEach((field) => {
      const control = formState.get(field);
      control?.markAsTouched();
      control?.markAsDirty();
      control?.updateValueAndValidity();

      if (control instanceof FormGroup) {
        Object.keys(control.controls).forEach((nestedField) => {
          const nestedControl = control.get(nestedField);
          nestedControl?.markAllAsTouched();
          nestedControl?.markAsDirty();
          nestedControl?.updateValueAndValidity();
        });
      }
    });
  }

  public static isChildRouteActivated(route: ActivatedRoute): Observable<boolean> {
    return new Router().events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => this.checkForChildRoutes(route))
    );
  }
}
