import { ResolveFn, Router } from "@angular/router";
import { UserService } from "../services/user.service";
import { inject } from "@angular/core";
import { NavigationService } from "../services/navigation.service";
import { TastrService } from "../services/tastr.service";
import { UserModel } from "../core/models/user_models";
import { catchError, delay, Observable, of, switchMap, take } from "rxjs";
import { ApiSource } from "../core/models/api_models";
import { LoadingService } from "../services/loading.service";

export const userResolver: ResolveFn<Observable<UserModel | null>> = (route, state) => {
  const userService: UserService = inject(UserService);
  const naviagtionService: NavigationService = inject(NavigationService);
  const toastrService: TastrService = inject(TastrService);
  const loading: LoadingService = inject(LoadingService);

  loading.enableLoading();
  const userId = route.paramMap.get("id");

  if (!userId) {
    // TODO: Navigate this to a different error page
    loading.disbaleLoading();
    toastrService.error("Cannot fetch User Data. Please log in.");
    naviagtionService.navigate({ to: "/login" });
    return of(null);
  }

  return userService.getUserData(userId).pipe(
    switchMap((response) => {
      loading.disbaleLoading();
      return of(response.data as UserModel);
    }),
    catchError((error) => {
      console.error(error);
      loading.disbaleLoading();
      toastrService.error(error.message || "An error occurred.", error.name || "Error");
      return of(null);
    }),
    take(1)
  );
};
