import { Component, signal } from '@angular/core';
import { PlatformService } from '@services/platform.service';

@Component({
  selector: 'app-admin-platforms',
  templateUrl: './platforms.component.html',
  styleUrls: ['./platforms.component.css'],
})
export class PlatformsComponent {
  readonly loading = signal<boolean>(true);

  constructor(private readonly platformService: PlatformService) {}

  ngOnInit() {
    this.platformService.getAll().subscribe({
      next: () => this.loading.set(false),
      error: (error) => {
        this.loading.set(false);
        console.log(error);
      },
    });
  }
}
