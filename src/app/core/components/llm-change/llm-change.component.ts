import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { ModelBoxComponent } from "../model-box/model-box.component";
import data from "../../../../../assets/data/model-data.json";
import { ModelActivationStaus, ModelData } from "../../models/llm-models";
import { FormInputComponent } from "../form-input/form-input.component";
import { FormControl, FormsModule } from "@angular/forms";
import { FormValidator } from "../../helpers/validators/form-validators";
import { PgptTranslatePipe } from "../../Pipes/pgpt-translate.pipe";
import { ActivatedRoute } from "@angular/router";
import { asyncScheduler, BehaviorSubject, take } from "rxjs";
import { APIKeys } from "../../models/user_models";
import { ButtonComponent } from "../button/button.component";
import { TastrService } from "../../../services/tastr.service";
import { UserService } from "../../../services/user.service";
import { ApiSource, ErrorSource } from "../../models/api_models";
import { InternalLoaderComponent } from "../internal-loader/internal-loader.component";
import { TOAST_DELAY } from "../../models/toastr-model";

@Component({
  selector: "pgpt-llm-change",
  standalone: true,
  imports: [CommonModule, ModelBoxComponent, FormInputComponent, FormsModule, PgptTranslatePipe, ButtonComponent, InternalLoaderComponent],
  templateUrl: "./llm-change.component.html",
  styleUrl: "./llm-change.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LlmChangeComponent implements OnInit {
  jsonData: ModelData[] = [];

  llm_key = new FormControl("", [FormValidator.requiredValidator()]);
  choosen_llm: ModelActivationStaus = ModelActivationStaus.OPENAI;

  public initialState: { choosen_llm: string; api_keys: APIKeys } = {
    choosen_llm: "",
    api_keys: {
      llama_api_key: "",
      openai_api_key: "",
    },
  };
  public loading$ = new BehaviorSubject<boolean>(false);

  constructor(private route: ActivatedRoute, private toast: TastrService, private userService: UserService) {
    this.route.data.pipe(take(1)).subscribe({
      next: (val: { [user: string]: any }) => {
        this.choosen_llm = val["user"].choosen_llm;
        this.initialState.api_keys = val["user"].api_keys;
        this.initialState.choosen_llm = val["user"].choosen_llm;
      },
    });
  }

  public ngOnInit(): void {
    this.jsonData = data;
  }

  public onModelClick(modal_name: string | undefined): void {
    this.choosen_llm = this.getModelActivationStatus(modal_name!) ?? ModelActivationStaus.OPENAI;
  }

  public onChangeClick(): void {
    if (this.isNoChangesToSave()) {
      this.handleNoChangeValidator();
      return;
    }

    if (this.isKeyMissing()) {
      this.handleMissingKey();
      return;
    }

    this.loading$.next(true);
    this.userService
      .updateLLMModal(this.choosen_llm, this.llm_key.value!)
      .pipe(take(1))
      .subscribe({
        next: (val: ApiSource) => {
          this.toast.success(val.message);
          asyncScheduler.schedule(() => {
            window.location.reload();
          }, TOAST_DELAY);
        },
        error: (err: ErrorSource) => {
          this.toast.error(err.error.message);
          console.error(err);
        },
        complete: () => {
          this.loading$.next(false);
        },
      });
  }

  private getModelActivationStatus(status: string): ModelActivationStaus | undefined {
    return (Object.values(ModelActivationStaus) as string[]).includes(status) ? (status as ModelActivationStaus) : undefined;
  }

  private isNoChangesToSave(): boolean {
    return this.choosen_llm === this.initialState.choosen_llm && !this.llm_key.value;
  }

  private isKeyMissing(): boolean {
    return (
      (this.choosen_llm === ModelActivationStaus.OPENAI && !this.initialState.api_keys.openai_api_key && !this.llm_key.value) ||
      (this.choosen_llm === ModelActivationStaus.LLAMA && !this.initialState.api_keys.llama_api_key && !this.llm_key.value)
    );
  }

  private getMissingTokenErrorMessage(): string {
    return this.choosen_llm === ModelActivationStaus.OPENAI ? "Please Enter a valid OpenAI API Key to continue" : "Please Enter a valid Groqcloud API Key to continue";
  }

  private handleMissingKey(): void {
    this.toast.info(this.getMissingTokenErrorMessage());
    this.triggerFormControlValidators();
  }

  private handleNoChangeValidator(): void {
    this.triggerFormControlValidators();
    this.toast.info("Everything looks good! No changes to save.");
  }

  private triggerFormControlValidators(): void {
    this.llm_key.markAsUntouched();
    this.llm_key.updateValueAndValidity();
  }
}
