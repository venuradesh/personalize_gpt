import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ButtonComponent } from "../../core/components/button/button.component";
import { FooterComponent } from "../../core/layout/footer/footer.component";
import { NavigationService } from "../../services/navigation.service";
import { PgptTranslatePipe } from "../../core/Pipes/pgpt-translate.pipe";

@Component({
  selector: "pgpt-landing-page",
  standalone: true,
  imports: [ButtonComponent, FooterComponent, PgptTranslatePipe],
  templateUrl: "./landing-page.component.html",
  styleUrl: "./landing-page.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingPageComponent {
  constructor(private navigationService: NavigationService) {}

  //#region Navigate to Regsiter
  onRegisterClick(): void {
    this.navigationService.navigate({ to: "/model-selection" });
  }
  //#endregion
}
