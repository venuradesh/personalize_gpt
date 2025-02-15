import { inject } from "@angular/core";
import { CanActivateFn } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { NavigationService } from "../services/navigation.service";
import { firstValueFrom } from "rxjs";
import { LoadingService } from "../services/loading.service";
import { TastrService } from "../services/tastr.service";

export const verifyTokenGuard: CanActivateFn = async (route, state) => {
  const authService: AuthService = inject(AuthService);
  const navigationService: NavigationService = inject(NavigationService);
  const loadingService: LoadingService = inject(LoadingService);
  const toast: TastrService = inject(TastrService);

  const token = route.params["token"];

  if (!token) {
    navigationService.navigate({ to: "/start" });
    return false;
  }

  loadingService.enableLoading();
  try {
    await firstValueFrom(authService.authenticateToken(token));
    return true;
  } catch (err) {
    toast.error("Not a valid reset token");
    navigationService.navigate({ to: "/login" });
    return false;
  } finally {
    loadingService.disbaleLoading();
  }
};
