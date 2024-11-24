import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { NavigationService } from "../services/navigation.service";
import { TastrService } from "../services/tastr.service";

export const authGuard: CanActivateFn = (route, state) => {
  const authService: AuthService = inject(AuthService);
  const naviagtionService: NavigationService = inject(NavigationService);
  const toastrService: TastrService = inject(TastrService);
  const isAuthenticated: boolean = authService.isAuthenticated();

  if (!isAuthenticated) {
    toastrService.error("Cannot Generate an access token, Try again.");
    naviagtionService.navigate({ to: "/login" });
    return false;
  }

  return true;
};
