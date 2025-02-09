import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CashRegisterService } from '@services/cash-register.service';

@Component({
  selector: 'app-new-cash-register-form',
  templateUrl: './new-cash-register-form.component.html',
  styleUrls: ['./new-cash-register-form.component.css'],
})
export class NewCashRegisterFormComponent {
  readonly form: FormGroup;
  readonly loading = signal<boolean>(false);

  constructor(
    private readonly fb: FormBuilder,
    private readonly cashRegister: CashRegisterService
  ) {
    this.form = this.fb.group({
      numeral: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      return this.form.markAllAsTouched();
    }

    this.loading.set(true);

    this.cashRegister.register(this.form.value).subscribe({
      next: (_) => {
        this.form.reset();
        this.loading.set(false);
      },
      error: (error) => {
        this.loading.set(false);
        console.log(error);
      },
    });
  }
}
