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
  isShowingInfo: boolean = false;
  headerTitle: string = 'Plataformas registradas';
  platforms: IPlatformRes[] = [];
  platformInfo: IPlatformRes = {
    available: false,
    createdAt: '',
    updatedAt: '',
    id: -1,
    name: '',
  };
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
    this.isShowingInfo = false;
    this.isRegistering = !this.isRegistering;
    this.headerTitle = this.isRegistering
      ? 'Registro de nueva plataforma'
      : 'Plataformas registradas';
  }

  setIsShowingInfo(platform: IPlatformRes | undefined): void {
    this.isRegistering = false;
    this.isShowingInfo = !this.isShowingInfo;

    this.headerTitle = this.isShowingInfo
      ? `${platform?.name}`
      : 'Plataformas registradas';

    if (platform !== undefined) {
      this.platformInfo = platform;
    }
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
