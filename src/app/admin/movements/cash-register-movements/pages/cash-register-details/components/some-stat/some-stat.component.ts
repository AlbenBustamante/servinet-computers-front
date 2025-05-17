import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-some-stat',
  templateUrl: './some-stat.component.html',
  styleUrls: ['./some-stat.component.css'],
})
export class SomeStatComponent {
  @Input({ required: true }) stat!: string;
  @Input({ required: true }) value!: number | undefined;
  @Input() format: boolean = true;
}
