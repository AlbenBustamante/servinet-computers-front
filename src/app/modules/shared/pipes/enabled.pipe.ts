import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'enabled',
})
export class EnabledPipe implements PipeTransform {
  transform(enabled: boolean): string {
    return enabled ? 'Habilitado' : 'Deshabilitado';
  }
}
