import { Injectable } from "@angular/core";
import { ClientService } from "./client.service";
import { Observable, of } from "rxjs";
import { environemnt } from "../../environment";
import { APIKeys, RegisterUserModel } from "../core/models/user_models";
import { ModelActivationStaus } from "../core/models/llm-models";

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

    return this.clientService.put(url, user_details);
  }

  public updateLLMModal(choosen_llm: ModelActivationStaus, api_key: string): Observable<any> {
    const url = `${this.API_URL}/user/update-llm-modal`;
    return this.clientService.put(url, { choosen_llm, api_key });
  }

  public resetPassword(user_id: string, password: string): Observable<any> {
    const url = `${this.API_URL}/user/password-reset`;
    return this.clientService.put(url, { user_id, password });
  }
}
