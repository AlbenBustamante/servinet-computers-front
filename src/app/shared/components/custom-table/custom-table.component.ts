import {
  Component,
  computed,
  Input,
  PipeTransform,
  Signal,
} from '@angular/core';
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';

export interface ITable {
  header: {
    key: string;
    title: string;
    align?: 'center' | 'right';
    pipe?: PipeTransform;
    pipeArgs?: string;
    prefixSign?: boolean;
  }[];
  body: Signal<any[] | undefined>;
  onClick?: (index: number) => void;
  onEdit?: (index: number) => void;
  onRemove?: (index: number) => void;
  noDataMessage: string;
}

@Component({
  selector: 'app-custom-table',
  templateUrl: './custom-table.component.html',
})
export class CustomTableComponent {
  @Input({ required: true }) table!: ITable;
  readonly faEdit = faPencil;
  readonly faRemove = faTrash;

  mapAlign(align: 'center' | 'right') {
    return `text-${align}`;
  }

  data = computed(() => this.table.body() ?? []);

  getNestedValue(
    obj: any,
    property: string,
    options: { defaultValue: string; prefixSign?: boolean }
  ) {
    if (property === 'senderOrReceiver') {
      return obj.received ? obj.sender : obj.receiver;
    }

    const value =
      property.split('.').reduce((acc, key) => acc?.[key], obj) ??
      options.defaultValue;

    if (options.prefixSign) {
      const sign = obj.received ? '+' : '-';
      return `${sign}${value}`;
    }

    return value;
  }

  onEdit(event: Event, index: number) {
    event.stopPropagation();
    this.table.onEdit?.(index);
  }

  onRemove(event: Event, index: number) {
    event.stopPropagation();
    this.table.onRemove?.(index);
  }
}
