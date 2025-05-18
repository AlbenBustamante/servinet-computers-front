import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { CashRegisterStatus } from '@models/enums';

interface AdmItemCardOption {
  title: string;
  fn: () => void;
}

export type AdmItemCardOptions = AdmItemCardOption[];

@Component({
  selector: 'app-adm-item-card',
  templateUrl: './adm-item-card.component.html',
  styleUrls: ['./adm-item-card.component.css'],
})
export class AdmItemCardComponent {
  @Input({ required: true }) showDropdown!: boolean;
  @Input({ required: true }) options!: AdmItemCardOptions;
  @Input({ required: true }) finalBalance!: number;
  @Input() status!: CashRegisterStatus | undefined;
  @Input() pending!: boolean;
  @Output() setSelectedItem = new EventEmitter<void>();
  readonly faOptions = faEllipsis;

  toggleShowDropdown() {
    this.setSelectedItem.emit();
  }
}
