import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { ModelData } from "../../models/llm-models";
import { CommonModule } from "@angular/common";
import { ButtonComponent } from "../button/button.component";
import { PgptTranslatePipe } from "../../Pipes/pgpt-translate.pipe";
import { NavigationService } from "../../../services/navigation.service";

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
  modelData: ModelData | undefined;

  constructor(private navigationService: NavigationService) {}

  onButtonClick(): void {
    this.navigationService.navigate({ to: `/register/${this.modelData?.name}` });
  }
}
