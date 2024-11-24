import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { NavigationService } from "../services/navigation.service";

export const authGuard: CanActivateFn = (route, state) => {
  const authService: AuthService = inject(AuthService);
  const naviagtionService: NavigationService = inject(NavigationService);
  const isAuthenticated: boolean = authService.isAuthenticated();

  if (!isAuthenticated) {
    naviagtionService.navigate({ to: "/login" });
    return false;
  }

  return true;
};
