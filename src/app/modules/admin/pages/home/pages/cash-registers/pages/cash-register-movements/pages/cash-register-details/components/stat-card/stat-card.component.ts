import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-stat-card',
  templateUrl: './stat-card.component.html',
  styleUrls: ['./stat-card.component.css'],
})
export class StatCardComponent {
  @Input({ required: true }) stat!: string;
  @Input({ required: true }) value!: number;
  @Input() color: 'green' | 'red' | 'gray' = 'gray';
}
