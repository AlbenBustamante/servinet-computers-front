import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-hour-stat',
  templateUrl: './hour-stat.component.html',
  styleUrls: ['./hour-stat.component.css'],
})
export class HourStatComponent {
  @Input({ required: true }) time!: Date | undefined;
  @Input({ required: true }) tooltip!: string;
}
