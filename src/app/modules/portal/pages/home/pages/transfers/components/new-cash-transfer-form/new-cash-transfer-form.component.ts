import { Component, EventEmitter, Output, signal } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { IBase } from '@models/base.model';
import { ICreateCashTransferDto } from '@models/cash-transfer.model';
import { CashBoxType } from '@models/enums';
import { BaseService } from '@services/base.service';
import { CashTransferService } from '@services/cash-transfer.service';
import { TokenService } from '@services/token.service';
import { TransfersService } from '@services/transfers.service';

@Component({
  selector: 'app-new-cash-transfer-form',
  templateUrl: './new-cash-transfer-form.component.html',
  styleUrls: ['./new-cash-transfer-form.component.css'],
})
export class NewCashTransferFormComponent {
  @Output() onSubmit = new EventEmitter<ICreateCashTransferDto>();
  readonly receive = signal<boolean>(true);
  readonly selectedType = signal<CashBoxType>(CashBoxType.CASH_REGISTER);
  readonly availableAmount = signal<boolean>(true);
  readonly availableTransfers;
  readonly form;
  readonly loggedInId;

  constructor(
    private readonly tokenService: TokenService,
    private readonly transfersService: TransfersService,
    private readonly fb: FormBuilder
  ) {
    this.availableTransfers = this.transfersService.availableTransfers;
    this.loggedInId = this.tokenService.getInfo().id;

    this.form = this.fb.group({
      receive: ['true', Validators.required],
      cashBoxType: [CashBoxType.CASH_REGISTER, Validators.required],
      cashier: [0, [Validators.required, Validators.min(1)]],
      value: [, Validators.min(0)],
      safeValue: [''],
    });
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

  emitSubmit() {
    if (this.form.invalid) {
      return this.form.markAllAsTouched();
    }

    const createCashTransferDto = this.buildData();

    if (!this.availableAmount()) {
      return console.log('not available amount');
    }

    this.onSubmit.emit(createCashTransferDto);
  }

  private buildData(): ICreateCashTransferDto {
    let receiverType: CashBoxType;
    let senderType: CashBoxType;
    let receiverId = 0;
    let senderId = 0;
    let value = 0;
    let safeDetailId = 0;
    let safeBase = BaseService.empty;

    const safes = this.availableTransfers()!.safes;

    if (this.receive()) {
      receiverType = CashBoxType.CASH_REGISTER;
      receiverId = this.loggedInId;
      senderType = this.form.get('cashBoxType')?.value!;
      senderId = Number(this.form.get('cashier')?.value!);
      safeDetailId = senderType === CashBoxType.SAFE ? senderId : 0;
    } else {
      senderType = CashBoxType.CASH_REGISTER;
      senderId = this.loggedInId;
      receiverType = this.form.get('cashBoxType')?.value!;
      receiverId = Number(this.form.get('cashier')?.value!);
      safeDetailId = receiverType === CashBoxType.SAFE ? receiverId : 0;
    }

    let property: keyof IBase;

    if (receiverType === CashBoxType.SAFE || senderType === CashBoxType.SAFE) {
      const safeIndex = safes.findIndex((safe) => safe.id === safeDetailId);

      if (safeIndex > -1) {
        safeBase = safes[safeIndex].detailFinalBase;
        property = this.form.get('safeValue')?.value! as keyof IBase;

        if (this.receive()) {
          this.availableAmount.set(safeBase[property] >= 1);
          safeBase[property] -= safeBase[property] > 0 ? 1 : 0;
        } else {
          this.availableAmount.set(true);
          safeBase[property] += 1;
        }
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
    };
  }
}
