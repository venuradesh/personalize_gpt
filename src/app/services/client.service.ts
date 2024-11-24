import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CookieService } from "ngx-cookie-service";

@Injectable({
  providedIn: "root",
})
export class ClientService {
  private options = {};

  constructor(private readonly httpClient: HttpClient, private cookies: CookieService) {
    this.options = {
      withCredentials: true,
      headers: {
        // "X-CSRF-TOKEN": this.cookies.get("csrf_access_token"), //Disabled the CSFR TOKEN in API
        "Content-Type": "application/json",
      },
    };
  }

  public post(url: string, body: any | null): Observable<Object> {
    return this.httpClient.post(url, body, this.options);
  }

  public get(url: string): Observable<object> {
    return this.httpClient.get(url, this.options);
  }
}
