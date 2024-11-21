import { HttpHeaders } from "@angular/common/http";

export interface ApiSource {
  message: string;
  data: any[] | null;
  error: boolean;
}

export interface ErrorSource {
  error: ApiSource;
  headers: HttpHeaders;
  message: string;
  name: string;
  ok: boolean;
  status: number;
  statusText: string;
  url: string;
}
