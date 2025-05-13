import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PlatformService } from '@services/platform.service';

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
    private readonly platformService: PlatformService
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      return this.form.markAllAsTouched();
    }

    this.loading.set(true);

    this.platformService.register(this.form.value).subscribe({
      next: () => {
        this.loading.set(false);
        this.form.reset();
      },
      error: (error) => {
        this.loading.set(false);
        console.log(error);
      },
    });
  }
}
