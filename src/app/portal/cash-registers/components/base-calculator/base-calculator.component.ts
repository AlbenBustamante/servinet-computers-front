import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IBase, IBaseDetail } from '@models/base.model';
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
  readonly billet = signal<IBaseDetail | undefined>(undefined);
  readonly coin = signal<IBaseDetail | undefined>(undefined);
  readonly total = signal<IBaseDetail | undefined>(undefined);

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
    this.baseService.cashBase.set(this.baseService.defaultBase());

    if (!this.cashRegisterId) {
      return;
    }

    this.setLoading(true);

    this.cashRegisterService.getLastBase(this.cashRegisterId).subscribe({
      next: (base) => {
        if (base !== null) {
          this.baseService.updateForm(this.baseForm, base);

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

  private calculate() {
    const { billet, coin, total } = this.baseService.calculate(this.baseForm);

    this.billet.set(billet);
    this.coin.set(coin);
    this.total.set(total);
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
