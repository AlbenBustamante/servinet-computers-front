import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { PlatformService } from '@services/platform.service';
import { FormLoading } from '@utils/form-loading';

@Component({
  selector: 'app-new-platform-form',
  templateUrl: './new-platform-form.component.html',
})
export class NewPlatformFormComponent {
  @Output() onClose = new EventEmitter<void>();
  @Input({ required: true }) show!: boolean;
  readonly form: FormGroup;
  readonly loading = signal<boolean>(false);
  readonly faTrash = faTrash;

  constructor(
    private readonly fb: FormBuilder,
    private readonly platformService: PlatformService,
    private readonly formLoading: FormLoading
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      return this.form.markAllAsTouched();
    }

    this.setLoading(true);

    this.platformService.register(this.form.value).subscribe({
      next: () => {
        this.setLoading(false);
        this.form.reset();
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
