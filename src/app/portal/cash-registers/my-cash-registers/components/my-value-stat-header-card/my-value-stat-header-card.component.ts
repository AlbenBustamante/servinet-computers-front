import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-my-value-stat-header-card',
  templateUrl: './my-value-stat-header-card.component.html',
  styleUrls: ['./my-value-stat-header-card.component.css'],
})
export class MyValueStatHeaderCardComponent {
  @Input({ required: true }) headline!: string;
  @Input({ required: true }) value!: number | undefined;
  @Input() color: string = 'gray';

  get mapColor() {
    return `text-${this.color}-700`;
  }
}
