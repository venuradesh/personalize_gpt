import { ApplicationConfig, importProvidersFrom } from "@angular/core";
import { provideRouter } from "@angular/router";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { routes } from "./app.routes";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors, withInterceptorsFromDi } from "@angular/common/http";
import { AuthInterceptor } from "./Interceptors/auth.interceptor";
import { MarkdownModule } from "ngx-markdown";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync("noop"),
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    importProvidersFrom(BrowserAnimationsModule),
    importProvidersFrom(MarkdownModule.forRoot()),
  ],
};
