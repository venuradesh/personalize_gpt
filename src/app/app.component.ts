import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterOutlet } from "@angular/router";
import { ThemeService } from "./services/theme.service";
import { NavBarComponent } from "./core/layout/nav-bar/nav-bar.component";
import { ToastrComponent } from "./core/components/toastr/toastr.component";
import { LoadingScreenComponent } from "./screens/loading-screen/loading-screen.component";
import { LoadingService } from "./services/loading.service";
import { BehaviorSubject, Observable } from "rxjs";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavBarComponent, ToastrComponent, LoadingScreenComponent],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent {
  loading$: Observable<boolean> = this.loadingService.loading$;

  constructor(private loadingService: LoadingService) {}
}
