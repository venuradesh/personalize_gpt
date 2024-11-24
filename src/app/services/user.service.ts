import { Injectable } from "@angular/core";
import { ClientService } from "./client.service";
import { Observable } from "rxjs";
import { environemnt } from "../../environment";

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
}
