import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-rounded-section',
  templateUrl: './rounded-section.component.html',
  styleUrls: ['./rounded-section.component.css'],
})
export class RoundedSectionComponent {
  @Input({ required: true }) headline!: string;
}
