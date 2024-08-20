import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IPlatformBalanceRes } from '@models/platform.model';
import { PlatformBalanceService } from '@services/platform-balance.service';
import { GeneralValidators } from '@utils/general-validators';

@Component({
  selector: 'app-balances',
  templateUrl: './balances.component.html',
  styleUrls: ['./balances.component.css'],
})
export class BalancesComponent implements OnInit {
  platformBalances: IPlatformBalanceRes[] = [];
  balanceForm: FormGroup;
  loading = false;

  constructor(
    private readonly platformBalanceService: PlatformBalanceService,
    private readonly validator: GeneralValidators,
    private readonly fb: FormBuilder
  ) {
    this.balanceForm = this.fb.group({
      initialBalance: ['', Validators.required],
      finalBalance: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loading = true;

    this.platformBalanceService.loadInitialBalances().subscribe({
      next: (platformBalances) => {
        this.platformBalances = platformBalances;
        this.loading = false;
        console.log(platformBalances);
      },
      error: (_) => {
        this.loading = false;
      },
    });
  }

  openModal(balance: IPlatformBalanceRes) {
    this.balanceForm.setValue({
      initialBalance: balance.initialBalance,
      finalBalance: balance.finalBalance,
    });
  }

  onSubmit() {
    if (this.balanceForm.invalid) {
      return this.balanceForm.markAllAsTouched();
    }
  }

  hasError(control: string, error: string) {
    return this.validator.hasError(this.balanceForm, control, error);
  }
}
