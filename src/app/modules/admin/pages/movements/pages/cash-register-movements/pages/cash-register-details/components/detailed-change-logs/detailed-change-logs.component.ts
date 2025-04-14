import { Component, computed, Input } from '@angular/core';
import { IChangeLogRes } from '@models/change-log.model';

@Component({
  selector: 'app-detailed-change-logs',
  templateUrl: './detailed-change-logs.component.html',
  styleUrls: ['./detailed-change-logs.component.css'],
})
export class DetailedChangeLogsComponent {
  @Input({ required: true }) changeLog!: IChangeLogRes | undefined;

  readonly type = computed(() => this.changeLog?.type);

  readonly previous = computed(() => {
    return JSON.parse(this.changeLog?.previousData ?? '');
  });

  readonly current = computed(() =>
    this.changeLog?.newData !== null
      ? JSON.parse(this.changeLog?.newData ?? '')
      : null
  );
}
