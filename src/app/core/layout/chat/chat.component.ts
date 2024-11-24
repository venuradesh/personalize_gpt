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
import { NavigationService } from "../../../services/navigation.service";

@Component({
  selector: "pgpt-chat",
  standalone: true,
  imports: [CommonModule, FormInputComponent, PgptTranslatePipe, FormsModule, ChatWelcomeComponent, ChatTileComponent],
  templateUrl: "./chat.component.html",
  styleUrl: "./chat.component.scss",
})
export class ChatComponent {
  prompt = new FormControl("", [FormValidator.requiredValidator("Please Enter your Prompts")]);

  public chatSource$ = new BehaviorSubject<ChatDataSource[]>([]);
  chatState: FormGroup;

  constructor(private navigationService: NavigationService) {
    this.chatState = new FormGroup({
      prompt: this.prompt,
    });

    console.log(navigationService.getState());
  }

  public onSubmitClck(): void {
    console.log("submitted");
  }
}
