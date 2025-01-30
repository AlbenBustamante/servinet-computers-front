import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IBase } from '@models/base.model';
import { BaseService } from '@services/base.service';
import { CashRegisterService } from '@services/cash-register.service';
import { MyCashService } from '@services/my-cash.service';

@Component({
  selector: 'app-base-calculator',
  templateUrl: './base-calculator.component.html',
  styleUrls: ['./base-calculator.component.css'],
})
export class BaseCalculatorComponent {
  @Input({ required: true }) cashRegisterId: number | undefined;
  @Output() setBase = new EventEmitter<IBase>();

  readonly cashBase;
  readonly baseForm: FormGroup;
  readonly loading = signal<boolean>(false);
  readonly billetAmount = signal<string>('0');
  readonly billetTotal = signal<string>('0');
  readonly coinAmount = signal<string>('0');
  readonly coinTotal = signal<string>('0');
  readonly totalAmount = signal<string>('0');
  readonly total = signal<string>('0');

  constructor(
    private readonly fb: FormBuilder,
    private readonly baseService: BaseService,
    private readonly myCashService: MyCashService,
    private readonly cashRegisterService: CashRegisterService
  ) {
    this.cashBase = this.baseService.cashBase;

    const base = this.myCashService.initialBase;

    this.baseForm = this.fb.group({
      hundredThousand: [
        base?.hundredThousand ?? '',
        [Validators.required, Validators.min(0)],
      ],
      fiftyThousand: [
        base?.fiftyThousand ?? '',
        [Validators.required, Validators.min(0)],
      ],
      twentyThousand: [
        base?.twentyThousand ?? '',
        [Validators.required, Validators.min(0)],
      ],
      tenThousand: [
        base?.tenThousand ?? '',
        [Validators.required, Validators.min(0)],
      ],
      fiveThousand: [
        base?.fiveThousand ?? '',
        [Validators.required, Validators.min(0)],
      ],
      twoThousand: [
        base?.twoThousand ?? '',
        [Validators.required, Validators.min(0)],
      ],
      thousand: [
        base?.thousand ?? '',
        [Validators.required, Validators.min(0)],
      ],
      fiveHundred: [
        base?.fiveHundred ?? '',
        [Validators.required, Validators.min(0)],
      ],
      twoHundred: [
        base?.twoHundred ?? '',
        [Validators.required, Validators.min(0)],
      ],
      hundred: [base?.hundred ?? '', [Validators.required, Validators.min(0)]],
      fifty: [base?.fifty ?? '', [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit() {
    if (!this.cashRegisterId) {
      return;
    }

    this.setLoading(true);

    this.cashRegisterService.getLastBase(this.cashRegisterId).subscribe({
      next: (base) => {
        if (base !== null) {
          this.baseForm.setValue({
            hundredThousand: this.initialValue(base.hundredThousand),
            fiftyThousand: this.initialValue(base.fiftyThousand),
            twentyThousand: this.initialValue(base.twentyThousand),
            tenThousand: this.initialValue(base.tenThousand),
            fiveThousand: this.initialValue(base.fiveThousand),
            twoThousand: this.initialValue(base.twoThousand),
            thousand: this.initialValue(base.thousand),
            fiveHundred: this.initialValue(base.fiveHundred),
            twoHundred: this.initialValue(base.twoHundred),
            hundred: this.initialValue(base.hundred),
            fifty: this.initialValue(base.fifty),
          });

          this.emitBase();
        } else {
          this.calculate();
        }

        this.setLoading(false);
      },
      error: (err) => {
        console.log(err);
        this.setLoading(false);
      },
    });
  }

  private initialValue = (value: number) => (value === 0 ? '' : value);

  private calculateBillet() {
    let billetAmount = 0;
    let billetTotal = 0;

    for (let i = 0; i < 6; i++) {
      const amount = Number(this.baseForm.get(this.cashBase()[i].title)?.value);
      const result = amount * this.cashBase()[i].value;

      this.cashBase()[i].total = `${result}`;

      billetAmount += amount;
      billetTotal += result;
    }

    this.billetAmount.set(`${billetAmount}`);
    this.billetTotal.set(`${billetTotal}`);
  }

  private calculateCoin() {
    let coinAmount = 0;
    let coinTotal = 0;

    for (let i = 6; i < this.cashBase().length; i++) {
      const amount = Number(this.baseForm.get(this.cashBase()[i].title)?.value);
      const result = amount * this.cashBase()[i].value;

      this.cashBase()[i].total = `${result}`;

      coinAmount += amount;
      coinTotal += result;
    }

    this.coinAmount.set(`${coinAmount}`);
    this.coinTotal.set(`${coinTotal}`);
  }

  private calculate() {
    this.calculateBillet();
    this.calculateCoin();

    const totalAmount = Number(this.billetAmount()) + Number(this.coinAmount());
    const total = Number(this.billetTotal()) + Number(this.coinTotal());

    this.totalAmount.set(`${totalAmount}`);
    this.total.set(`${total}`);
  }

  emitBase() {
    this.calculate();

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

    this.setBase.emit(base);
  }

  private setLoading(loading: boolean) {
    this.loading.set(loading);

    loading ? this.baseForm.disable() : this.baseForm.enable();
  }
}
