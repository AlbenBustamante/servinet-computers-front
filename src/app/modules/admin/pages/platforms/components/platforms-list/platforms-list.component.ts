import { Component, WritableSignal, signal } from '@angular/core';
import { IPlatformRes } from '@models/platform.model';
import { PlatformService } from '@services/platform.service';

@Component({
  selector: 'app-platforms-list',
  templateUrl: './platforms-list.component.html',
  styleUrls: ['./platforms-list.component.css'],
})
export class PlatformsListComponent {
  readonly loading = signal<boolean>(true);
  readonly platforms: WritableSignal<IPlatformRes[]>;

  constructor(private readonly platformService: PlatformService) {
    this.platforms = this.platformService.platforms;
  }

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
