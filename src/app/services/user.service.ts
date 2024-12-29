import { Injectable } from "@angular/core";
import { ClientService } from "./client.service";
import { Observable, of } from "rxjs";
import { environemnt } from "../../environment";
import { RegisterUserModel } from "../core/models/user_models";

@Injectable({
  providedIn: "root",
})
export class UserService {
  private readonly API_URL = environemnt.API_URL;

  constructor(private clientService: ClientService) {}

  public getUserData(user_id: string): Observable<any> {
    const url = `${this.API_URL}/user/get_user_details?user_id=${user_id}`;
    return this.clientService.get(url);
  }

  public registerUser(user_details: RegisterUserModel | null): Observable<Object | null> {
    if (!user_details) return of(null);

    const url = `${this.API_URL}/user/register`;
    return this.clientService.post(url, user_details);
  }

  public updateUser(user_details: Partial<RegisterUserModel>): Observable<any> {
    const url = `${this.API_URL}/user/update-user`;

    return this.clientService.post(url, user_details);
  }
}
