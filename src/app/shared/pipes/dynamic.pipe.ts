import { CurrencyPipe, DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dynamic',
})
export class DynamicPipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    if (value === '--') {
      return value;
    }

    const [pipe, pipeArgs] = args;

    if (!pipe) {
      return value;
    }

    if (pipe instanceof CurrencyPipe) {
      return pipe.transform(value, 'symbol', '$', '0.00');
    }

    if (pipe instanceof DatePipe) {
      switch (pipeArgs) {
        case 'shortDate':
          return pipe.transform(value, 'dd-MM-yyyy');
        case 'shortTime':
          return pipe.transform(value, 'hh:mm a');
        case 'shortDateTime':
          return pipe.transform(value, 'dd-MM-yyyy hh:mm a');
        default:
          return pipe.transform(value, 'EEE dd-MM-yyyy, hh:mm:ss a');
      }
    }

    return pipe.transform(value, ...pipeArgs);
  }
}
