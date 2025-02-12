import { Injectable } from "@angular/core";
import { environemnt } from "../../environment";
import { ClientService } from "./client.service";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class HistoryApiService {
  private readonly API_URL = environemnt.API_URL;

  constructor(private client: ClientService) {}

  getHistory(): Observable<any> {
    return this.client.get(`${this.API_URL}/chat/get-chat-history`);
  }

  loadChatByChatId(chatId: string): Observable<any> {
    return this.client.post(`${this.API_URL}/chat/load-chat-from-chat-id`, { chat_id: chatId });
  }
}
