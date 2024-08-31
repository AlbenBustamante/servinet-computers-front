import { Component, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  IPlatformBalanceReq,
  IPlatformBalanceRes,
} from '@models/platform.model';
import { PlatformBalanceService } from '@services/platform-balance.service';

@Component({
  selector: 'app-update-platform-balances-form',
  templateUrl: './update-platform-balances-form.component.html',
  styleUrls: ['./update-platform-balances-form.component.css'],
})
export class UpdatePlatformBalancesFormComponent {
  readonly balancesForm: FormGroup;
  readonly selectedPlatformBalance: WritableSignal<IPlatformBalanceRes | null>;
  readonly editing: WritableSignal<boolean>;
  readonly platformBalances: WritableSignal<IPlatformBalanceRes[]>;
  readonly loading = signal<boolean>(false);

  constructor(
    private readonly fb: FormBuilder,
    private readonly platformBalanceService: PlatformBalanceService
  ) {
    this.platformBalances = this.platformBalanceService.platformBalances;
    this.editing = this.platformBalanceService.editing;

    this.selectedPlatformBalance =
      this.platformBalanceService.selectedPlatformBalance;

    const initialBalance = this.selectedPlatformBalance()?.initialBalance;
    const finalBalance = this.selectedPlatformBalance()?.finalBalance;

    this.balancesForm = this.fb.group({
      initialBalance: [
        initialBalance! > 0 ? initialBalance : '',
        Validators.required,
      ],
      finalBalance: [
        finalBalance! > 0 ? finalBalance : '',
        Validators.required,
      ],
    });
  }

  onBalancesSubmit() {
    if (this.balancesForm.invalid) {
      return this.balancesForm.markAllAsTouched();
    }

    const balanceReq: IPlatformBalanceReq = {
      ...this.balancesForm.value,
      platformId: this.selectedPlatformBalance()!.platformId,
    };

    this.loading.set(true);

    this.platformBalanceService
      .update(this.selectedPlatformBalance()!.id, balanceReq)
      .subscribe({
        next: (res) => {
          const platformBalances = this.platformBalances();

          const index = platformBalances.findIndex(
            (platform) => platform.platformId === res.platformId
          );

          if (index > -1) {
            platformBalances[index] = res;
            this.platformBalances.set(platformBalances);
            this.selectedPlatformBalance.set(res);
          }

          this.editing.set(false);
          this.loading.set(false);
        },
        error: (error) => {
          this.editing.set(false);
          this.loading.set(false);
        },
      });
  }
}
