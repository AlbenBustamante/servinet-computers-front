import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SafeService } from '@services/safe.service';
import { FormLoading } from '@utils/form-loading';

@Component({
  selector: 'app-new-safe-form',
  templateUrl: './new-safe-form.component.html',
  styleUrls: ['./new-safe-form.component.css'],
})
export class NewSafeFormComponent {
  readonly loading = signal<boolean>(false);
  readonly form: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly safeService: SafeService,
    private readonly formLoading: FormLoading
  ) {
    this.form = this.fb.group({
      numeral: ['', [Validators.required, Validators.min(0)]],
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      return this.form.markAllAsTouched();
    }

    this.setLoading(true);

    this.safeService.register(this.form.value).subscribe({
      next: (_) => {
        this.form.reset();
        this.setLoading(false);
      },
      error: (err) => {
        console.log(err);
        this.setLoading(false);
      },
    });
  }

  private setLoading(loading: boolean) {
    this.formLoading.setLoading(this.form, this.loading, loading);
  }
}
