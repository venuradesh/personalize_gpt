import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { PgptTranslatePipe } from "../../Pipes/pgpt-translate.pipe";
import { ButtonComponent } from "../button/button.component";
import { SelectComponent } from "../select/select.component";

@Component({
  selector: "pgpt-general-settings",
  standalone: true,
  imports: [CommonModule, PgptTranslatePipe, ButtonComponent, SelectComponent],
  templateUrl: "./general-settings.component.html",
  styleUrl: "./general-settings.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GeneralSettingsComponent {}
