import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { SafeService } from '@services/safe.service';
import { FormLoading } from '@utils/form-loading';

@Component({
  selector: 'app-new-safe-form',
  templateUrl: './new-safe-form.component.html',
})
export class NewSafeFormComponent {
  @Output() onClose = new EventEmitter<void>();
  @Input({ required: true }) show!: boolean;
  readonly loading = signal<boolean>(false);
  readonly form: FormGroup;
  readonly faTrash = faTrash;

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
        this.emitOnClose();
      },
      error: (err) => {
        console.log(err);
        this.setLoading(false);
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
