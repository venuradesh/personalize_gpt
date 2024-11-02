import { Routes } from "@angular/router";
import { LandingPageComponent } from "./pages/landing-page/landing-page.component";
import { LoginPageComponent } from "./pages/login-page/login-page.component";
import { RegisterPageComponent } from "./pages/register-page/register-page.component";
import { ForgotPasswordComponent } from "./core/layout/forgot-password/forgot-password.component";

export const routes: Routes = [
  {
    path: "",
    redirectTo: "/start",
    pathMatch: "full",
  },
  {
    path: "start",
    pathMatch: "full",
    component: LandingPageComponent,
  },
  {
    path: "login",
    pathMatch: "full",
    component: LoginPageComponent,
  },
  {
    path: "register",
    pathMatch: "full",
    component: RegisterPageComponent,
  },
];
