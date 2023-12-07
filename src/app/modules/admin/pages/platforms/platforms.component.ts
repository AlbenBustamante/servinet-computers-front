import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IPlatformRes } from 'src/app/core/models/platform.model';
import { PlatformService } from 'src/app/core/services/platform.service';

@Component({
  selector: 'app-platforms',
  templateUrl: './platforms.component.html',
  styleUrls: ['./platforms.component.css'],
})
export class PlatformsComponent {
  isRegistering: boolean = false;
  headerTitle: string = 'Plataformas registradas';
  platforms: IPlatformRes[] = [];
  form: FormGroup;

  constructor(
    private readonly platformService: PlatformService,
    private readonly formBuilder: FormBuilder
  ) {
    this.platformService
      .getAll()
      .subscribe((res) => (this.platforms = res.data.results));

    this.form = this.formBuilder.group({
      name: ['', Validators.required],
    });
  }

  setIsRegistering(): void {
    this.isRegistering = !this.isRegistering;
    this.headerTitle = this.isRegistering
      ? 'Registro de nueva plataforma'
      : 'Plataformas registradas';
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.platformService.register(this.form.value).subscribe((res) => {
        if (res.ok) {
          this.platforms.push(res.data.results[0]);
          this.form.reset();
          this.setIsRegistering();
        }
      });
    }
  }
}
