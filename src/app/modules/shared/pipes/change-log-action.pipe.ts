import { Pipe, PipeTransform } from '@angular/core';
import { ChangeLogAction } from '@models/enums';

@Pipe({
  name: 'changeLogAction',
})
export class ChangeLogActionPipe implements PipeTransform {
  transform(value: ChangeLogAction): string {
    switch (value) {
      case ChangeLogAction.DELETE:
        return 'Eliminación';
      case ChangeLogAction.UPDATE:
        return 'Modificación';
      default:
        return 'Berserk';
    }
  }
}
