import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faAdd } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-list-headline-header',
  templateUrl: './list-headline-header.component.html',
})
export class ListHeadlineHeaderComponent {
  @Output() onClick = new EventEmitter<void>();
  @Input({ required: true }) headline!: string;
  @Input({ required: true }) action!: string;

  readonly faAdd = faAdd;
}
