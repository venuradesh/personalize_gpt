import { Routes } from "@angular/router";
import { LandingPageComponent } from "./pages/landing-page/landing-page.component";
import { LoginPageComponent } from "./pages/login-page/login-page.component";
import { RegisterPageComponent } from "./pages/register-page/register-page.component";
import { ForgotPasswordComponent } from "./core/layout/forgot-password/forgot-password.component";
import { ChatPageComponent } from "./pages/chat-page/chat-page.component";
import { authGuard } from "./guards/auth.guard";
import { userResolver } from "./Resolvers/user.resolver";

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
  {
    path: "chat/:id",
    component: ChatPageComponent,
    resolve: { user: userResolver },
    canActivate: [authGuard],
  },
];
