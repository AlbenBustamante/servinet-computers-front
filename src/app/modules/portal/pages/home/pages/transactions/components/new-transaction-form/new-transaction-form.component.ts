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
  styleUrls: ['./new-transaction-form.component.css'],
})
export class NewTransactionFormComponent {
  readonly loading = signal<boolean>(false);
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
    this.transactions = this.myHomeService.transactions;
    this.details = this.myHomeService.details;
    this.currentCashRegister = this.myCashService.currentCashRegister;

    this.form = this.fb.group({
      description: ['', Validators.required],
      type: [TransactionDetailType.DEPOSIT, Validators.required],
      value: ['', [Validators.required, Validators.min(0)]],
      commission: ['', Validators.min(0)],
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

    const detail: ITransactionDetailReq = {
      ...this.form.value,
      cashRegisterDetailId: this.currentCashRegister()!.cashRegisterDetail.id,
      date,
    };

    this.transactionDetailService.register(detail).subscribe({
      next: (transaction) => {
        this.details.update((prevValue) => [...prevValue, transaction]);
        this.form.reset();
        this.form.get('type')?.setValue(TransactionDetailType.DEPOSIT);
        this.setLoading(false);
      },
      error: (err) => {
        console.log(err);
        this.setLoading(false);
      },
    });
  }

  private setLoading(loading: boolean) {
    this.formLoading.setLoading(this.form, this.loading, loading);
  }
}
