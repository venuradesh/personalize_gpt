import { ResolveFn, Router } from "@angular/router";
import { UserService } from "../services/user.service";
import { inject } from "@angular/core";
import { NavigationService } from "../services/navigation.service";
import { TastrService } from "../services/tastr.service";
import { UserModel } from "../core/models/user_models";
import { catchError, Observable, of, switchMap, take } from "rxjs";
import { ApiSource } from "../core/models/api_models";

export const userResolver: ResolveFn<Observable<UserModel | null>> = (route, state) => {
  const userService: UserService = inject(UserService);
  const naviagtionService: NavigationService = inject(NavigationService);
  const toastrService: TastrService = inject(TastrService);
  const userId = route.paramMap.get("id");

  if (!userId) {
    // TODO: Navigate this to a different error page
    toastrService.error("Cannot fetch User Data. Please log in.");
    naviagtionService.navigate({ to: "/login" });
    return of(null);
  }

  return userService.getUserData(userId).pipe(
    take(1),
    switchMap((response) => of(response.data as UserModel)),
    catchError((error) => {
      console.error(error);
      toastrService.error(error.message || "An error occurred.", error.name || "Error");
      return of(null);
    })
  );
};
