import { Component } from "@angular/core";
import { ButtonComponent } from "../../core/components/button/button.component";
import { NavBarComponent } from "../../core/layout/nav-bar/nav-bar.component";

@Component({
  selector: "pgpt-landing-page",
  standalone: true,
  imports: [NavBarComponent],
  templateUrl: "./landing-page.component.html",
  styleUrl: "./landing-page.component.scss",
})
export class LandingPageComponent {}
