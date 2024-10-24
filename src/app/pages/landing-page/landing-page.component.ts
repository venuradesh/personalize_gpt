import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ButtonComponent } from "../../core/components/button/button.component";
import { NavBarComponent } from "../../core/layout/nav-bar/nav-bar.component";
import { FooterComponent } from "../../core/layout/footer/footer.component";

@Component({
  selector: "pgpt-landing-page",
  standalone: true,
  imports: [NavBarComponent, ButtonComponent, FooterComponent],
  templateUrl: "./landing-page.component.html",
  styleUrl: "./landing-page.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingPageComponent {}
