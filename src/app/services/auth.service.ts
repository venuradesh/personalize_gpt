import { Injectable } from "@angular/core";
import { environemnt } from "../../environment";
import { Observable } from "rxjs";
import { ClientService } from "./client.service";
import { CookieService } from "ngx-cookie-service";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private readonly API_URL = environemnt.API_URL;

  constructor(private clientService: ClientService, private cookies: CookieService) {}

  public login(email: string, password: string): Observable<Object> {
    const url = `${this.API_URL}/auth/login`;
    return this.clientService.post(url, { email, password });
  }

  public logout(): Observable<any> {
    const url = `${this.API_URL}/auth/logout`;
    return this.clientService.post(url, {});
  }

  public isAuthenticated(): boolean {
    const token = this.cookies.get("access_token");
    return !!token;
  }

  public forgotPassword(email: string): Observable<any> {
    return this.clientService.post(`${this.API_URL}/auth/forgot-password`, { email });
  }

  public authenticateToken(token: string): Observable<any> {
    const url = `${this.API_URL}/auth/authenticate-email-by-reset-token`;
    return this.clientService.post(url, { reset_token: token });
  }
}
