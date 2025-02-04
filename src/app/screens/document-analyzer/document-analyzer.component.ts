import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ButtonComponent } from "../../core/components/button/button.component";
import { FormInputComponent } from "../../core/components/form-input/form-input.component";
import { PgptTranslatePipe } from "../../core/Pipes/pgpt-translate.pipe";
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { BehaviorSubject, take } from "rxjs";
import { ChatDataSource, UserRole } from "../../core/models/chat-models";
import { ChatTileComponent } from "../../core/components/chat-tile/chat-tile.component";
import { DocPreviewComponent } from "../../core/components/doc-preview/doc-preview.component";
import { TastrService } from "../../services/tastr.service";
import { DocAnalyzerService } from "../../services/doc-analyzer.service";
import { FormValidator } from "../../core/helpers/validators/form-validators";
import { DocAnalyserApiService } from "../../services/doc-analyser-api.service";
import { ApiSource, ErrorSource } from "../../core/models/api_models";
import { InternalLoaderComponent } from "../../core/components/internal-loader/internal-loader.component";

@Component({
  selector: "pgpt-document-analyzer",
  standalone: true,
  imports: [CommonModule, ButtonComponent, FormInputComponent, PgptTranslatePipe, FormsModule, ReactiveFormsModule, ChatTileComponent, DocPreviewComponent, InternalLoaderComponent],
  templateUrl: "./document-analyzer.component.html",
  styleUrl: "./document-analyzer.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentAnalyzerComponent {
  prompt = new FormControl("", [FormValidator.requiredValidator("Please Enter your Prompts")]);
  file = new FormControl<File | null>(null);

  public chatSource$ = new BehaviorSubject<ChatDataSource[]>([]);
  public isFileUploaded$ = new BehaviorSubject<boolean>(false);
  public analyzerState$ = this.analyzer.analyzerState$;
  public loading$ = new BehaviorSubject<boolean>(false);

  constructor(private toast: TastrService, private analyzer: DocAnalyzerService, private analyzerAPI: DocAnalyserApiService) {}

  public onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.loading$.next(true);
      const file = input.files[0];
      if (file.type === "application/pdf") {
        this.file.setValue(file);

        const formData = new FormData();
        formData.append("file", file, file.name);

        this.uploadDocument(formData);
      } else this.toast.error("We're accepting only PDFs.", "File Format Error");
    }
  }

  public onOpen(): void {
    const currentState = this.analyzer.getAnalyzerState();
    if (currentState === "open") this.onMinimize();
    else {
      this.analyzer.setAnalyzerState("open");
    }
  }

  public onClose(): void {
    this.analyzer.setAnalyzerState("closed");
  }

  public onMinimize(): void {
    this.analyzer.setAnalyzerState("minimized");
  }

  public onSubmitClick(): void {
    this.prompt.markAsTouched();
    this.prompt.markAsDirty();
    this.prompt.updateValueAndValidity();

    if (this.prompt.valid && this.prompt.value) {
      this.getAnalyzerResponse(this.prompt.value);
    }
  }

  private uploadDocument(formData: FormData): void {
    this.analyzerAPI
      .uploadDocument(formData)
      .pipe(take(1))
      .subscribe({
        next: (val: ApiSource) => {
          this.isFileUploaded$.next(true);
          this.toast.success(val.message);
        },
        error: (err: ErrorSource) => {
          this.toast.error(err.error.message);
          console.error(err);
        },
        complete: () => this.loading$.next(false),
      });
  }

  private getAnalyzerResponse(userQuery: string): void {
    this.setUserMessage(userQuery);
    this.loading$.next(true);
    this.prompt.reset();

    this.analyzerAPI
      .sendUserQuery(userQuery)
      .pipe(take(1))
      .subscribe({
        next: (val: ApiSource) => {
          this.setAnalayzerMessage(val.data);
          console.log(val);
        },
        error: (err: ErrorSource) => {
          console.log(err);
        },
        complete: () => this.loading$.next(false),
      });
  }

  private setAnalayzerMessage(response: string): void {
    this._addMessageToArray(response, "assistant");
  }

  private setUserMessage(userQuery: string): void {
    this._addMessageToArray(userQuery, "user");
  }

  private _addMessageToArray(message: string, role: UserRole) {
    this.chatSource$.next([...this.chatSource$.value, { role: role, content: message }]);
  }
}
