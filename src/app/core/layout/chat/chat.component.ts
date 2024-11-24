import { CommonModule } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormInputComponent } from "../../components/form-input/form-input.component";
import { PgptTranslatePipe } from "../../Pipes/pgpt-translate.pipe";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FormValidator } from "../../helpers/validators/form-validators";
import { ChatWelcomeComponent } from "../../components/chat-welcome/chat-welcome.component";
import { ChatDataSource } from "../../models/chat-models";
import { BehaviorSubject, Subject, take, takeUntil } from "rxjs";
import { ChatTileComponent } from "../../components/chat-tile/chat-tile.component";
import { NavigationService } from "../../../services/navigation.service";
import { UserModel } from "../../models/user_models";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "pgpt-chat",
  standalone: true,
  imports: [CommonModule, FormInputComponent, PgptTranslatePipe, FormsModule, ChatWelcomeComponent, ChatTileComponent],
  templateUrl: "./chat.component.html",
  styleUrl: "./chat.component.scss",
})
export class ChatComponent implements OnInit, OnDestroy {
  prompt = new FormControl("", [FormValidator.requiredValidator("Please Enter your Prompts")]);
  user: UserModel | undefined = undefined;

  public chatSource$ = new BehaviorSubject<ChatDataSource[]>([]);
  chatState: FormGroup;

  private destroy$ = new Subject<void>();

  constructor(private navigationService: NavigationService, private route: ActivatedRoute) {
    this.chatState = new FormGroup({
      prompt: this.prompt,
    });
  }

  public ngOnInit(): void {
    this.route.data.pipe(take(1)).subscribe({
      next: (val: { [user: string]: UserModel }) => (this.user = val["user"]),
    });
  }

  public onSubmitClck(): void {
    console.log(this.user);
    console.log("submitted");
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
