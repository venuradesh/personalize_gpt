import { Injectable } from "@angular/core";
import { environemnt } from "../../environment";
import { ClientService } from "./client.service";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ChatService {
  private readonly API_URL = environemnt.API_URL;

  constructor(private clientService: ClientService) {}

  getPersonalizeGPTResponse(userInput: string): Observable<any> {
    const url = `${this.API_URL}/chat/query`;
    return this.clientService.post(url, { message: userInput });
  }

  loadSessionChat(): Observable<any> {
    const url = `${this.API_URL}/chat/load-session-chat`;
    return this.clientService.get(url);
  }

  loadNewChat(): Observable<any> {
    const url = `${this.API_URL}/chat/start-new-chat`;
    return this.clientService.get(url);
  }
}
