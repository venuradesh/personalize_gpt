import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { PgptTranslatePipe } from "../../Pipes/pgpt-translate.pipe";

@Component({
  selector: "pgpt-chat-welcome",
  standalone: true,
  imports: [CommonModule, PgptTranslatePipe],
  templateUrl: "./chat-welcome.component.html",
  styleUrl: "./chat-welcome.component.scss",
})
export class ChatWelcomeComponent {}
