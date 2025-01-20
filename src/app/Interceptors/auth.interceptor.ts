import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { NavigationService } from "../services/navigation.service";
import { TastrService } from "../services/tastr.service";
import { LoadingService } from "../services/loading.service";
import { CookieService } from "ngx-cookie-service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private navigationService: NavigationService, private toastr: TastrService, private loading: LoadingService, private cookie: CookieService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        const acceptedErrorCodes = [422, 401];
        if (acceptedErrorCodes.includes(error.status)) {
          this.navigationService.navigate({ to: "login" });
          this.cookie.deleteAll();
          this.toastr.error("Access restricted. Please log in to continue.", "Authentication Needed");
        } else {
          this.toastr.error(error.message);
        }
        this.loading.disbaleLoading();
        return throwError(() => error);
      })
    );
  }
}
