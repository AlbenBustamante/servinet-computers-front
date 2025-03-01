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

  getNestedValue(obj: any, property: string, defaultValue: string = '--') {
    return (
      property.split('.').reduce((acc, key) => acc?.[key], obj) ?? defaultValue
    );
  }
}
