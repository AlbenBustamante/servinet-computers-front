import { Component, EventEmitter, Input, Output, Signal } from '@angular/core';
import { IPagination } from '@models/response.model';

@Component({
  selector: 'app-home-table-section',
  templateUrl: './home-table-section.component.html',
  styleUrls: ['./home-table-section.component.css'],
})
export class HomeTableSectionComponent {
  @Output() onSelectPage = new EventEmitter<number>();
  @Input({ required: true }) loading!: Signal<boolean>;
  @Input({ required: true }) length!: number;
  @Input({ required: true }) paginationLoading!: Signal<boolean>;
  @Input({ required: true }) pagination!: Signal<IPagination | undefined>;
  @Input({ required: true }) headline!: string;

  emitOnSelectPage(page: number) {
    this.onSelectPage.emit(page);
  }
}
