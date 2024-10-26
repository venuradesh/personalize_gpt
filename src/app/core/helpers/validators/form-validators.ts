import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export class FormValidator {
  public static requiredValidator(errorMessage: string | undefined): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const isValid: boolean = control.value != null && control.value !== "";

      if (!control.touched && !control.dirty) {
        return null;
      }

      return isValid ? null : { error: errorMessage ?? "Required" };
    };
  }
}
