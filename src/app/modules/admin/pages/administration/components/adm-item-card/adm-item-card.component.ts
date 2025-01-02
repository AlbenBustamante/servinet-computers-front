import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';

export interface AdmItemCardOption {
  title: string;
  fn: () => void;
}

@Component({
  selector: 'app-adm-item-card',
  templateUrl: './adm-item-card.component.html',
  styleUrls: ['./adm-item-card.component.css'],
})
export class AdmItemCardComponent {
  @Input({ required: true }) options!: AdmItemCardOption[];
  @Input({ required: true }) finalBalance!: number;
  @Output() setSelectedItem = new EventEmitter<void>();
  readonly showDropdown = signal<boolean>(false);
  readonly faOptions = faEllipsis;

  toggleShowDropdown() {
    this.showDropdown.update((prevValue) => !prevValue);

    if (this.showDropdown()) {
      this.setSelectedItem.emit();
    }
  }
}
