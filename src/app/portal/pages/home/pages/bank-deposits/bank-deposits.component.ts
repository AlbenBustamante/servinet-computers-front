import { Component, computed, signal } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { faAdd, faTrash } from '@fortawesome/free-solid-svg-icons';
import {
  IBankDepositDto,
  ICreateBankDepositDto,
  ICreateDepositorDto,
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
  readonly currentCashRegister;
  readonly faAdd = faAdd;
  readonly faDelete = faTrash;
  readonly loading = signal<boolean>(false);
  readonly bankDeposits = signal<IBankDepositDto[]>([]);
  readonly showForm = signal<boolean>(false);
  readonly newBankDepositLoading = signal<boolean>(false);
  readonly newBankDepositForm;
  readonly selectedBankDeposit = signal<IBankDepositDto | undefined>(undefined);
  readonly createDepositorLoading = signal<boolean>(false);
  readonly createDepositorForm;
  readonly myAport = computed(() => {
    const selectedBankDeposit = this.selectedBankDeposit();

    if (!selectedBankDeposit) {
      return null;
    }

    const { id } = this.currentCashRegister()!.cashRegisterDetail;

    const index = selectedBankDeposit.depositors.findIndex(
      (depositor) => depositor.id === id
    );

    if (index > -1) {
      return selectedBankDeposit.depositors[index];
    }

    return null;
  });

  constructor(
    private readonly bankDepositService: BankDepositService,
    private readonly myCashService: MyCashService,
    private readonly fb: FormBuilder,
    private readonly formLoading: FormLoading
  ) {
    this.currentCashRegister = this.myCashService.currentCashRegister;

    this.newBankDepositForm = this.fb.group({
      collector: ['', Validators.required],
      expenseNote: [null],
      expenseValue: [null, Validators.min(0)],
    });

    this.createDepositorForm = this.fb.group({
      value: [, [Validators.required, Validators.min(0)]],
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
    this.setNewBankDepositLoading(true);

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
        this.setNewBankDepositLoading(false);
        this.showForm.set(false);
      },
      error: (err) => {
        console.log(err);
        this.setNewBankDepositLoading(false);
      },
    });
  }

  onEnrollDepositor() {
    this.setCreateDepositorLoading(true);

    const createDepositorDto: ICreateDepositorDto = {
      pk: {
        bankDepositId: this.selectedBankDeposit()?.id!,
        cashRegisterDetailId:
          this.currentCashRegister()?.cashRegisterDetail.id!,
      },
      value: this.createDepositorForm.get('value')?.value!,
    };

    this.bankDepositService.enrollDepositor(createDepositorDto).subscribe({
      next: (bankDeposit) => {
        this.bankDeposits.update((prevValue) => {
          const index = prevValue.findIndex((b) => b.id === bankDeposit.id);

          if (index > -1) {
            prevValue[index] = bankDeposit;
          }

          return prevValue;
        });

        this.createDepositorForm.reset();
        this.selectedBankDeposit.set(bankDeposit);
        this.setCreateDepositorLoading(false);
      },
      error: (err) => {
        console.log(err);
        this.setCreateDepositorLoading(false);
      },
    });
  }

  setSelectedBankDeposit(bankDeposit: IBankDepositDto) {
    this.selectedBankDeposit.set(bankDeposit);
  }

  private setNewBankDepositLoading(loading: boolean) {
    this.formLoading.setLoading(
      this.newBankDepositForm,
      this.newBankDepositLoading,
      loading
    );
  }

  private setCreateDepositorLoading(loading: boolean) {
    this.formLoading.setLoading(
      this.createDepositorForm,
      this.createDepositorLoading,
      loading
    );
  }
}
