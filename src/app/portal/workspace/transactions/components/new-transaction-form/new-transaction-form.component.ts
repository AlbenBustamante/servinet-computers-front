import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TransactionDetailType } from '@models/enums';
import { ITransactionDetailReq } from '@models/transaction.model';
import { MyCashService } from '@services/my-cash.service';
import { MyHomeService } from '@services/my-home.service';
import { TransactionDetailService } from '@services/transaction-detail.service';
import { FormLoading } from '@utils/form-loading';

@Component({
  selector: 'app-new-transaction-form',
  templateUrl: './new-transaction-form.component.html',
})
export class NewTransactionFormComponent {
  readonly loading = signal<boolean>(false);
  readonly pagination;
  readonly transactions;
  readonly details;
  readonly currentCashRegister;
  readonly form: FormGroup;

  constructor(
    private readonly myCashService: MyCashService,
    private readonly myHomeService: MyHomeService,
    private readonly transactionDetailService: TransactionDetailService,
    private readonly fb: FormBuilder,
    private readonly formLoading: FormLoading
  ) {
    this.pagination = this.myHomeService.pagination;
    this.transactions = this.myHomeService.transactions;
    this.details = this.myHomeService.details;
    this.currentCashRegister = this.myCashService.currentCashRegister;

    this.form = this.fb.group({
      description: ['', Validators.required],
      type: [TransactionDetailType.DEPOSIT, Validators.required],
      value: ['', [Validators.required, Validators.min(0)]],
      commission: [0, Validators.min(0)],
      date: [null],
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      return this.form.markAllAsTouched();
    }

    this.setLoading(true);

    const time = this.form.get('date')?.value ?? null;
    let date: Date | null = null;

    if (time) {
      const [hours, minutes] = time.split(':');
      date = new Date();
      date.setUTCHours(hours);
      date.setUTCMinutes(minutes);
      date.setUTCSeconds(0);
    }

    const commission = Number(this.form.get('commission')?.value);
    const { id } = this.currentCashRegister()!.cashRegisterDetail;

    const detail: ITransactionDetailReq = {
      ...this.form.value,
      cashRegisterDetailId: id,
      commission,
      date,
    };

    this.transactionDetailService.register(detail).subscribe({
      next: (transaction) => {
        this.pagination.set(transaction.page);
        this.details.set(transaction.content);
        this.resetForm();
        this.setLoading(false);
      },
      error: (err) => {
        console.log(err);
        this.setLoading(false);
      },
    });
  }

  private resetForm() {
    this.form.reset();
    this.form.patchValue({
      type: TransactionDetailType.DEPOSIT,
      commission: 0,
    });
  }

  private setLoading(loading: boolean) {
    this.formLoading.setLoading(this.form, this.loading, loading);
  }
}
