import { Component, signal } from '@angular/core';
import { IUpdatePlatformDto } from '@models/platform.model';
import { PlatformService } from '@services/platform.service';

@Component({
  selector: 'app-update-platform-form',
  templateUrl: './update-platform-form.component.html',
  styleUrls: ['./update-platform-form.component.css'],
})
export class UpdatePlatformFormComponent {
  readonly loading;
  readonly form;
  readonly platformId;

  constructor(private readonly platformService: PlatformService) {
    this.form = this.platformService.updatePlatformForm;
    this.platformId = this.platformService.platformToUpdateId;
    this.loading = this.platformService.updatePlatformLoading;
  }

  onSubmit() {
    if (this.form.invalid) {
      return this.form.markAllAsTouched();
    }

    this.setLoading(true);

    const dto: IUpdatePlatformDto = {
      name: this.form.get('name')!.value,
    };

    this.platformService.update(this.platformId(), dto).subscribe({
      next: (platform) => {
        this.platformService.platforms.update((prevPlatforms) => {
          const index = prevPlatforms.findIndex((p) => p.id === platform.id);

          if (index > -1) {
            prevPlatforms[index] = platform;
          }

          return prevPlatforms;
        });

        this.setLoading(false);
      },
      error: (err) => {
        console.log(err);
        this.setLoading(false);
      },
    });
  }

  private setLoading(loading: boolean) {
    this.loading.set(loading);

    loading ? this.form.disable() : this.form.enable();
  }
}
