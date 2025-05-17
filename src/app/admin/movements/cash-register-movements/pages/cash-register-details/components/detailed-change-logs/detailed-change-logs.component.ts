import {
  Component,
  computed,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { IChangeLogRes } from '@models/change-log.model';

@Component({
  selector: 'app-detailed-change-logs',
  templateUrl: './detailed-change-logs.component.html',
  styleUrls: ['./detailed-change-logs.component.css'],
})
export class DetailedChangeLogsComponent {
  @Output() onReturn = new EventEmitter<void>();
  @Input({ required: true }) changeLog!: IChangeLogRes | undefined;

  readonly faLeftArrow = faChevronLeft;
  readonly type = computed(() => this.changeLog?.type);

  readonly previous = computed(() => {
    return JSON.parse(this.changeLog?.previousData ?? '');
  });

  readonly current = computed(() => {
    return JSON.parse(this.changeLog?.newData ?? '');
  });

  equals(property: string) {
    return this.previous()[property] !== this.current()[property];
  }
}
