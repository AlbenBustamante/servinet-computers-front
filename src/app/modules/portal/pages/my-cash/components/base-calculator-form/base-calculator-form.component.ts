import { Component, EventEmitter, inject, Output, signal } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IBase } from '@models/base.model';
import { BaseService } from '@services/base.service';

@Component({
  selector: 'app-base-calculator-form',
  templateUrl: './base-calculator-form.component.html',
  styleUrls: ['./base-calculator-form.component.css'],
})
export class BaseCalculatorFormComponent {
  private readonly baseService = inject(BaseService);
  readonly cashBase = signal(this.baseService.cashBase);
  readonly baseForm: FormGroup;
  readonly totalAmount = signal<string>('0');
  readonly total = signal<string>('0');
  @Output() calculateBase = new EventEmitter<IBase>();

  constructor(private readonly fb: FormBuilder) {
    this.baseForm = this.fb.group({
      hundredThousand: [''],
      fiftyThousand: [''],
      twentyThousand: [''],
      tenThousand: [''],
      fiveThousand: [''],
      twoThousand: [''],
      thousand: [''],
      fiveHundred: [''],
      twoHundred: [''],
      hundred: [''],
      fifty: [''],
    });
  }

  calculate() {
    let totalAmount = 0;
    let total = 0;

    for (let i = 0; i < this.cashBase().length; i++) {
      const amount = Number(this.baseForm.get(this.cashBase()[i].title)?.value);
      const result = amount * this.cashBase()[i].value;

      this.cashBase()[i].total = `${result}`;

      totalAmount += amount;
      total += result;
    }

    this.totalAmount.set(`${totalAmount}`);
    this.total.set(`${total}`);

    const base: IBase = {
      hundredThousand: Number(this.baseForm.value.hundredThousand),
      fiftyThousand: Number(this.baseForm.value.fiftyThousand),
      twentyThousand: Number(this.baseForm.value.twentyThousand),
      tenThousand: Number(this.baseForm.value.tenThousand),
      fiveThousand: Number(this.baseForm.value.fiveThousand),
      twoThousand: Number(this.baseForm.value.twoThousand),
      thousand: Number(this.baseForm.value.thousand),
      fiveHundred: Number(this.baseForm.value.fiveHundred),
      twoHundred: Number(this.baseForm.value.twoHundred),
      hundred: Number(this.baseForm.value.hundred),
      fifty: Number(this.baseForm.value.fifty),
    };

    this.calculateBase.emit(base);
  }

  ngOnDestroy() {
    this.cashBase().forEach((cash) => (cash.total = '0'));
  }
}
