import { Component, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Role } from '@models/enums';
import { IPortalPlatform } from '@models/platform.model';
import { PlatformBalanceService } from '@services/platform-balance.service';
import { PlatformService } from '@services/platform.service';
import { TokenService } from '@services/token.service';

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
  readonly canEdit = signal<boolean>(false);

  constructor(
    private readonly fb: FormBuilder,
    private readonly platformService: PlatformService,
    private readonly platformBalanceService: PlatformBalanceService,
    private readonly tokenService: TokenService
  ) {
    this.portalPlatforms = this.platformService.portalPlatforms;
    this.editing = this.platformService.balanceEditing;
    this.selectedPortalPlatform = this.platformService.selectedPortalPlatform;

    const initialBalance = this.selectedPortalPlatform()?.initialBalance;
    const finalBalance = this.selectedPortalPlatform()?.finalBalance;

    const role = this.tokenService.getInfo().role;

    this.canEdit.set(role !== Role.CASHIER);

    this.balancesForm = this.fb.group({
      initialBalance: [initialBalance ?? 0, Validators.required],
      finalBalance: [finalBalance ?? 0, Validators.required],
    });

    this.canEdit() ? this.balancesForm.enable() : this.balancesForm.disable();
  }

  onBalancesSubmit() {
    if (this.balancesForm.invalid) {
      return this.balancesForm.markAllAsTouched();
    }

    this.loading.set(true);

    this.platformBalanceService
      .update(
        this.selectedPortalPlatform()!.platformBalanceId,
        this.balancesForm.value
      )
      .subscribe({
        next: (platformBalance) => {
          const portalPlatforms = this.portalPlatforms();

          const index = portalPlatforms.findIndex(
            (portalPlatform) =>
              portalPlatform.platformId === platformBalance.platform.id
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
