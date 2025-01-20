import { CommonModule } from "@angular/common";
import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { FormInputComponent } from "../../components/form-input/form-input.component";
import { PgptTranslatePipe } from "../../Pipes/pgpt-translate.pipe";
import { FormControl, FormGroup, FormsModule } from "@angular/forms";
import { FormValidator } from "../../helpers/validators/form-validators";
import { ChatWelcomeComponent } from "../../components/chat-welcome/chat-welcome.component";
import { ChatDataSource, UserRole } from "../../models/chat-models";
import { BehaviorSubject, Subject, take } from "rxjs";
import { ChatTileComponent } from "../../components/chat-tile/chat-tile.component";
import { NavigationService } from "../../../services/navigation.service";
import { UserModel } from "../../models/user_models";
import { ChatService } from "../../../services/chat.service";
import { ApiSource, ErrorSource } from "../../models/api_models";

@Component({
  selector: "pgpt-chat",
  standalone: true,
  imports: [CommonModule, FormInputComponent, PgptTranslatePipe, FormsModule, ChatWelcomeComponent, ChatTileComponent],
  templateUrl: "./chat.component.html",
  styleUrl: "./chat.component.scss",
})
export class ChatComponent implements OnInit, OnDestroy {
  @Input()
  user: UserModel | undefined = undefined;

  prompt = new FormControl("", [FormValidator.requiredValidator("Please Enter your Prompt")]);

  public chatSource$ = new BehaviorSubject<ChatDataSource[]>([]);

  private destroy$ = new Subject<void>();

  constructor(private chatService: ChatService) {}

  public ngOnInit(): void {
    this._loadSessionChat();
  }

  public onSubmitClck(): void {
    this.prompt.markAsDirty();
    this.prompt.updateValueAndValidity();

    if (this.prompt.valid && this.prompt.value) {
      this._addMessageToArray(this.prompt.value, "user", new Date().toString());
      this._setMessage(this.prompt.value);
      this.prompt.reset();
    }
  }

  private _loadSessionChat(): void {
    this.chatService
      .loadSessionChat()
      .pipe(take(1))
      .subscribe({
        next: (value: ApiSource) => {
          const data: [] = value.data;
          data.map((chat) => {
            this._addMessageToArray(chat["content"], chat["role"] as UserRole, chat["timestamp"]);
          });
        },
        error: (err: ErrorSource) => {
          console.log(err);
        },
      });
  }

  private _setMessage(userInput: string): void {
    this.chatService
      .getPersonalizeGPTResponse(userInput)
      .pipe(take(1))
      .subscribe({
        next: (value: ApiSource) => {
          const data = value.data;
          this._addMessageToArray(data.response, "assistant", data.created);
        },
        error: (err: ErrorSource) => {
          console.log(err);
        },
      });
  }

  private _addMessageToArray(message: string, role: UserRole, created: string) {
    this.chatSource$.next([...this.chatSource$.value, { role: role, content: message, created: new Date(created) }]);
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
