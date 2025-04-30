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

  readonly pages = computed(() => {
    const array: number[] = [];
    const pages = this.pagination()?.totalPages;

    for (let i = 0; i < (pages ?? 0); i++) {
      array.push(i);
    }

    return array;
  });

  readonly selectedPage = signal<number>(0);
  readonly faLeft = faChevronLeft;
  readonly faRight = faChevronRight;

  emitOnSelectPage(event: Event) {
    if (this.loading) {
      return;
    }

    const { value } = event.target as HTMLSelectElement;

    this.selectedPage.set(Number(value));
    this.onSelectPage.emit(Number(value));
  }
}
