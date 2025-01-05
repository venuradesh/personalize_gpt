import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { ButtonComponent } from "../../core/components/button/button.component";
import { FormInputComponent } from "../../core/components/form-input/form-input.component";
import { ChatWelcomeComponent } from "../../core/components/chat-welcome/chat-welcome.component";
import { PgptTranslatePipe } from "../../core/Pipes/pgpt-translate.pipe";
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { BehaviorSubject } from "rxjs";
import { ChatDataSource } from "../../core/models/chat-models";
import { ChatTileComponent } from "../../core/components/chat-tile/chat-tile.component";
import { DocPreviewComponent } from "../../core/components/doc-preview/doc-preview.component";
import { TastrService } from "../../services/tastr.service";

@Component({
  selector: "pgpt-document-analyzer",
  standalone: true,
  imports: [CommonModule, ButtonComponent, FormInputComponent, PgptTranslatePipe, FormsModule, ReactiveFormsModule, ChatTileComponent, DocPreviewComponent],
  templateUrl: "./document-analyzer.component.html",
  styleUrl: "./document-analyzer.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentAnalyzerComponent {
  message = new FormControl("");
  file = new FormControl<File | null>(null);

  public chatSource$ = new BehaviorSubject<ChatDataSource[]>([
    {
      role: "assistant",
      content: "Heloa asldkjas alsdjka saksdj asd alskdja sda sdlakjsd alsd a",
      created: new Date(),
    },
    {
      role: "user",
      content: "hello asd asdasdkjas  asldkjas daksdja sdlakjsdlaks dasdkjas dasd ",
      created: new Date(),
    },
    {
      role: "assistant",
      content: "Heloa asldkjas alsdjka saksdj asd alskdja sda sdlakjsd alsd a",
      created: new Date(),
    },
    {
      role: "user",
      content: "hello asd asdasdkjas  asldkjas daksdja sdlakjsdlaks dasdkjas dasd ",
      created: new Date(),
    },
    {
      role: "assistant",
      content: "Heloa asldkjas alsdjka saksdj asd alskdja sda sdlakjsd alsd a",
      created: new Date(),
    },
    {
      role: "user",
      content: "hello asd asdasdkjas  asldkjas daksdja sdlakjsdlaks dasdkjas dasd ",
      created: new Date(),
    },
    {
      role: "assistant",
      content: "Heloa asldkjas alsdjka saksdj asd alskdja sda sdlakjsd alsd a",
      created: new Date(),
    },
    {
      role: "user",
      content: "hello asd asdasdkjas  asldkjas daksdja sdlakjsdlaks dasdkjas dasd ",
      created: new Date(),
    },
    {
      role: "assistant",
      content: "Heloa asldkjas alsdjka saksdj asd alskdja sda sdlakjsd alsd a",
      created: new Date(),
    },
    {
      role: "user",
      content: "hello asd asdasdkjas  asldkjas daksdja sdlakjsdlaks dasdkjas dasd ",
      created: new Date(),
    },
  ]);
  public isFileUploaded$ = new BehaviorSubject<boolean>(false);

  constructor(private toast: TastrService) {}

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
}
