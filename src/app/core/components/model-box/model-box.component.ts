import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { LlmModelData } from "../../models/llm-models";
import { CommonModule } from "@angular/common";
import { ButtonComponent } from "../button/button.component";
import { PgptTranslatePipe } from "../../Pipes/pgpt-translate.pipe";

@Component({
  selector: "pgpt-model-box",
  standalone: true,
  imports: [CommonModule, ButtonComponent, PgptTranslatePipe],
  templateUrl: "./model-box.component.html",
  styleUrl: "./model-box.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModelBoxComponent {
  @Input({ required: true })
  modelData: LlmModelData | undefined;
}
