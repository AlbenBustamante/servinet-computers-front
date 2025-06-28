import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-detail-headline',
  templateUrl: './detail-headline.component.html',
})
export class DetailHeadlineComponent {
  @Input({ required: true }) headline!: string;
  @Input() align: 'left' | 'center' | 'right' = 'left';

  get mapAlign() {
    return `text-${this.align}`;
  }
}
