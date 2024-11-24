import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { NavigationService } from "../services/navigation.service";
import { TastrService } from "../services/tastr.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private navigationService: NavigationService, private toastr: TastrService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.navigationService.navigate({ to: "login" });
        }
        this.toastr.error(error.error.message);
        return throwError(() => error);
      })
    );
  }
}
