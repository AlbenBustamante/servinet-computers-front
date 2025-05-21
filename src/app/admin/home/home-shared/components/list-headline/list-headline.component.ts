import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-list-headline',
  templateUrl: './list-headline.component.html',
})
export class ListHeadlineComponent {
  @Input({ required: true }) headline!: string;
}
