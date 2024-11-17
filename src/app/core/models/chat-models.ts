import { Time } from "@angular/common";

export interface ChatDataSource {
  role: UserRole;
  content: string;
  responseTime?: Time;
  created?: Date;
}

export type UserRole = "user" | "assistant";
