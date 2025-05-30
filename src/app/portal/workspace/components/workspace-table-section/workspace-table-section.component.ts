import { Component, EventEmitter, Input, Output, Signal } from '@angular/core';
import { IPagination } from '@models/response.model';

@Component({
  selector: 'app-workspace-table-section',
  templateUrl: './workspace-table-section.component.html',
})
export class WorkspaceTableSectionComponent {
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
