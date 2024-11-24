import { ApplicationConfig, importProvidersFrom } from "@angular/core";
import { provideRouter } from "@angular/router";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { routes } from "./app.routes";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors } from "@angular/common/http";
import { AuthInterceptor } from "./Interceptors/auth.interceptor";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync("noop"),
    provideHttpClient(),
    importProvidersFrom(BrowserAnimationsModule),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
};
