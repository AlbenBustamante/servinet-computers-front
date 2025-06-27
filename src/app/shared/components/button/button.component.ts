import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
})
export class ButtonComponent {
  @Input({ required: true }) type!: 'submit' | 'button';
  @Input() color: 'primary' | 'neutral' | 'danger' = 'primary';
  @Input() disabled: boolean = false;
  @Input() loading: boolean = false;

  private mapColor = {
    primary: {
      'bg-violet-600': true,
      'text-violet-50': true,
      'hover:enabled:bg-violet-700': true,
      'focus:ring-violet-300': true,
      'disabled:bg-violet-400': true,
    },
    neutral: {
      'bg-neutral-600': true,
      'text-neutral-50': true,
      'hover:enabled:bg-neutral-700': true,
      'focus:ring-neutral-300': true,
      'disabled:bg-neutral-400': true,
    },
    danger: {
      'bg-red-600': true,
      'text-red-50': true,
      'hover:enabled:bg-red-700': true,
      'focus:ring-red-300': true,
      'disabled:bg-red-400': true,
    },
  };

  get getColor() {
    return this.mapColor[this.color];
  }
}
