import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { CashRegisterService } from '@services/cash-register.service';
import { FormLoading } from '@utils/form-loading';

@Component({
  selector: 'app-new-cash-register-form',
  templateUrl: './new-cash-register-form.component.html',
})
export class NewCashRegisterFormComponent {
  @Output() onClose = new EventEmitter<void>();
  @Input({ required: true }) show!: boolean;
  readonly form: FormGroup;
  readonly loading = signal<boolean>(false);
  readonly faTrash = faTrash;

  constructor(
    private readonly fb: FormBuilder,
    private readonly cashRegister: CashRegisterService,
    private readonly formLoading: FormLoading
  ) {
    this.form = this.fb.group({
      numeral: [, [Validators.required, Validators.min(1)]],
      description: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      return this.form.markAllAsTouched();
    }

    this.setLoading(true);

    this.cashRegister.register(this.form.value).subscribe({
      next: (_) => {
        this.setLoading(false);
        this.emitOnClose();
      },
      error: (error) => {
        this.setLoading(false);
        console.log(error);
      },
    });
  }

  emitOnClose() {
    this.form.reset();
    this.onClose.emit();
  }

  private setLoading(loading: boolean) {
    this.formLoading.setLoading(this.form, this.loading, loading);
  }
}
