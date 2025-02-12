import { CommonModule } from "@angular/common";
import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { FormInputComponent } from "../../components/form-input/form-input.component";
import { PgptTranslatePipe } from "../../Pipes/pgpt-translate.pipe";
import { FormControl, FormGroup, FormsModule } from "@angular/forms";
import { FormValidator } from "../../helpers/validators/form-validators";
import { ChatWelcomeComponent } from "../../components/chat-welcome/chat-welcome.component";
import { ChatDataSource, UserRole } from "../../models/chat-models";
import { BehaviorSubject, Subject, take, takeUntil } from "rxjs";
import { ChatTileComponent } from "../../components/chat-tile/chat-tile.component";
import { NavigationService } from "../../../services/navigation.service";
import { UserModel } from "../../models/user_models";
import { ChatService } from "../../../services/chat.service";
import { ApiSource, ErrorSource } from "../../models/api_models";
import { LoadingService } from "../../../services/loading.service";
import { InternalLoaderComponent } from "../../components/internal-loader/internal-loader.component";
import { TastrService } from "../../../services/tastr.service";
import { NewChatService } from "../../../services/new-chat.service";
import { Common } from "../../helpers/common";
import { loadChatItem, LoadChatService } from "../../../services/load-chat.service";

@Component({
  selector: "pgpt-chat",
  standalone: true,
  imports: [CommonModule, FormInputComponent, PgptTranslatePipe, FormsModule, ChatWelcomeComponent, ChatTileComponent, InternalLoaderComponent],
  templateUrl: "./chat.component.html",
  styleUrl: "./chat.component.scss",
})
export class ChatComponent implements OnInit, OnDestroy {
  @ViewChild("chatContainer") private chatContainer!: ElementRef;

  @Input()
  user: UserModel | undefined = undefined;

  prompt = new FormControl("", [FormValidator.requiredValidator("Please Enter your Prompt")]);

  public chatSource$ = new BehaviorSubject<ChatDataSource[]>([]);
  public loading$ = new BehaviorSubject<boolean>(false);

  private destroy$ = new Subject<void>();

  constructor(private chatService: ChatService, private toast: TastrService, private newChat: NewChatService, private loadChat: LoadChatService) {}

  public ngOnInit(): void {
    this._loadSessionChat();
    this._newChatListener();
    this._loadChatListener();
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

  private _newChatListener(): void {
    this.newChat.startNewChat$.pipe(takeUntil(this.destroy$)).subscribe({
      next: (value: boolean) => {
        if (value) this._startNewChat();
      },
    });
  }

  private _loadChatListener(): void {
    this.loading$.next(true);

    this.loadChat.loadChat$.pipe(takeUntil(this.destroy$)).subscribe({
      next: (chats: loadChatItem[]) => {
        if (chats.length > 0) {
          this.chatSource$.next([]);
          chats.map((chat) => this._addMessageToArray(chat.content, chat.role as UserRole, chat.timestamp));
        }
      },
      complete: () => this.loading$.next(false),
    });
  }

  private _startNewChat(): void {
    this.loading$.next(true);
    this.chatService
      .loadNewChat()
      .pipe(take(1))
      .subscribe({
        next: (value: ApiSource) => this.chatSource$.next(value.data),
        error: (err: ErrorSource) => this.toast.error(err.error.message),
        complete: () => this.loading$.next(false),
      });
  }

  private _loadSessionChat(): void {
    this.loading$.next(true);
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
          console.error(err);
          this.toast.error(err.error.message);
        },
        complete: () => this.loading$.next(false),
      });
  }

  private _setMessage(userInput: string): void {
    this.loading$.next(true);
    this.chatService
      .getPersonalizeGPTResponse(userInput)
      .pipe(take(1))
      .subscribe({
        next: (value: ApiSource) => {
          const data = value.data;
          this._addMessageToArray(data.response, "assistant", data.created);
        },
        error: (err: ErrorSource) => {
          console.error(err);
          this.toast.error(err.error.message);
        },
        complete: () => this.loading$.next(false),
      });
  }

  private _addMessageToArray(message: string, role: UserRole, created: string) {
    this.chatSource$.next([...this.chatSource$.value, { role: role, content: message, created: new Date(created) }]);
    setTimeout(() => Common.scrollToBottom(this.chatContainer));
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
