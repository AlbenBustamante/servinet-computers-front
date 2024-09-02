import { Component, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IPlatformBalanceReq, IPortalPlatform } from '@models/platform.model';
import { PlatformBalanceService } from '@services/platform-balance.service';
import { PlatformService } from '@services/platform.service';

@Component({
  selector: 'app-update-platform-balances-form',
  templateUrl: './update-platform-balances-form.component.html',
  styleUrls: ['./update-platform-balances-form.component.css'],
})
export class UpdatePlatformBalancesFormComponent {
  readonly balancesForm: FormGroup;
  readonly portalPlatforms: WritableSignal<IPortalPlatform[]>;
  readonly selectedPortalPlatform: WritableSignal<IPortalPlatform | null>;
  readonly editing: WritableSignal<boolean>;
  readonly loading = signal<boolean>(false);

  constructor(
    private readonly fb: FormBuilder,
    private readonly platformService: PlatformService,
    private readonly platformBalanceService: PlatformBalanceService
  ) {
    this.portalPlatforms = this.platformService.portalPlatforms;
    this.editing = this.platformService.editing;
    this.selectedPortalPlatform = this.platformService.selectedPortalPlatform;

    const initialBalance = this.selectedPortalPlatform()?.initialBalance;
    const finalBalance = this.selectedPortalPlatform()?.finalBalance;

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
      platformId: this.selectedPortalPlatform()!.platformId,
    };

    this.loading.set(true);

    this.platformBalanceService
      .update(this.selectedPortalPlatform()!.platformBalanceId, balanceReq)
      .subscribe({
        next: (platformBalance) => {
          const portalPlatforms = this.portalPlatforms();

          const index = portalPlatforms.findIndex(
            (portalPlatform) =>
              portalPlatform.platformId === platformBalance.platformId
          );

          if (index > -1) {
            const selectedPortalPlatform = this.selectedPortalPlatform()!;

            selectedPortalPlatform.initialBalance =
              platformBalance.initialBalance;

            selectedPortalPlatform.finalBalance = platformBalance.finalBalance;

            portalPlatforms[index] = selectedPortalPlatform;

            this.portalPlatforms.set(portalPlatforms);
            this.selectedPortalPlatform.set(selectedPortalPlatform);
          }

          this.editing.set(false);
          this.loading.set(false);
        },
        error: (_) => {
          this.editing.set(false);
          this.loading.set(false);
        },
      });
  }
}
