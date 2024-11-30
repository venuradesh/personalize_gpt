import { FormGroup } from "@angular/forms";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { filter, map, Observable } from "rxjs";
import { RegisterUserModel } from "../models/user_models";

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

  public static convertToRegisterUserModel(formState: FormGroup, llm_selected: string): RegisterUserModel | null {
    if (!formState.valid) return null;

    const formValue = formState.value;

    return {
      first_name: formValue.firstName,
      last_name: formValue.lastName,
      date_of_birth: formValue.dob,
      job_title: formValue.designation,
      company_name: formValue.organizationName,
      country: formValue.country,
      email: formValue.email,
      personality: formValue.personality,
      description: formValue.description,
      password: formValue.password,
      choosen_llm: llm_selected,
      openai_api_key: formValue.apiTokens?.openAiToken,
      llama_api_key: formValue.apiTokens?.llamaApiToken,
    };
  }

  public static isChildRouteActivated(route: ActivatedRoute): Observable<boolean> {
    return new Router().events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => this.checkForChildRoutes(route))
    );
  }
}
