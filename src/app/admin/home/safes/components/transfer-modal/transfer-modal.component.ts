import { Component, Inject, LOCALE_ID, signal, ViewChild } from '@angular/core';
import { ModalComponent } from '@shared/components/modal/modal.component';
import { DetailService } from '../../services/detail.service';
import { FormBuilder, Validators } from '@angular/forms';
import { IBase } from '@models/base.model';
import { CurrencyPipe } from '@angular/common';
import { BaseService } from '@services/base.service';

@Component({
  selector: 'app-transfer-modal',
  templateUrl: './transfer-modal.component.html',
})
export class TransferModalComponent {
  @ViewChild(ModalComponent) modal!: ModalComponent;
  readonly form;
  readonly details;
  readonly availableAmount = signal<number>(0);
  readonly amountMessage = signal<string>('--');

  constructor(
    @Inject(LOCALE_ID) private readonly locale: string,
    private readonly detailService: DetailService,
    private readonly fb: FormBuilder,
    private readonly baseService: BaseService
  ) {
    this.details = this.detailService.details;
    this.form = this.fb.group({
      type: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(0)]],
      denomination: ['', Validators.required],
    });

    this.form.get('amount')?.valueChanges.subscribe({
      next: () => this.setDepositValue(),
      error: (err) => console.error(err),
    });
  }

  get submitDisabled() {
    if (!this.receive) {
      return false;
    }

    const amount = Number(this.form.get('amount')?.value);

    return this.availableAmount() < amount;
  }

  get receive() {
    return this.form.get('type')?.value === 'withdrawal';
  }

  get disabled() {
    return this.form.get('type')?.value === '';
  }

  get base() {
    return this.details()?.detailFinalBase;
  }

  onSubmit() {
    if (this.form.invalid) {
      return this.form.markAllAsTouched();
    }

    console.log({ value: this.form.value });
  }

  onChangeType() {
    const type = this.form.get('type')?.value;

    if (type === 'deposit') {
      return this.setDepositValue();
    }

    this.form.patchValue({
      amount: '',
      denomination: '',
    });

    this.setAvailableAmount();
  }

  setAvailableAmount() {
    this.availableAmount.set(0);

    const type = this.form.get('type')?.value;
    const denomination = this.form.get('denomination')?.value;
    const base = this.base;
    const availableAmount = base?.[denomination as keyof IBase];

    if (!availableAmount) {
      return this.amountMessage.set('--');
    }

    this.availableAmount.set(availableAmount);

    if (type === 'withdrawal') {
      this.amountMessage.set(`Cantidad disponible: ${availableAmount}`);
    } else {
      this.setDepositValue();
    }
  }

  setDepositValue() {
    if (this.receive) {
      return;
    }

    const amount = Number(this.form.get('amount')?.value);
    const denomination = this.form.get('denomination')?.value;

    if (!denomination) {
      return this.amountMessage.set('--');
    }

    const denominationValue = this.baseService.getValue(
      denomination as keyof IBase
    );
    const value = amount * denominationValue;

    const formattedValue = new CurrencyPipe(this.locale).transform(
      value,
      '$',
      'symbol',
      '0.00'
    );

    this.amountMessage.set(`Vas a ingresar: ${formattedValue}`);
  }

  open() {
    this.modal.open();
  }

  close() {
    this.form.patchValue({
      type: '',
      amount: '',
      denomination: '',
    });
    this.modal.close();
  }
}
