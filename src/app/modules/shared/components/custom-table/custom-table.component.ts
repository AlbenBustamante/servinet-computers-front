import {
  Component,
  computed,
  Input,
  PipeTransform,
  Signal,
} from '@angular/core';

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
  noDataMessage: string;
}

@Component({
  selector: 'app-custom-table',
  templateUrl: './custom-table.component.html',
  styleUrls: ['./custom-table.component.css'],
})
export class CustomTableComponent {
  @Input({ required: true }) table!: ITable;

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
}
