import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { PgptTranslatePipe } from "../../Pipes/pgpt-translate.pipe";
import { ButtonComponent } from "../button/button.component";
import { SelectComponent, SelectOption } from "../select/select.component";
import { ThemeService } from "../../../services/theme.service";

@Component({
  selector: "pgpt-general-settings",
  standalone: true,
  imports: [CommonModule, PgptTranslatePipe, ButtonComponent, SelectComponent],
  templateUrl: "./general-settings.component.html",
  styleUrl: "./general-settings.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GeneralSettingsComponent implements OnInit {
  public themeSelected: SelectOption;
  public availableThemeOptions: SelectOption[] = [
    { label: "Dark", value: "dark-theme" },
    { label: "Light", value: "light-theme" },
  ];

  constructor(private themeService: ThemeService) {
    this.themeSelected = this.themeService.isDarkTheme() ? { label: "Dark", value: "dark-theme" } : { label: "Light", value: "light-theme" };
  }

  public ngOnInit(): void {}

  public onThemeValueChange(themeValue: SelectOption) {
    const isDarkThemeSelected: boolean = themeValue.value === "dark-theme";

    if (isDarkThemeSelected) this.themeService.enableDarkTheme();
    else this.themeService.enableLIghtTheme();
  }
}
