import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormInputComponent } from "../../components/form-input/form-input.component";
import { PgptTranslatePipe } from "../../Pipes/pgpt-translate.pipe";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FormValidator } from "../../helpers/validators/form-validators";
import { ChatWelcomeComponent } from "../../components/chat-welcome/chat-welcome.component";
import { ChatDataSource } from "../../models/chat-models";
import { BehaviorSubject } from "rxjs";
import { ChatTileComponent } from "../../components/chat-tile/chat-tile.component";

@Component({
  selector: "pgpt-chat",
  standalone: true,
  imports: [CommonModule, FormInputComponent, PgptTranslatePipe, FormsModule, ChatWelcomeComponent, ChatTileComponent],
  templateUrl: "./chat.component.html",
  styleUrl: "./chat.component.scss",
})
export class ChatComponent {
  prompt = new FormControl("", [FormValidator.requiredValidator("Please Enter your Prompts")]);

  public chatSource$ = new BehaviorSubject<ChatDataSource[]>([
    { content: "What is the captial of Sri lanka?", role: "user", created: new Date() },
    {
      content:
        "Sri Jayawardenapura Kotte is the main captial of Sri Lanka, serving as the legislative captial since 1985. It is located in the colombo district, about 8 kilometers southeast of the commercial capital, Colombo",
      role: "assistant",
      created: new Date(),
    },
  ]);
  chatState: FormGroup;

  constructor() {
    this.chatState = new FormGroup({
      prompt: this.prompt,
    });
  }

  public onSubmitClck(): void {
    console.log("submitted");
  }
}
