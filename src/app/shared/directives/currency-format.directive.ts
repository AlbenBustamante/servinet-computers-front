import { formatCurrency } from '@angular/common';
import {
  Directive,
  ElementRef,
  HostListener,
  Inject,
  LOCALE_ID,
} from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appCurrencyFormat]',
})
export class CurrencyFormatDirective {
  private readonly inputElement;

  constructor(
    private readonly elementRef: ElementRef<HTMLInputElement>,
    private readonly control: NgControl,
    @Inject(LOCALE_ID) private readonly locale: string
  ) {
    this.inputElement = this.elementRef.nativeElement;
  }

  @HostListener('blur', ['$event.target.value'])
  onBlur(value: string) {
    const numberValue = this.parse(value);

    if (isNaN(numberValue)) {
      this.inputElement.value = '';
    } else {
      this.inputElement.value = this.toCurrency(numberValue);
    }
  }

  @HostListener('focus')
  onFocus() {
    const controlValue = this.control.control?.value;

    if (controlValue) {
      this.inputElement.value = controlValue.toString();
    }
  }

  @HostListener('input', ['$event.target.value'])
  onInput(value: string) {
    const numberValue = this.parse(value);

    this.control.control?.setValue(isNaN(numberValue) ? null : numberValue);
  }

  private parse(value: string) {
    const rawValue = value.replace(/[^0-9.-]+/g, '');
    return parseInt(rawValue);
  }

  private toCurrency(value: number) {
    return formatCurrency(value, this.locale, '$', '', '0.00');
  }
}
