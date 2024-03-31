import { Component, signal } from '@angular/core';
import { IPlatformRes } from '@models/platform.model';
import { PlatformService } from '@services/platform.service';

@Component({
  selector: 'app-platforms-list',
  templateUrl: './platforms-list.component.html',
  styleUrls: ['./platforms-list.component.css'],
})
export class PlatformsListComponent {
  readonly loading = signal<boolean>(true);
  readonly platforms = signal<IPlatformRes[]>([]);

  constructor(private readonly platformService: PlatformService) {}

  ngOnInit() {
    this.platformService.getAll().subscribe({
      next: (res) => {
        this.loading.set(false);
        this.platforms.set(res);
      },
      error: (error) => {
        this.loading.set(false);
        console.log(error);
      },
    });
  }
}
