import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header-stat-card',
  templateUrl: './header-stat-card.component.html',
})
export class HeaderStatCardComponent {
  @Input({ required: true }) stat!: string;
  @Input({ required: true }) value!: number | undefined;
  @Input({ required: true }) color!: string;
  @Input() format: boolean = true;

  get textColor() {
    return `text-${this.color}-700`;
  }
}
