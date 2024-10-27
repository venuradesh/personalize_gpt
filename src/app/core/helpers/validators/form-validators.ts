import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export class FormValidator {
  public static requiredValidator(errorMessage?: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const isValid: boolean = control.value != null && control.value !== "";

      if (!control.touched && !control.dirty) {
        return null;
      }

      return isValid ? null : { error: errorMessage ?? "Required" };
    };
  }

  public static emailValidator(errorMessage?: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.touched && !control.dirty) return null;

      const emailRefExp: RegExp = new RegExp(/^[-!#-'*+\/-9=?^-~]+(?:\.[-!#-'*+\/-9=?^-~]+)*@[-!#-'*+\/-9=?^-~]+(?:\.[-!#-'*+\/-9=?^-~]+)+$/i);

      if (emailRefExp.test(control.value)) {
        return null;
      }

      return { error: errorMessage ?? "Email Invalid" };
    };
  }
}
