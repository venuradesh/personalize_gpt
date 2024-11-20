import { Injectable } from "@angular/core";
import { environemnt } from "../../environment";
import { Observable } from "rxjs";
import { ClientService } from "./client.service";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private readonly API_URL = environemnt.API_URL;

  constructor(private clientService: ClientService) {}

  public login(email: string, password: string): Observable<Object> {
    const url = `${this.API_URL}/auth/login`;
    return this.clientService.post(url, { email, password });
  }
}
