import { Component, computed, signal } from '@angular/core';
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
  styleUrls: ['./new-cash-transfer-form.component.css'],
})
export class NewCashTransferFormComponent {
  readonly loading = signal<boolean>(false);
  readonly receive = signal<boolean>(true);
  readonly selectedType = signal<CashBoxType>(CashBoxType.CASH_REGISTER);
  readonly selectedSafe = signal<ISafeDetailRes | undefined>(undefined);
  readonly selectedSafeBase = computed(
    () => this.selectedSafe()?.detailFinalBase
  );
  readonly availableAmount = signal<boolean>(true);
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
      safeValue: [''],
    });
  }

  setSelectedCashBox(event: Event) {
    if (this.selectedType() === CashBoxType.CASH_REGISTER) {
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
    }
  }

  setSelectedType(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.selectedType.set(target.value as CashBoxType);
  }

  setReceive(event: Event) {
    const target = event.target as HTMLSelectElement;
    const value = target.value;
    this.receive.set(value === 'true');
  }

  onSubmit() {
    if (this.form.invalid) {
      return this.form.markAllAsTouched();
    }

    this.setLoading(true);

    const createCashTransferDto = this.buildData();

    if (!this.availableAmount()) {
      console.error('amount not available');
      return this.setLoading(false);
    }

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
    this.form.get('receive')?.setValue('true');
    this.form.get('cashBoxType')?.setValue(CashBoxType.CASH_REGISTER);
    this.form.get('cashier')?.setValue(0);
    this.form.get('safeValue')?.setValue('');
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

    const safes = this.availableTransfers()!.safes;
    const currentCashRegisterDetailId =
      this.currentCashRegister()?.cashRegisterDetail.id!;

    if (this.receive()) {
      receiverType = CashBoxType.CASH_REGISTER;
      receiverId = currentCashRegisterDetailId;
      senderType = this.form.get('cashBoxType')?.value!;
      senderId = Number(this.form.get('cashier')?.value!);
      safeDetailId = senderType === CashBoxType.SAFE ? senderId : undefined;
    } else {
      senderType = CashBoxType.CASH_REGISTER;
      senderId = currentCashRegisterDetailId;
      receiverType = this.form.get('cashBoxType')?.value!;
      receiverId = Number(this.form.get('cashier')?.value!);
      safeDetailId = receiverType === CashBoxType.SAFE ? receiverId : undefined;
    }

    if (receiverType === CashBoxType.SAFE || senderType === CashBoxType.SAFE) {
      const safeIndex = safes.findIndex((safe) => safe.id === safeDetailId);

      if (safeIndex > -1) {
        safeBase = safes[safeIndex].detailFinalBase;
        const property = this.form.get('safeValue')?.value! as keyof IBase;

        if (this.receive()) {
          this.availableAmount.set(safeBase[property] >= 1);
          safeBase[property] -= safeBase[property] > 0 ? 1 : 0;
        } else {
          this.availableAmount.set(true);
          safeBase[property] += 1;
        }

        const base = this.baseService.defaultBase();

        const valueFound = base.find((b) => b.title === property)!;
        value = valueFound.value * 100;
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
      currentCashRegisterDetailId,
    };
  }

  private setLoading(loading: boolean) {
    this.loading.set(loading);
    loading ? this.form.disable() : this.form.enable();
  }
}
