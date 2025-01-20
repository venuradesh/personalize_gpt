import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { PgptTranslatePipe } from "../../Pipes/pgpt-translate.pipe";
import { ButtonComponent } from "../button/button.component";
import { BehaviorSubject } from "rxjs";

export interface SelectOption {
  label: string;
  value: string;
}

@Component({
  selector: "pgpt-select",
  standalone: true,
  imports: [CommonModule, PgptTranslatePipe, ButtonComponent],
  templateUrl: "./select.component.html",
  styleUrl: "./select.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectComponent {
  @Input()
  options: SelectOption[] = [];

  @Input()
  selectedOption: SelectOption | undefined;

  @Output()
  changedValue = new EventEmitter<SelectOption>();

  public isOpen = new BehaviorSubject<boolean>(false);

  public selectOption(option: SelectOption): void {
    this.isOpen.next(false);
    this.selectedOption = option;
    this.changedValue.emit(option);
  }

  public toggleOptionsVisibility(): void {
    this.isOpen.next(!this.isOpen.value);
  }
}
