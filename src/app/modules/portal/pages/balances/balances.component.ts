import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IBalanceRes } from '@models/balance.model';
import { RequestStatus } from '@models/request-status.model';
import { BalanceService } from '@services/balance.service';
import { CampusService } from '@services/campus.service';
import { GeneralValidators } from '@utils/general-validators';

@Component({
  selector: 'app-balances',
  templateUrl: './balances.component.html',
  styleUrls: ['./balances.component.css'],
})
export class BalancesComponent implements OnInit {
  balances: IBalanceRes[] = [];
  balanceStatus: RequestStatus = 'init';
  balanceForm: FormGroup;
  balanceModal!: HTMLDialogElement;
  selectedBalance: IBalanceRes | null = null;

  constructor(
    private readonly campusService: CampusService,
    private readonly balanceService: BalanceService,
    private readonly validator: GeneralValidators,
    private readonly fb: FormBuilder
  ) {
    this.balanceForm = this.fb.group({
      initialBalance: ['', Validators.required],
      finalBalance: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.balanceStatus = 'loading';

    this.campusService.getBalances().subscribe({
      next: (res) => {
        this.balances = res.data.results;
        this.balanceStatus = 'success';
      },
      error: () => {
        this.balanceStatus = 'failed';
      },
    });
  }

  openModal(balance: IBalanceRes) {
    this.balanceForm.setValue({
      initialBalance: balance.initialBalance,
      finalBalance: balance.finalBalance,
    });

    this.selectedBalance = balance;

    this.modal.showModal();
  }

  onSubmit() {
    if (this.balanceForm.invalid) {
      return this.balanceForm.markAllAsTouched();
    }

    this.modal.close();

    this.balanceStatus = 'loading';

    this.balanceService
      .update(this.selectedBalance!.id, this.balanceForm.value)
      .subscribe({
        next: () => {
          this.campusService.getBalances().subscribe({
            next: (res) => {
              this.balances = res.data.results;
              this.balanceStatus = 'success';
            },
            error: () => {
              this.balanceStatus = 'failed';
            },
          });
        },
        error: () => {
          this.balanceStatus = 'failed';
        },
      });
  }

  loadInitialBalances() {
    this.balanceStatus = 'loading';

    this.campusService.createInitialBalances().subscribe({
      next: (res) => {
        this.balances = res.data.results;
        this.balanceStatus = 'success';
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  hasError(control: string, error: string) {
    return this.validator.hasError(this.balanceForm, control, error);
  }

  get modal() {
    if (!this.balanceModal) {
      this.balanceModal = document.querySelector(
        '#balance-modal'
      ) as HTMLDialogElement;
    }

    return this.balanceModal;
  }
}
