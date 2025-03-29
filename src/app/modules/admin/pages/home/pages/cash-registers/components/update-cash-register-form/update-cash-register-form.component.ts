import { Component, EventEmitter, Output } from '@angular/core';
import { IUpdateCashRegisterDto } from '@models/cash-register.model';
import { CashRegisterService } from '@services/cash-register.service';

@Component({
  selector: 'app-update-cash-register-form',
  templateUrl: './update-cash-register-form.component.html',
  styleUrls: ['./update-cash-register-form.component.css'],
})
export class UpdateCashRegisterFormComponent {
  @Output() onComplete = new EventEmitter<void>();
  readonly form;
  readonly loading;
  readonly cashRegisterId;

  constructor(private readonly cashRegisterService: CashRegisterService) {
    this.form = this.cashRegisterService.updateCashRegisterForm;
    this.loading = this.cashRegisterService.updateCashRegisterLoading;
    this.cashRegisterId = this.cashRegisterService.cashRegisterToUpdateId;
  }

  emitOnComplete() {
    if (this.form.invalid) {
      return this.form.markAllAsTouched();
    }

    this.setLoading(true);

    const dto: IUpdateCashRegisterDto = this.form.value;

    this.cashRegisterService.update(this.cashRegisterId(), dto).subscribe({
      next: (_) => {
        this.form.reset();
        this.setLoading(false);
      },
      error: (err) => {
        console.log(err);
        this.setLoading(false);
      },
      complete: () => this.onComplete.emit(),
    });
  }

  private setLoading(loading: boolean) {
    this.loading.set(loading);

    loading ? this.form.disable() : this.form.enable();
  }
}
