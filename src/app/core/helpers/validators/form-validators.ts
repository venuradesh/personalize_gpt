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

  public static dobFieldValidator(errorMessage?: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.touched && !control.dirty) return null;

      const dobRegExp: RegExp = new RegExp(/^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/);
      if (dobRegExp.test(control.value)) {
        return null;
      }
      return { error: errorMessage ?? "Invalid Date format" };
    };
  }

  public static dobValueValidator(minAge: number = 10): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.touched && !control.dirty) return null;

      const birthDate: Date = new Date(control.value);
      const birthYear = birthDate.getFullYear();
      const currentYear = new Date().getFullYear();

      if (birthYear > currentYear) {
        return { error: "Invalid Date format" };
      }

      if (currentYear - birthYear >= minAge) {
        return null;
      }

      return { error: `Age must be greater than ${minAge} years.` };
    };
  }
}
