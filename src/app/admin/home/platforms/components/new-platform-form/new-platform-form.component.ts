import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PlatformService } from '@services/platform.service';
import { FormLoading } from '@utils/form-loading';

@Component({
  selector: 'app-new-platform-form',
  templateUrl: './new-platform-form.component.html',
  styleUrls: ['./new-platform-form.component.css'],
})
export class NewPlatformFormComponent {
  readonly form: FormGroup;
  readonly loading = signal<boolean>(false);

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
      },
      error: (error) => {
        this.setLoading(false);
        console.log(error);
      },
    });
  }

  private setLoading(loading: boolean) {
    this.formLoading.setLoading(this.form, this.loading, loading);
  }
}
