import { ResolveFn } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { NavigationService } from "../services/navigation.service";
import { LoadingService } from "../services/loading.service";
import { inject } from "@angular/core";
import { TastrService } from "../services/tastr.service";
import { catchError, Observable, of, switchMap, take } from "rxjs";
import { ApiSource, ErrorSource } from "../core/models/api_models";

interface TokenResponse {
  email: string;
  user_id: string;
}

export const passwordResetResolver: ResolveFn<Observable<TokenResponse | null>> = (route, state) => {
  const authService: AuthService = inject(AuthService);
  const loadingService: LoadingService = inject(LoadingService);
  const toast: TastrService = inject(TastrService);

  const token = route.paramMap.get("token");
  if (!token) return of(null);

  loadingService.enableLoading();
  return authService.authenticateToken(token).pipe(
    switchMap((response: ApiSource) => {
      loadingService.disbaleLoading();
      return of(response.data as TokenResponse);
    }),
    catchError((error: ErrorSource) => {
      toast.error(error.error.message);
      loadingService.disbaleLoading();
      return of(null);
    })
  );
};
