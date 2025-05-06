import { Component, signal } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { faAdd } from '@fortawesome/free-solid-svg-icons';
import {
  IBankDepositDto,
  ICreateBankDepositDto,
} from '@models/bank-deposit.model';
import { BankDepositService } from '@services/bank-deposit.service';
import { MyCashService } from '@services/my-cash.service';
import { FormLoading } from '@utils/form-loading';

@Component({
  selector: 'app-bank-deposits',
  templateUrl: './bank-deposits.component.html',
  styleUrls: ['./bank-deposits.component.css'],
})
export class BankDepositsComponent {
  readonly faAdd = faAdd;
  readonly loading = signal<boolean>(false);
  readonly bankDeposits = signal<IBankDepositDto[]>([]);
  readonly showForm = signal<boolean>(false);
  readonly newBankDepositLoading = signal<boolean>(false);
  readonly newBankDepositForm;

  constructor(
    private readonly bankDepositService: BankDepositService,
    private readonly myCashService: MyCashService,
    private readonly fb: FormBuilder,
    private readonly formLoading: FormLoading
  ) {
    this.newBankDepositForm = this.fb.group({
      collector: ['', Validators.required],
      expenseNote: [null],
      expenseValue: [null, Validators.min(0)],
    });
  }

  ngOnInit() {
    this.loading.set(true);

    this.bankDepositService.getAllBetween().subscribe({
      next: (bankDeposits) => {
        this.bankDeposits.set(bankDeposits);
        this.loading.set(false);
      },
      error: (err) => {
        console.log(err);
        this.loading.set(false);
      },
    });
  }

  onNewBankDeposit() {
    this.setLoading(true);

    const { id } = this.myCashService.currentCashRegister()!.cashRegisterDetail;

    const createBankDepositDto: ICreateBankDepositDto = {
      ...this.newBankDepositForm.value,
      collector: this.newBankDepositForm.get('collector')?.value!,
      cashRegisterDetailId: id,
    };

    this.bankDepositService.create(createBankDepositDto).subscribe({
      next: (bankDeposit) => {
        this.bankDeposits.update((prevValue) => [...prevValue, bankDeposit]);
        this.newBankDepositForm.reset();
        this.setLoading(false);
        this.showForm.set(false);
      },
      error: (err) => {
        console.log(err);
        this.setLoading(false);
      },
    });
  }

  private setLoading(loading: boolean) {
    this.formLoading.setLoading(
      this.newBankDepositForm,
      this.newBankDepositLoading,
      loading
    );
  }
}
