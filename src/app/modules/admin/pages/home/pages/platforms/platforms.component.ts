import { Component, signal } from '@angular/core';
import { IPlatformRes } from '@models/platform.model';
import { PlatformService } from '@services/platform.service';

@Component({
  selector: 'app-admin-platforms',
  templateUrl: './platforms.component.html',
  styleUrls: ['./platforms.component.css'],
})
export class PlatformsComponent {
  readonly loading = signal<boolean>(true);
  readonly showSideBar = signal<boolean>(false);

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

  onEdit(platform: IPlatformRes) {
    this.showSideBar.set(true);
    console.log({ platform });
  }

  onUpdate() {
    console.log('UPDATE');
  }
}
