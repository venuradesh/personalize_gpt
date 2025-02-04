import { Injectable } from "@angular/core";
import { ClientService } from "./client.service";
import { Observable } from "rxjs";
import { environemnt } from "../../environment";

@Injectable({
  providedIn: "root",
})
export class DocAnalyserApiService {
  private readonly API_URL = environemnt.API_URL;

  constructor(private client: ClientService) {}

  uploadDocument(formData: FormData): Observable<any> {
    return this.client.post(`${this.API_URL}/analyzer/upload-file`, formData, {});
  }

  sendUserQuery(query: string): Observable<any> {
    return this.client.post(`${this.API_URL}/analyzer/user-query`, { query: query });
  }
}
