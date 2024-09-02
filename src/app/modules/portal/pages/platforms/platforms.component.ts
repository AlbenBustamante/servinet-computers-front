import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { IPortalPlatform } from '@models/platform.model';
import { PlatformService } from '@services/platform.service';

@Component({
  selector: 'app-portal-platforms',
  templateUrl: './platforms.component.html',
  styleUrls: ['./platforms.component.css'],
})
export class PlatformsComponent implements OnInit {
  readonly loading = signal<boolean>(false);
  readonly editing: WritableSignal<boolean>;
  readonly selectedPortalPlatform: WritableSignal<IPortalPlatform | null>;

  constructor(private readonly platformService: PlatformService) {
    this.editing = this.platformService.editing;
    this.selectedPortalPlatform = this.platformService.selectedPortalPlatform;
  }

  ngOnInit(): void {
    this.loading.set(true);

    this.platformService.loadPortalPlatforms().subscribe({
      next: (_) => {
        this.loading.set(false);
      },
      error: (_) => {
        this.loading.set(false);
      },
    });
  }
}
