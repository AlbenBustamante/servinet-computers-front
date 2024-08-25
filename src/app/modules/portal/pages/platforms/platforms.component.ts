import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  IPlatformBalanceReq,
  IPlatformBalanceRes,
} from '@models/platform.model';
import { PlatformBalanceService } from '@services/platform-balance.service';
import { GeneralValidators } from '@utils/general-validators';

@Component({
  selector: 'app-portal-platforms',
  templateUrl: './platforms.component.html',
  styleUrls: ['./platforms.component.css'],
})
export class PlatformsComponent implements OnInit {
  readonly platforms = signal<IPlatformBalanceRes[]>([]);
  readonly selectedPlatformBalance = signal<IPlatformBalanceRes | null>(null);
  readonly loading = signal<boolean>(false);
  readonly selectedPlatformIndex = signal<number | null>(null);
  readonly editingBalances = signal<boolean>(false);
  readonly balanceForm: FormGroup;

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

  handleEditingBalances() {
    this.editingBalances.update((prevValue) => !prevValue);
  }

  onSelectPlatform(platform: IPlatformBalanceRes, index: number) {
    this.selectedPlatformBalance.set(platform);
    this.selectedPlatformIndex.set(index);

    this.balanceForm.setValue({
      initialBalance: this.selectedPlatformBalance()?.initialBalance,
      finalBalance: this.selectedPlatformBalance()?.finalBalance,
    });
  }

  onSubmit() {
    if (this.balanceForm.invalid) {
      return this.balanceForm.markAllAsTouched();
    }

    const balanceReq: IPlatformBalanceReq = {
      ...this.balanceForm.value,
      platformId: this.selectedPlatformBalance()!.platformId,
    };

    this.loading.set(true);

    this.platformBalanceService
      .update(this.selectedPlatformBalance()!.id, balanceReq)
      .subscribe({
        next: (res) => {
          const platforms = this.platforms();

          const index = platforms.findIndex(
            (platform) => platform.platformId === res.platformId
          );

          if (index > -1) {
            platforms[index] = res;
            this.platforms.set(platforms);
            this.selectedPlatformBalance.set(res);
          }

          this.editingBalances.set(false);
          this.loading.set(false);
        },
        error: (error) => {
          this.editingBalances.set(false);
          this.loading.set(false);
        },
      });
  }

  hasError(control: string, error: string) {
    return this.validator.hasError(this.balanceForm, control, error);
  }
}
