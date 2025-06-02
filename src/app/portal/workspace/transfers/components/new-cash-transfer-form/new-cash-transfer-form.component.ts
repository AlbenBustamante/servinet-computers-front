import { Component, signal } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { IBase } from '@models/base.model';
import { ICreateCashTransferDto } from '@models/cash-transfer.model';
import { CashBoxType } from '@models/enums';
import { ISafeDetailRes } from '@models/safe.model';
import { BaseService } from '@services/base.service';
import { CashTransferService } from '@services/cash-transfer.service';
import { MyCashService } from '@services/my-cash.service';
import { MyHomeService } from '@services/my-home.service';

@Component({
  selector: 'app-new-cash-transfer-form',
  templateUrl: './new-cash-transfer-form.component.html',
})
export class NewCashTransferFormComponent {
  readonly loading = signal<boolean>(false);
  readonly receive = signal<boolean>(true);
  readonly selectedType = signal<CashBoxType>(CashBoxType.CASH_REGISTER);
  readonly selectedSafe = signal<ISafeDetailRes | undefined>(undefined);
  readonly availableAmount = signal<number>(0);
  readonly selectedSafePropertyMessage = signal<string>('x');
  readonly availableTransfers;
  readonly cashTransfers;
  readonly form;
  readonly currentCashRegister;
  readonly pagination;

  constructor(
    private readonly baseService: BaseService,
    private readonly cashTransferService: CashTransferService,
    private readonly myCashService: MyCashService,
    private readonly myHomeService: MyHomeService,
    private readonly fb: FormBuilder
  ) {
    this.availableTransfers = this.myHomeService.availableTransfers;
    this.cashTransfers = this.myHomeService.cashTransfers;
    this.currentCashRegister = this.myCashService.currentCashRegister;
    this.pagination = this.myHomeService.pagination;

    this.form = this.fb.group({
      receive: ['true', Validators.required],
      cashBoxType: [CashBoxType.CASH_REGISTER, Validators.required],
      cashier: [0, [Validators.required, Validators.min(1)]],
      value: [, Validators.min(0)],
      safeAmount: [, Validators.min(1)],
      safeDenomination: [''],
    });

    this.form.get('safeAmount')?.disable();
    this.form.get('safeDenomination')?.disable();
  }

  get disableButton() {
    if (this.selectedType() === CashBoxType.CASH_REGISTER || !this.receive()) {
      return false;
    }

    const amount = this.form.get('safeAmount')?.value;

    if (!amount) {
      return false;
    }

    return amount > this.availableAmount();
  }

  get selectedSafeBase() {
    return this.selectedSafe()?.detailFinalBase;
  }

  get safeAmount() {
    return this.form.get('safeAmount')?.value ?? 0;
  }

  setSelectedCashBox(event: Event) {
    if (this.selectedType() === CashBoxType.CASH_REGISTER) {
      this.form.get('safeAmount')?.disable();
      this.form.get('safeDenomination')?.disable();
      return this.selectedSafe.set(undefined);
    }

    const target = event.target as HTMLSelectElement;
    const value = Number(target.value);
    const index = this.availableTransfers()?.safes.findIndex(
      (safe) => safe.id === value
    );

    if (index !== undefined && index > -1) {
      const safe = this.availableTransfers()?.safes[index];
      this.selectedSafe.set(safe);
      this.form.get('safeAmount')?.enable();
      this.form.get('safeDenomination')?.enable();
      this.setAvailableAmount();
    }
  }

  setSelectedType(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.selectedType.set(target.value as CashBoxType);

    if (this.selectedType() === CashBoxType.SAFE) {
      this.setAvailableAmount();
    }
  }

  setAvailableAmount() {
    this.availableAmount.set(0);
    const safe = this.selectedSafeBase;

    if (!safe) {
      return this.selectedSafePropertyMessage.set('Selecciona una caja fuerte');
    }

    const denomination = this.form.get('safeDenomination')?.value;

    if (!denomination || denomination === '') {
      return this.selectedSafePropertyMessage.set(
        'Selecciona una denominación'
      );
    }

    this.availableAmount.set(safe![denomination as keyof IBase]);
    this.selectedSafePropertyMessage.set(
      `Cantidad disponible: ${this.availableAmount()}`
    );
  }

  setReceive(event: Event) {
    const target = event.target as HTMLSelectElement;
    const value = target.value;
    this.receive.set(value === 'true');

    if (this.receive() && this.selectedType() === CashBoxType.SAFE) {
      this.form.patchValue({
        safeAmount: undefined,
        safeDenomination: '',
      });

      this.setAvailableAmount();
    }
  }

  onSubmit() {
    if (this.form.invalid) {
      return this.form.markAllAsTouched();
    }

    this.setLoading(true);

    const createCashTransferDto = this.buildData();

    this.cashTransferService.register(createCashTransferDto).subscribe({
      next: (cashTransfer) => {
        this.cashTransfers.set(cashTransfer.content);
        this.pagination.set(cashTransfer.page);
        this.resetForm();
        this.setLoading(false);
      },
      error: (err) => {
        console.error(err);
        this.setLoading(false);
      },
    });
  }

  private resetForm() {
    this.form.reset();
    this.form.patchValue({
      receive: 'true',
      cashBoxType: CashBoxType.CASH_REGISTER,
      cashier: 0,
      safeAmount: undefined,
      safeDenomination: undefined,
    });
    this.receive.set(true);
    this.selectedType.set(CashBoxType.CASH_REGISTER);
  }

  private buildData(): ICreateCashTransferDto {
    let receiverType: CashBoxType;
    let senderType: CashBoxType;
    let receiverId = 0;
    let senderId = 0;
    let value = 0;
    let safeDetailId: number | undefined = undefined;
    let safeBase: IBase | undefined = undefined;
    let safeDenomination: number | undefined = undefined;
    let safeAmount: number | undefined = undefined;

    const { safes } = this.availableTransfers()!;
    const { id } = this.currentCashRegister()?.cashRegisterDetail!;

    if (this.receive()) {
      receiverType = CashBoxType.CASH_REGISTER;
      receiverId = id;
      senderType = this.form.get('cashBoxType')?.value!;
      senderId = Number(this.form.get('cashier')?.value!);
      safeDetailId = senderType === CashBoxType.SAFE ? senderId : undefined;
    } else {
      senderType = CashBoxType.CASH_REGISTER;
      senderId = id;
      receiverType = this.form.get('cashBoxType')?.value!;
      receiverId = Number(this.form.get('cashier')?.value!);
      safeDetailId = receiverType === CashBoxType.SAFE ? receiverId : undefined;
    }

    if (receiverType === CashBoxType.SAFE || senderType === CashBoxType.SAFE) {
      const safeIndex = safes.findIndex((safe) => safe.id === safeDetailId);

      if (safeIndex > -1) {
        safeBase = safes[safeIndex].detailFinalBase;

        const property = this.form.get('safeDenomination')
          ?.value! as keyof IBase;

        safeAmount = this.form.get('safeAmount')?.value! as number;
        safeDenomination = this.baseService.getValue(property);

        if (this.receive()) {
          safeBase[property] -= safeBase[property] > 0 ? safeAmount : 0;
        } else {
          safeBase[property] += safeAmount;
        }

        value = safeDenomination * safeAmount;
      }
    } else {
      value = this.form.get('value')?.value!;
    }

    return {
      receiverId,
      receiverType,
      senderId,
      senderType,
      value,
      safeDetailId,
      safeBase,
      currentCashRegisterDetailId: id,
      safeAmount,
      safeDenomination,
    };
  }

  private setLoading(loading: boolean) {
    this.loading.set(loading);
    loading ? this.form.disable() : this.form.enable();
  }
}
