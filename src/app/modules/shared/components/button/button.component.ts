import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
})
export class ButtonComponent {
  @Input({ required: true }) type!: 'submit' | 'button';
  @Input() color: 'primary' | 'neutral' = 'primary';

  private mapColor = {
    primary: {
      'bg-violet-600': true,
      'text-violet-100': true,
      'hover:bg-violet-700': true,
      'hover:text-violet-50': true,
      'focus:ring-violet-300': true,
    },
    neutral: {
      'bg-neutral-600': true,
      'text-neutral-100': true,
      'hover:bg-neutral-700': true,
      'hover:text-neutral-50': true,
      'focus:ring-neutral-300': true,
    },
  };

  get getColor() {
    return this.mapColor[this.color];
  }
}
