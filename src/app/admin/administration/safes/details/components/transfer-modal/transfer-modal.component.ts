import { Component, Inject, LOCALE_ID, signal, ViewChild } from '@angular/core';
import { ModalComponent } from '@shared/components/modal/modal.component';
import { DetailService } from '@admin/administration/safes/services/detail.service';
import { FormBuilder, Validators } from '@angular/forms';
import { IBase } from '@models/base.model';
import { CurrencyPipe } from '@angular/common';
import { BaseService } from '@services/base.service';
import { CreateAdminTransferCommand } from '@models/safe.model';
import { SafeDetailService } from '@services/safe-detail.service';
import { FormLoading } from '@utils/form-loading';

@Component({
  selector: 'app-transfer-modal',
  templateUrl: './transfer-modal.component.html',
})
export class TransferModalComponent {
  @ViewChild(ModalComponent) modal!: ModalComponent;
  readonly loading;
  readonly form;
  readonly details;
  readonly availableAmount = signal<number>(0);
  readonly amountMessage = signal<string>('--');

  constructor(
    @Inject(LOCALE_ID) private readonly locale: string,
    private readonly detailService: DetailService,
    private readonly fb: FormBuilder,
    private readonly baseService: BaseService,
    private readonly safeDetailService: SafeDetailService,
    private readonly formLoading: FormLoading
  ) {
    this.loading = this.detailService.loading;
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

    this.setLoading(true);

    const amount = Number(this.form.get('amount')?.value);
    const formDenomination = this.form.get('denomination')?.value;
    const denomination = this.baseService.getValue(
      formDenomination as keyof IBase
    );
    const add = !this.receive;

    const { id } = this.details()!;

    const command: CreateAdminTransferCommand = {
      amount,
      denomination,
      add,
    };

    this.safeDetailService.createTransfer(id, command).subscribe({
      next: (details) => {
        this.details.set(details);
        this.setLoading(false);
        this.close();
      },
      error: (err) => {
        console.error(err);
        this.setLoading(false);
      },
    });
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
    this.availableAmount.set(0);
    this.amountMessage.set('--');
    this.modal.close();
  }

  private setLoading(loading: boolean) {
    this.formLoading.setLoading(this.form, this.loading, loading);
  }
}
