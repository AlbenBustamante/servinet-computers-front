import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { IBase } from '@models/base.model';
import { BaseService } from '@services/base.service';
import { CashRegisterService } from '@services/cash-register.service';

@Component({
  selector: 'app-base-calculator-form',
  templateUrl: './base-calculator-form.component.html',
  styleUrls: ['./base-calculator-form.component.css'],
})
export class BaseCalculatorFormComponent {
  @Input({ required: true }) cashRegisterId!: number;
  readonly cashBase;
  readonly loading = signal<boolean>(false);
  readonly baseForm: FormGroup;
  readonly billetAmount = signal<string>('0');
  readonly billetTotal = signal<string>('0');
  readonly coinAmount = signal<string>('0');
  readonly coinTotal = signal<string>('0');
  readonly totalAmount = signal<string>('0');
  readonly total = signal<string>('0');
  readonly showSideBar = signal<boolean>(false);
  readonly observationControl: FormControl;
  @Output() calculateBase = new EventEmitter<IBase>();
  @Output() setObservation = new EventEmitter<string>();
  @Output() register = new EventEmitter();

  constructor(
    private readonly fb: FormBuilder,
    private readonly baseService: BaseService,
    private readonly cashRegisterService: CashRegisterService
  ) {
    this.cashBase = signal(this.baseService.cashBase);

    this.baseForm = this.fb.group({
      hundredThousand: ['', [Validators.required, Validators.min(0)]],
      fiftyThousand: ['', [Validators.required, Validators.min(0)]],
      twentyThousand: ['', [Validators.required, Validators.min(0)]],
      tenThousand: ['', [Validators.required, Validators.min(0)]],
      fiveThousand: ['', [Validators.required, Validators.min(0)]],
      twoThousand: ['', [Validators.required, Validators.min(0)]],
      thousand: ['', [Validators.required, Validators.min(0)]],
      fiveHundred: ['', [Validators.required, Validators.min(0)]],
      twoHundred: ['', [Validators.required, Validators.min(0)]],
      hundred: ['', [Validators.required, Validators.min(0)]],
      fifty: ['', [Validators.required, Validators.min(0)]],
    });

    this.observationControl = new FormControl('');
  }

  ngOnInit() {
    this.loading.set(true);

    this.cashRegisterService.getLastBase(this.cashRegisterId).subscribe({
      next: (base) => {
        console.log(base);

        if (base !== null) {
          this.baseForm.setValue({
            hundredThousand: base.hundredThousand,
            fiftyThousand: base.fiftyThousand,
            twentyThousand: base.twentyThousand,
            tenThousand: base.tenThousand,
            fiveThousand: base.fiveThousand,
            twoThousand: base.twoThousand,
            thousand: base.thousand,
            fiveHundred: base.fiveHundred,
            twoHundred: base.twoHundred,
            hundred: base.hundred,
            fifty: base.fifty,
          });
        }

        this.loading.set(false);
      },
      error: (err) => {
        console.log(err);
        this.loading.set(false);
      },
    });
  }

  handleShowSideBar() {
    this.showSideBar.update((prevValue) => !prevValue);
  }

  handleObservation() {
    this.showSideBar.set(false);
    this.setObservation.emit(this.observationControl.value);
  }

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

  calculate() {
    this.calculateBillet();
    this.calculateCoin();

    const totalAmount = Number(this.billetAmount()) + Number(this.coinAmount());
    const total = Number(this.billetTotal()) + Number(this.coinTotal());

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

  emitRegister() {
    this.register.emit();
  }

  ngOnDestroy() {
    this.cashBase().forEach((cash) => (cash.total = '0'));
  }
}
