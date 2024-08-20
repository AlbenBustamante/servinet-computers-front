import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header-title',
  templateUrl: './header-title.component.html',
  styleUrls: ['./header-title.component.css'],
})
export class HeaderTitleComponent {
  @Input({ required: true }) hTitle!: string;
  @Input({ required: true }) hDescription!: string;
  @Input() hDescriptionSecondLine!: string;
}
