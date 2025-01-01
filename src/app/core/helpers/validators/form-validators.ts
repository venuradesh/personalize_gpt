import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { APIKeys } from "../../models/user_models";

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

  public static passwordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.touched && !control.dirty) return null;

      const regExp: RegExp = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/);
      if (regExp.test(control.value)) return null;

      return { error: "Password must contain at least 8 characters containing one uppercase letter, one lowercase letter, one number, and one special character." };
    };
  }

  public static passwordMatcher(password: AbstractControl): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.touched && !control.dirty) return null;

      if (password.value === control.value) {
        return null;
      }

      if (!password.value) return { error: "Please enter the password first" };

      return { error: "Confirmation password must match the original password" };
    };
  }

  public static openAiKeyValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.touched && !control.dirty) return null;

      const regExp: RegExp = new RegExp(/^sk-.{47,}$/);
      if (!regExp.test(control.value)) return { error: "Please enter a valid OpenAI API Key" };

      return null;
    };
  }

  public static llamaAIAPIKeyValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.touched && !control.dirty) return null;

      const regExp: RegExp = new RegExp(/^gsk_.{50,}$/);
      if (!regExp.test(control.value)) return { error: "Please enter a valid Groqcloud API Key" };

      return null;
    };
  }
}
