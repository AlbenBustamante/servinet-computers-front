import {
  Component,
  computed,
  EventEmitter,
  Input,
  Output,
  Signal,
  signal,
} from '@angular/core';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { IPagination } from '@models/response.model';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
})
export class PaginationComponent {
  @Output() onSelectPage = new EventEmitter<number>();
  @Input({ required: true }) pagination!: Signal<IPagination | undefined>;
  @Input({ required: true }) loading!: boolean;
  readonly faLeft = faChevronLeft;
  readonly faRight = faChevronRight;

  readonly pages = computed(() => {
    const array: number[] = [];
    const pages = this.pagination()?.totalPages;

    for (let i = 0; i < (pages ?? 0); i++) {
      array.push(i);
    }

    return array;
  });

  emitDirectionOnSelectPage(direction: 'left' | 'right') {
    const { currentPage, totalPages } = this.pagination()!;

    if (direction === 'left' && currentPage < 1) {
      return;
    }

    if (direction === 'right' && currentPage === totalPages - 1) {
      return;
    }

    const newCurrentPage =
      direction === 'left' ? currentPage - 1 : currentPage + 1;

    this.onSelectPage.emit(newCurrentPage);
  }

  emitOnSelectPage(event: Event) {
    if (this.loading) {
      return;
    }

    const { value } = event.target as HTMLSelectElement;

    this.onSelectPage.emit(Number(value));
  }
}
