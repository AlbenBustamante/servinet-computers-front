import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IPlatformBalanceRes } from '@models/platform.model';
import { PlatformBalanceService } from '@services/platform-balance.service';
import { GeneralValidators } from '@utils/general-validators';

@Component({
  selector: 'app-portal-platforms',
  templateUrl: './platforms.component.html',
  styleUrls: ['./platforms.component.css'],
})
export class PlatformsComponent implements OnInit {
  readonly platforms = signal<IPlatformBalanceRes[]>([]);
  readonly selectedPlatform = signal<IPlatformBalanceRes | null>(null);
  balanceForm: FormGroup;
  loading = signal<boolean>(false);

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
    this.loading.set(true);

    this.platformBalanceService.loadInitialBalances().subscribe({
      next: (platformBalances) => {
        this.platforms.set(platformBalances);
        this.loading.set(false);
      },
      error: (_) => {
        this.loading.set(false);
      },
    });
  }

  onSelectPlatform(platform: IPlatformBalanceRes) {
    this.selectedPlatform.set(platform);
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
