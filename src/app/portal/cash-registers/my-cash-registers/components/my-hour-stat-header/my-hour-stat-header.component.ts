import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-my-hour-stat-header',
  templateUrl: './my-hour-stat-header.component.html',
  styleUrls: ['./my-hour-stat-header.component.css'],
})
export class MyHourStatHeaderComponent {
  @Input() headline!: string | undefined;
  @Input({ required: true }) time!: Date | undefined;
}
