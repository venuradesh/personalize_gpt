import { CanActivateFn } from "@angular/router";
import { ModelActivationStaus } from "../core/models/llm-models";
import { NavigationService } from "../services/navigation.service";
import { inject } from "@angular/core";

export const registerGuard: CanActivateFn = (route, state) => {
  const navigationService: NavigationService = inject(NavigationService);
  const model: string = route.params["model"];

  if (model === ModelActivationStaus.OPENAI || model === ModelActivationStaus.LLAMA) {
    return true;
  } else {
    navigationService.navigate({ to: "/model-selection" });
    return false;
  }
};
