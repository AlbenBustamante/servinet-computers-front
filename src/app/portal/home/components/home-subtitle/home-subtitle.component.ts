import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-home-subtitle',
  templateUrl: './home-subtitle.component.html',
})
export class HomeSubtitleComponent {
  @Input({ required: true }) headline!: string;
}
