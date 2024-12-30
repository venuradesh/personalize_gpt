import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { ModelBoxComponent } from "../model-box/model-box.component";
import data from "../../../../../assets/data/model-data.json";
import { ModelData } from "../../models/llm-models";
import { FormInputComponent } from "../form-input/form-input.component";
import { FormControl, FormsModule } from "@angular/forms";
import { FormValidator } from "../../helpers/validators/form-validators";
import { PgptTranslatePipe } from "../../Pipes/pgpt-translate.pipe";
import { ActivatedRoute } from "@angular/router";
import { take } from "rxjs";
import { APIKeys } from "../../models/user_models";
import { ButtonComponent } from "../button/button.component";

@Component({
  selector: "pgpt-llm-change",
  standalone: true,
  imports: [CommonModule, ModelBoxComponent, FormInputComponent, FormsModule, PgptTranslatePipe, ButtonComponent],
  templateUrl: "./llm-change.component.html",
  styleUrl: "./llm-change.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LlmChangeComponent implements OnInit {
  jsonData: ModelData[] = [];

  llm_key = new FormControl("", [FormValidator.requiredValidator()]);
  choosen_llm: string = "";

  public initialState: { choosen_llm: string; api_keys: APIKeys } = {
    choosen_llm: "",
    api_keys: {
      llama_api_key: "",
      openai_api_key: "",
    },
  };

  constructor(private route: ActivatedRoute) {
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

  onModelClick(modal_name: string | undefined): void {
    this.choosen_llm = modal_name ?? "OpenAI";
  }
}
