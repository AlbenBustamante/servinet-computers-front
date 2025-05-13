import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'discount',
})
export class DiscountPipe implements PipeTransform {
  transform(discount: boolean): string {
    return discount ? 'Aplica' : '-';
  }
}
