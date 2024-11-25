import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { PgptTranslatePipe } from "../../core/Pipes/pgpt-translate.pipe";
import { FooterComponent } from "../../core/layout/footer/footer.component";
import data from "../../../../assets/data/model-data.json";
import { LlmModelData } from "../../core/models/llm-models";
import { ModelBoxComponent } from "../../core/components/model-box/model-box.component";

@Component({
  selector: "pgpt-model-selection",
  standalone: true,
  imports: [CommonModule, PgptTranslatePipe, FooterComponent, ModelBoxComponent],
  templateUrl: "./model-selection.component.html",
  styleUrl: "./model-selection.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModelSelectionComponent implements OnInit {
  jsonData: LlmModelData[] = [];

  public ngOnInit(): void {
    this.jsonData = data;
  }
}
