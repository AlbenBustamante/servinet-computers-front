import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
})
export class ButtonComponent {
  @Input({ required: true }) type!: 'submit' | 'button';
  @Input() color: 'primary' | 'neutral' = 'primary';
  @Input() disabled: boolean = false;
  @Input() loading: boolean = false;

  private mapColor = {
    primary: {
      'bg-violet-600': true,
      'text-violet-50': true,
      'hover:enabled:bg-violet-700': true,
      'focus:ring-violet-300': true,
      'disabled:bg-violet-500': true,
    },
    neutral: {
      'bg-neutral-600': true,
      'text-neutral-50': true,
      'hover:enabled:bg-neutral-700': true,
      'focus:ring-neutral-300': true,
      'disabled:bg-neutral-500': true,
    },
  };

  get getColor() {
    return this.mapColor[this.color];
  }
}
