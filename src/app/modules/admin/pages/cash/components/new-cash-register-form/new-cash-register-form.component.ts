import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CashRegisterService } from '@services/cash-register.service';

@Component({
  selector: 'app-new-cash-register-form',
  templateUrl: './new-cash-register-form.component.html',
  styleUrls: ['./new-cash-register-form.component.css'],
})
export class NewCashRegisterFormComponent {
  readonly form: FormGroup;

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

    this.cashRegister.register(this.form.value).subscribe({
      next: (res) => console.log(res),
      error: (error) => console.log(error),
    });
  }
}
