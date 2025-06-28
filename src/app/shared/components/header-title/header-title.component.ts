import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header-title',
  templateUrl: './header-title.component.html',
})
export class HeaderTitleComponent {
  @Input({ required: true }) hTitle?: string;
  @Input({ required: true }) hDescription!: string;
  @Input() hDescriptionSecondLine!: string;
  @Input() return!: boolean;
}
