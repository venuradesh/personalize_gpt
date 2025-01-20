import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ButtonComponent } from "../../core/components/button/button.component";
import { FormInputComponent } from "../../core/components/form-input/form-input.component";
import { PgptTranslatePipe } from "../../core/Pipes/pgpt-translate.pipe";
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { BehaviorSubject } from "rxjs";
import { ChatDataSource } from "../../core/models/chat-models";
import { ChatTileComponent } from "../../core/components/chat-tile/chat-tile.component";
import { DocPreviewComponent } from "../../core/components/doc-preview/doc-preview.component";
import { TastrService } from "../../services/tastr.service";
import { DocAnalyzerService } from "../../services/doc-analyzer.service";
import { FormValidator } from "../../core/helpers/validators/form-validators";

@Component({
  selector: "pgpt-document-analyzer",
  standalone: true,
  imports: [CommonModule, ButtonComponent, FormInputComponent, PgptTranslatePipe, FormsModule, ReactiveFormsModule, ChatTileComponent, DocPreviewComponent],
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

  constructor(private toast: TastrService, private analyzer: DocAnalyzerService) {}

  public onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      if (file.type === "application/pdf") {
        this.file.setValue(file);
        this.isFileUploaded$.next(true);
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

    if (this.prompt.valid) {
      console.log(this.prompt.value);
    }
  }
}
